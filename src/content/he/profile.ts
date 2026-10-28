import type { EducationItem, ExperienceItem } from '../types';
import * as en from '../profile';

/**
 * Hebrew personal and professional information — a translation of
 * ../profile.ts. Company, product and software names stay in their
 * original form.
 */
export const profile: typeof en.profile = {
  ...en.profile,
  name: 'ניקול גופמן',
  identity: 'אדריכלית | בונת מוצרים | מייסדת Flash Luz',
  headline: ['מתכננת מרחבים.', 'בונה רעיונות.'],
  intro:
    'אני ניקול גופמן — מעצבת אדריכלית ובונת מוצרים דיגיטליים, שפועלת במפגש שבין מרחב, טכנולוגיה וחוויה אנושית.',
  about: [
    'עבדתי כאדריכלית במשרד Place & Space Architecture על מבני מגורים ומגדלים, ולמדתי אדריכלות ועיצוב פנים בשנקר (2023 – 2026).',
    'לצד האדריכלות אני יוצרת ומפתחת אפליקציות ב-Base44. הקמתי את Flash Luz, פלטפורמה לניהול עסקי ביוטי, ובניתי אותה כאפליקציית No-Code מהרעיון ועד ההשקה — כולל ארכיטקטורת המוצר, ה-UX/UI ותהליכי המשתמש.',
    'לפני כן עבדתי בתחומי הנדל״ן, הכספים והמנהלה. מה שמחבר את הכול: אני אוהבת לייעל דברים.',
  ],
  location: 'רעננה, ישראל',
  contactInvitation: 'יש לך פרויקט, רעיון או הזדמנות שכדאי שנדבר עליהם? אשמח להכיר.',
  portrait: { ...en.profile.portrait, alt: 'דיוקן של ניקול גופמן' },
  avatar: { ...en.profile.avatar, alt: 'ניקול גופמן' },
  atWork: { ...en.profile.atWork, alt: 'ניקול גופמן משרטטת על לוח הצגה' },
};

const experienceHe: Record<string, Omit<ExperienceItem, 'id'>> = {
  'place-space': {
    role: 'אדריכלית',
    organisation: 'Place & Space Architecture',
    period: '2025 – 2026',
    bullets: [
      'הובלת תכנון ועיצוב של מבני מגורים ומגדלים',
      'הכנת תוכניות אדריכליות, פריסות ותוכניות מפורטות',
      'ניהול היתרי בנייה, הגשות לעירייה ותב״ע',
      'עבודה ב-AutoCAD / Revit בפיתוח הפרויקטים',
      'תיאום מול לקוחות, יועצים ורשויות',
    ],
  },
  'flash-luz': {
    role: 'בונת מוצר',
    organisation: 'מייסדת – Flash Luz',
    period: '2026 – היום',
    bullets: [
      'בניית אפליקציית No-Code מהרעיון ועד ההשקה',
      'תכנון ארכיטקטורת המוצר, UX/UI ותהליכי משתמש',
      'פיתוח פלטפורמה לניהול עסקי ביוטי',
    ],
  },
  abre: {
    role: 'עוזרת אישית למנכ״ל',
    organisation: 'Abre (עמיקם ברגר)',
    period: '2024–2025',
    bullets: [
      'ליווי המנכ״ל בהקמת החברה מהיסוד',
      'קידום קרקעות ותב״עות וטיפול מול רשויות',
      'ליווי פרויקטי נדל״ן, קשרי לקוחות ותיעוד',
    ],
  },
  ibc: {
    role: 'עוזרת כספים',
    organisation: 'Israeli Building Center Group',
    period: '2024',
    bullets: [
      'ניהול תהליכי SAP, תשלומים ותיאום מול ספקים',
      'עיר הנדל״ן (2025): עבודה מול יזמים ויצירת קשרים עסקיים עם חברות',
    ],
  },
  hirschman: {
    role: 'עוזרת מנהלית',
    organisation: 'Gil Hirschman & Co.',
    period: '2023–2024',
    bullets: ['ניהול קשרי לקוחות ומסמכים משפטיים'],
  },
  mod: {
    role: 'חיילת במשרד הביטחון – עוזרת אישית',
    organisation: 'משרד הביטחון',
    period: '2022–2023',
    bullets: ['ניהול התפעול המנהלי, הלו״ז והתיאום'],
  },
};

export const experience: ExperienceItem[] = en.experience.map((item) => ({ id: item.id, ...experienceHe[item.id] }));

export const realEstate: typeof en.realEstate = experience.filter((e) => e.id === 'abre' || e.id === 'ibc');

const educationHe: Record<string, Omit<EducationItem, 'id'>> = {
  shenkar: {
    programme: 'אדריכלות ועיצוב פנים',
    institution: 'שנקר',
    period: '2023 – 2026',
    note: 'מצטיינת דיקן',
  },
  vray: { programme: 'קורס 3Ds Max ו-V-Ray', period: '2024' },
  realtor: { programme: 'רישיון תיווך במקרקעין', period: '2023' },
  school: { programme: 'תעודת בגרות', institution: 'תיכון מטרו ווסט, רעננה', period: '2019 – 2022' },
};

export const education: EducationItem[] = en.education.map((item) => ({ id: item.id, ...educationHe[item.id] }));

const skillGroupsHe: Record<string, { group: string; items?: string[] }> = {
  architecture: { group: 'אדריכלות והדמיה' },
  digital: { group: 'מוצרים דיגיטליים' },
  office: { group: 'משרד ועסקים', items: ['שליטה מתקדמת ב-Microsoft Office (Word, Excel, PowerPoint, Outlook)', 'SAP'] },
  design: { group: 'עיצוב', items: ['עיצוב גרפי', 'Canva'] },
};

export const skills: typeof en.skills = en.skills.map((g) => ({
  ...g,
  group: skillGroupsHe[g.id].group,
  items: skillGroupsHe[g.id].items ?? g.items,
}));

export const languages = ['עברית', 'אנגלית', 'רוסית'];

export const architectureOffices: typeof en.architectureOffices = en.architectureOffices.map((o) =>
  o.id === 'place-space'
    ? { ...o, role: 'אדריכלית', period: '2025 – 2026', bullets: experienceHe['place-space'].bullets }
    : { ...o, bullets: ['קידום תב״עות', 'ניהול פרויקטים', 'הכנה והגשה של בקשות להיתר'] },
);

export const disciplines: typeof en.disciplines = {
  architecture: {
    label: 'אדריכלות',
    keywords: ['תכנון מרחבי', 'חשיבה אדריכלית', 'תיעוד טכני', 'חומריות', 'הדמיה', 'הסביבה הבנויה'],
  },
  technology: {
    label: 'טכנולוגיה',
    keywords: ['מוצרים דיגיטליים', 'עיצוב אפליקציות', 'חוויית משתמש', 'אסטרטגיית מוצר', 'מרעיונות למערכות עובדות'],
  },
};
