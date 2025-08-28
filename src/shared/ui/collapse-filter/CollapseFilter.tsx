import * as Collapsible from '@radix-ui/react-collapsible';
import { ReactNode, useState } from 'react';
import { ArrowDownIcon } from '@/shared/assets';
import s from './CollapseFilter.module.scss';

export const CollapseFilter = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className={s.rootState}
    >
      <Collapsible.Trigger className={s.trigger}>
        <p className="h5">{title}</p>
        <ArrowDownIcon />
      </Collapsible.Trigger>
      <Collapsible.Content className={s.wrapper}>
        <div className={s.content}>{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
