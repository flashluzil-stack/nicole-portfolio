// End-to-end QA: renders every route at desktop / tablet / mobile widths and
// checks console errors, horizontal overflow, broken images, internal links,
// navigation, the contact form, and runs an axe accessibility scan.
// Usage: npm run build && npm run preview (in another shell) && npm run test:e2e
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.QA_BASE ?? 'http://localhost:4173';
const OUT = 'qa-output';
const routes = ['/', '/technology', '/architecture', '/contact', '/does-not-exist'];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
];
mkdirSync(OUT, { recursive: true });

const failures = [];
const fail = (msg) => {
  failures.push(msg);
  console.log('  ✗', msg);
};

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('response', (r) => {
    if (r.url().startsWith(BASE) && r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`);
  });

  for (const route of routes) {
    errors.length = 0;
    console.log(`[${vp.name}] ${route}`);
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) fail(`${vp.name} ${route}: horizontal overflow of ${overflow}px`);

    // Scroll through the page so lazy images load, then require every image to decode.
    await page.evaluate(async () => {
      const wait = () => new Promise((r) => setTimeout(r, 80));
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await wait();
      }
      for (const row of document.querySelectorAll('.screen-row')) {
        row.scrollIntoView({ behavior: 'instant' });
        for (let x = 0; x <= row.scrollWidth; x += 300) {
          row.scrollTo({ left: x, behavior: 'instant' });
          await wait();
        }
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);
    const broken = await page.$$eval('img', (imgs) =>
      imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
    );
    broken.forEach((src) => fail(`${vp.name} ${route}: broken image ${src}`));

    const h1 = await page.locator('h1').count();
    if (h1 !== 1) fail(`${vp.name} ${route}: expected one <h1>, found ${h1}`);

    // External links must open safely in a new tab.
    const unsafe = await page.$$eval('a[target="_blank"]', (as) =>
      as.filter((a) => !/noopener/.test(a.rel)).map((a) => a.href),
    );
    unsafe.forEach((h) => fail(`${route}: target=_blank without noopener: ${h}`));

    await page.screenshot({ path: `${OUT}/${vp.name}${route === '/' ? '_home' : route.replace(/\//g, '_')}.png`, fullPage: true });

    if (vp.name === 'desktop') {
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      axe.violations.forEach((v) =>
        fail(`${route}: axe ${v.id} (${v.impact}) — ${v.nodes.length} node(s): ${v.nodes[0]?.target.join(' ')}`),
      );
    }
    errors.forEach((e) => fail(`${vp.name} ${route}: console — ${e}`));
  }

  // Navigation: every primary nav item reaches its page and is marked current.
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const navItems = [
    ['Technology', '/technology'],
    ['Architecture', '/architecture'],
    ['Contact', '/contact'],
    ['Home', '/'],
  ];
  for (const [label, path] of navItems) {
    if (vp.width <= 820) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.locator('#mobile-menu').getByRole('link', { name: label }).click();
    } else {
      await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: label }).click();
    }
    await page.waitForURL(BASE + path);
    const marked = await page
      .waitForFunction(
        (l) => [...document.querySelectorAll('header a[aria-current="page"]')].some((a) => a.textContent?.includes(l)),
        label,
        { timeout: 3000 },
      )
      .then(() => true)
      .catch(() => false);
    if (!marked) fail(`${vp.name}: nav "${label}" not marked current`);
    if (vp.width <= 820 && !(await page.locator('#mobile-menu').isHidden({ timeout: 2000 }).catch(() => false)))
      fail(`${vp.name}: mobile menu stayed open after navigating`);
  }

  await ctx.close();
}

// Interaction checks on desktop.
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 } });
  const page = await ctx.newPage();

  // Hero CTAs.
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: /Explore Architecture/ }).click();
  await page.waitForURL(BASE + '/architecture');
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: /Explore Technology/ }).click();
  await page.waitForURL(BASE + '/technology');

  // Case-study anchors from Home land on the right section.
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Read the case study' }).click();
  await page.waitForURL(BASE + '/technology#flash-luz');
  await page.waitForTimeout(800);
  const top = await page.locator('#flash-luz').evaluate((el) => el.getBoundingClientRect().top);
  if (Math.abs(top) > 140) fail(`anchor #flash-luz not in view (top=${top})`);

  // LinkedIn link is exact and safe everywhere.
  for (const route of ['/', '/contact']) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const hrefs = await page.$$eval('a[href*="linkedin"]', (as) => as.map((a) => [a.getAttribute('href'), a.target, a.rel]));
    if (!hrefs.length) fail(`${route}: no LinkedIn link`);
    for (const [href, target, rel] of hrefs) {
      if (href !== 'https://il.linkedin.com/in/nicole-gofman-0b4968296') fail(`${route}: wrong LinkedIn URL ${href}`);
      if (target !== '_blank' || !rel.includes('noopener')) fail(`${route}: LinkedIn link not opening safely`);
    }
  }

  // Contact form: validation, then a correctly composed mailto.
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Send message/ }).click();
  if ((await page.locator('.field__error').count()) !== 3) fail('contact: validation errors not shown');
  const focused = await page.evaluate(() => document.activeElement?.id);
  if (focused !== 'contact-name') fail(`contact: focus not moved to first invalid field (${focused})`);
  await page.fill('#contact-name', 'Test Person');
  await page.fill('#contact-email', 'test@example.com');
  await page.fill('#contact-message', 'Hello Nicole, I would like to talk about a project.');
  const [req] = await Promise.all([
    page.waitForEvent('request', { predicate: (r) => r.url().startsWith('mailto:'), timeout: 3000 }).catch(() => null),
    page.getByRole('button', { name: /Send message/ }).click(),
  ]);
  const status = await page.locator('[role="status"]').textContent();
  if (!status?.includes('email app')) fail('contact: success status not announced');
  if (req && !req.url().startsWith('mailto:Gof.nicole@gmail.com?subject=')) fail(`contact: bad mailto ${req.url()}`);

  // Every internal link resolves to a rendered page (not the 404 view).
  const seen = new Set();
  for (const route of ['/', '/technology', '/architecture', '/contact']) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const links = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')));
    links.forEach((l) => seen.add(l.split('#')[0] || '/'));
  }
  for (const link of seen) {
    await page.goto(BASE + link, { waitUntil: 'networkidle' });
    if (await page.locator('#nf-title').count()) fail(`internal link leads to 404: ${link}`);
  }
  console.log(`checked ${seen.size} internal link targets`);

  // Product screen galleries open in the fullscreen viewer.
  await page.goto(BASE + '/technology', { waitUntil: 'networkidle' });
  const shots = page.locator('.screen-row__btn');
  console.log(`product screens in galleries: ${await shots.count()}`);
  if (await shots.count()) {
    await shots.first().click();
    if (!(await page.getByRole('dialog').isVisible())) fail('technology: screen viewer did not open');
    const before = await page.locator('.lightbox__count').textContent();
    await page.keyboard.press('ArrowRight');
    if ((await page.locator('.lightbox__count').textContent()) === before) fail('technology: viewer did not advance');
    await page.keyboard.press('Escape');
    if (await page.getByRole('dialog').count()) fail('technology: viewer did not close');
  }

  // Architecture project pages, lightbox and pager (when projects exist).
  await page.goto(BASE + '/architecture', { waitUntil: 'networkidle' });
  const cards = page.locator('.project-card__link');
  const n = await cards.count();
  console.log(`architecture projects rendered: ${n}`);
  if (n > 0) {
    const filters = page.locator('.filter');
    if ((await filters.count()) > 1) {
      await filters.nth(1).click();
      if (!(await filters.nth(1).getAttribute('aria-pressed'))?.includes('true')) fail('filter did not activate');
      await filters.first().click();
    }
    await cards.first().click();
    await page.waitForURL(/\/architecture\/.+/);
    await page.locator('.project__cover .zoomable').click();
    if (!(await page.getByRole('dialog').isVisible())) fail('lightbox did not open');
    const c1 = await page.locator('.lightbox__count').textContent();
    await page.keyboard.press('ArrowRight');
    const c2 = await page.locator('.lightbox__count').textContent();
    if (c1 === c2 && !c1?.endsWith('/ 1')) fail('lightbox ArrowRight did not advance');
    await page.keyboard.press('Escape');
    if (await page.getByRole('dialog').count()) fail('lightbox did not close on Escape');
    await page.screenshot({ path: `${OUT}/project-detail.png`, fullPage: true });
    if (n > 1) {
      const nextTitle = await page.locator('.project-pager__link--next .project-pager__title').textContent();
      await page.locator('.project-pager__link--next').click();
      await page.waitForTimeout(300);
      const h1 = await page.locator('h1').textContent();
      if (h1 !== nextTitle) fail(`next project nav went to "${h1}", expected "${nextTitle}"`);
    }
    await page.getByRole('link', { name: /Project index/ }).click();
    await page.waitForURL(BASE + '/architecture');
  }

  await ctx.close();
}

await browser.close();
console.log(failures.length ? `\n${failures.length} problem(s) found` : '\nAll checks passed');
process.exit(failures.length ? 1 : 0);
