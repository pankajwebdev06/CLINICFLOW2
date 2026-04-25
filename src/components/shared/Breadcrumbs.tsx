import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-3">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-1.5">
          {item.href ? (
            <Link 
              href={item.href} 
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </Link>
          ) : (
            <span className={`${item.isCurrent ? 'text-slate-600 font-semibold' : 'text-blue-600 font-semibold'} flex items-center gap-1`}>
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </span>
          )}
          {index < items.length - 1 && <span>›</span>}
        </div>
      ))}
    </nav>
  );
}
