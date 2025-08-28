import * as Collapsible from '@radix-ui/react-collapsible';
import { ReactNode, useState } from 'react';
import { Button } from '../button';
import { ArrowRightIcon } from '@/shared/assets';
import s from './Collapse.module.scss';
import clsx from 'clsx';

export const Collapse = ({
  title,
  children,
  className,
  initialOpen,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  initialOpen?: boolean;
}) => {
  const [open, setOpen] = useState(initialOpen || false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className={clsx(s.rootState, className)}>
      <Collapsible.Trigger className={s.trigger}>
        <h2 className="h2">{title}</h2>
        <Button variant="icon_secondary" as="span">
          <ArrowRightIcon />
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content className={s.content}>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
};
