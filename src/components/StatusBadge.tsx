import type { ProductStatus } from '../content/types';

export function StatusBadge({ status }: { status: ProductStatus }) {
  const tone = status === 'Launched' ? 'live' : status === 'Concept' ? 'concept' : 'progress';
  return (
    <span className={`status status--${tone}`}>
      <span className="status__dot" aria-hidden />
      {status}
    </span>
  );
}
