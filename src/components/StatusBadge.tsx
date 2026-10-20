import type { ProductStatus } from '../content/types';
import { useI18n } from '../i18n';

export function StatusBadge({ status }: { status: ProductStatus }) {
  const { t } = useI18n();
  const tone = status === 'Launched' ? 'live' : status === 'Concept' ? 'concept' : 'progress';
  return (
    <span className={`status status--${tone}`}>
      <span className="status__dot" aria-hidden />
      {t.status[status]}
    </span>
  );
}
