import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { ReactNode } from 'react';

type AlertVariant = 'success' | 'error' | 'info';

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  description?: string;
  children?: ReactNode;
}

const alertStyles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200'
};

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: AlertCircle
};

export function Alert({ variant, title, description, children }: AlertProps) {
  const Icon = icons[variant];

  return (
      <div className={`${alertStyles[variant]} flex p-4 rounded-md border`}>
        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
        <div>
          {title && <h3 className="font-medium">{title}</h3>}
          {description && <p className="mt-1">{description}</p>}
          {children}
        </div>
      </div>
  );
}