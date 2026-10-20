import type { ArchitectureProject } from '../types';
import * as en from '../architecture';

/**
 * Hebrew text for architecture projects, keyed by slug. Images, years and
 * PDFs come from ../architecture.ts; only the text below is replaced.
 * `sections` follows the order of the English project's sections.
 */
type ProjectText = Partial<Pick<ArchitectureProject, 'title' | 'type' | 'context' | 'summary'>> & {
  coverAlt?: string;
  coverCaption?: string;
  sections?: { title?: string; text?: string; alts?: string[]; captions?: string[] }[];
  pdfLabel?: string;
};

const text: Record<string, ProjectText> = {
  'contemporary-villa': {
    title: 'וילה עכשווית',
    type: 'מגורים',
    context: 'וילה פרטית',
    summary:
      'וילה משפחתית בת שתי קומות שנפתחת כולה אל מרפסת האבן והבריכה. קירות זכוכית מהרצפה עד התקרה הופכים את קומת הקרקע לחלל אחד רציף של מגורים, אוכל ומוזיקה, ואילו הקומה העליונה, המחופה עץ, מכילה את החדרים הפרטיים מתחת לגג בולט ועמוק.',
    coverAlt: 'וילה בת שתי קומות עם קירות זכוכית לצד בריכה בשקיעה',
    coverCaption: 'חזית הבריכה בשקיעה',
    sections: [
      {
        text: 'הבית מתוכנן כשתי שכבות: קומת קרקע פתוחה ושקופה ששייכת לגינה, וקומה עליונה מוגנת יותר, עטופה בעץ ומוצלת בבליטת הגג. קירות זכוכית נגררים וריצוף אבן רציף מטשטשים את הגבול בין פנים לחוץ.',
      },
    ],
  },
  'echoes-of-generations': {
    title: 'הדים של דורות',
    type: 'מגורים',
    context: 'בית פרטי',
    summary:
      'שני נפחים מסורתיים עם גגות רעפים משופעים מחוברים באטריום מזוגג, כך שהצורה המוכרת של בית הכפר פוגשת מרכז פתוח ומואר. מרפסות אבן, עצי זית ופינת ישיבה שקועה עם אח ליד הבריכה ממשיכים את הבית אל הנוף.',
    coverAlt: 'בית עם גגות רעפים ואטריום מזוגג, בריכה ופינת ישיבה שקועה עם אח',
    coverCaption: 'מרפסת הבריכה ופינת הישיבה השקועה',
    sections: [
      {
        text: 'הפרויקט לוקח את בית הגג המשופע הארכיטיפי כירושה ופותח אותו: שני הגמלונים שומרים על החדרים האינטימיים, והאטריום המזוגג שביניהם הופך ללב המשותף של הבית — מלא באור יום ובמבטים אל הגינה.',
      },
      {
        alts: ['חזית הגינה עם מדרגות אבן שעולות אל האטריום המזוגג'],
        captions: ['חזית הגינה ומדרגות האבן בדמדומים'],
      },
    ],
  },
  'interior-architecture': {
    title: 'אדריכלות פנים',
    type: 'עיצוב פנים',
    context: 'בית משפחתי ודירה בעיר',
    summary:
      'עיצוב פנים לבית משפחתי ולדירה בעיר: מטבח חם מנגרות אלון עם אי אבן ותאורה משולבת, וסלון ומרפסת מוארים שמסודרים סביב המבט אל העצים וקו הרקיע.',
    coverAlt: 'מטבח עם ארונות אלון, אי אבן ושרפרפי בר באור ערב',
    coverCaption: 'מטבח בנגרות אלון עם אי אבן',
    sections: [
      {
        text: 'פלטה טבעית ורגועה עוברת בין שני החללים: אלון, אבן בהירה וטרצו, טקסטיל פשתן ופרטים בשחור מט, עם תאורה נסתרת מתחת לארונות ולמשטחים שגורמת לחומרים לזהור בערב.',
      },
      {
        alts: [
          'סלון עם ספה לבנה פינתית מול חלון גדול ונוף עירוני',
          'מרפסת מקורה עם גריל, פינת ישיבה ונוף של עצים ומגדלים',
        ],
        captions: ['הסלון מול הנוף', 'פינת ישיבה ומטבח חוץ במרפסת'],
      },
    ],
  },
};

export const portfolioIndex = en.portfolioIndex;

export const homeHero: typeof en.homeHero = {
  ...en.homeHero,
  image: {
    ...en.homeHero.image,
    alt: 'בית עם גגות רעפים ואטריום מזוגג ומדרגות אבן מוארות בדמדומים',
    caption: 'הדים של דורות — חזית הגינה',
  },
};

export const architectureProjects: ArchitectureProject[] = en.architectureProjects.map((p) => {
  const t = text[p.slug];
  if (!t) return p;
  return {
    ...p,
    title: t.title ?? p.title,
    type: t.type ?? p.type,
    context: t.context ?? p.context,
    summary: t.summary ?? p.summary,
    cover: { ...p.cover, alt: t.coverAlt ?? p.cover.alt, caption: t.coverCaption ?? p.cover.caption },
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
