import { clsx } from 'clsx';
import { ToastT, Toaster, toast } from 'sonner';

import styles from './Toast.module.scss';
import { ErrorIcon, SuccessIcon } from '@/shared/assets';

const DEFAULT_DURATION = 5000;
const DEFAULT_POSITION = 'top-center';

type ToastType = 'error' | 'info' | 'success' | 'warning';
type ToastOptions = {
  message?: string;
  description?: string;
  title: string;
  variant?: ToastType;
} & Omit<ToastT, 'id'>;

const showToast = ({
  className,
  duration = DEFAULT_DURATION,
  description,
  icon,
  message,
  title,
  position = DEFAULT_POSITION,
  variant = 'success',
  ...props
}: ToastOptions) => {
  // Закрываем все предыдущие уведомления
  toast.dismiss();

  const typesClass = {
    error: styles.error,
    info: styles.info,
    success: styles.success,
    warning: styles.warning,
  }[variant];

  toast.custom(
    (t) => (
      <div
        onClick={() => toast.dismiss()}
        className={clsx(styles.rootClass, typesClass, className)}
        role="button"
        tabIndex={0}
      >
        <p className={clsx(styles.title, 'h5')}>
          {variant === 'error' && <ErrorIcon />}
          {variant === 'success' && <SuccessIcon />}
          {title}
        </p>
        {!!description && <p className={clsx(styles.message, 'body_5')}>{description}</p>}
        {!!message && <p className={clsx(styles.message, 'body_7')}>{message}</p>}
      </div>
    ),
    {
      duration,
      position,
      ...props,
    }
  );
};

export { Toaster, showToast };
