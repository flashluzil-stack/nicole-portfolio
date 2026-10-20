import type { ArchitectureProject } from '../types';
import * as en from '../architecture';

/**
 * Hebrew text for architecture projects, keyed by slug. Images, years and
 * PDFs come from ../architecture.ts; only the text below is replaced.
 * `sections` follows the order of the English project's sections.
 */
type ProjectText = Partial<Pick<ArchitectureProject, 'title' | 'type' | 'context' | 'summary'>> & {
  sections?: { title?: string; text?: string; alts?: string[]; captions?: string[] }[];
  pdfLabel?: string;
};

const text: Record<string, ProjectText> = {};

export const architectureProjects: ArchitectureProject[] = en.architectureProjects.map((p) => {
  const t = text[p.slug];
  if (!t) return p;
  return {
    ...p,
    title: t.title ?? p.title,
    type: t.type ?? p.type,
    context: t.context ?? p.context,
    summary: t.summary ?? p.summary,
    pdf: p.pdf && { ...p.pdf, label: t.pdfLabel ?? p.pdf.label },
    sections: p.sections.map((s, i) => {
      const st = t.sections?.[i];
      return {
        ...s,
        title: st?.title ?? s.title,
        text: st?.text ?? s.text,
        images: s.images.map((img, k) => ({
          ...img,
          alt: st?.alts?.[k] ?? img.alt,
          caption: st?.captions?.[k] ?? img.caption,
        })),
      };
    }),
  };
});
