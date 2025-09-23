import * as Collapsible from '@radix-ui/react-collapsible';
import { ReactNode, useState } from 'react';
import { ArrowTriangleIcon } from '@/shared/assets';
import s from './CollapseSiteSettings.module.scss';

export const CollapseSiteSettings = ({
  title,
  children,
  icon,
}: {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className={s.rootState}>
      <Collapsible.Trigger className={s.trigger}>
        <p className="body_5">
          {icon} {title}
        </p>
        <ArrowTriangleIcon />
      </Collapsible.Trigger>
      <Collapsible.Content className={s.wrapper}>
        <div className={s.content}>{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
