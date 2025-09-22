'use client';
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import s from './CollapseSettings.module.scss';
import { ArrowTriangleIcon, CloseIcon } from '@/shared/assets';
import { Button } from '@/shared/ui/button';
import { VariantsSettings } from '@/widgets/variants-settings/VariantsSettings';

export const CollapseSettings = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <div className={s.rootState}>
          <div className={s.trigger}>
            <p className="h5">Настройки шаблона</p>
            <ArrowTriangleIcon />
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay}>
          <VisuallyHidden>
            <Dialog.Title>Настройки шаблона</Dialog.Title>
          </VisuallyHidden>
          <Dialog.Content className={s.content}>
            <VariantsSettings onClose={() => setIsOpen(false)} />
            <Dialog.DialogClose asChild>
              <Button className={s.closeButton}>
                <CloseIcon />
              </Button>
            </Dialog.DialogClose>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
