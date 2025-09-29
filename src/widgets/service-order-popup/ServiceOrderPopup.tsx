'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import s from './ServiceOrderPopup.module.scss';
import { CloseIcon } from '@/shared/assets';
import { FeedbackForm } from '@/entities/feedback-form';
import { FeedbackImage } from '@/entities/feedback-image';
import { Button } from '@/shared/ui/button';
import Cookies from 'js-cookie';
import { ServiceForm } from '@/entities/service-form';

export const ServiceOrderPopup = ({
  children,
  service,
}: {
  children: ReactNode;
  service: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<string | undefined>(undefined);

  useEffect(() => {
    const cookieVariant = Cookies.get('variant');
    setVariant(cookieVariant);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay}>
          <VisuallyHidden>
            <Dialog.Title>Заказать услугу</Dialog.Title>
          </VisuallyHidden>
          <Dialog.Content className={s.content}>
            <ServiceForm variant={variant} service={service} handleClose={handleClose} />
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
