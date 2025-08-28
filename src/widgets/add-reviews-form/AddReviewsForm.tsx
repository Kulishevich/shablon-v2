'use client';
import React, { ReactNode, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import s from './AddReviewsForm.module.scss';
import { CloseIcon } from '@/shared/assets';
import { ReviewsForm } from '@/entities/reviews-form';
import { Button } from '@/shared/ui/button';

export const AddReviewsForm = ({
  children,
  productId,
}: {
  children: ReactNode;
  productId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay}>
          <VisuallyHidden>
            <Dialog.Title>Форма добавления отзыва</Dialog.Title>
          </VisuallyHidden>
          <Dialog.Content className={s.content}>
            <ReviewsForm closeModal={() => setIsOpen(false)} productId={productId} />
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
