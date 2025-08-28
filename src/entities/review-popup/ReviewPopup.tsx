'use client';
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from '@/shared/ui/button';
import { ArrowRightUpIcon, CloseIcon } from '@/shared/assets';
import { ReviewT } from '@/shared/api/reviews/types';
import { ReviewContent } from '../review-content';
import s from './ReviewPopup.module.scss';

export const ReviewPopup = ({ review, variant }: { review: ReviewT; variant?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button variant="link" className={s.trigger}>
          Читать весь отзыв
          <ArrowRightUpIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay}>
          <VisuallyHidden>
            <Dialog.Title>Отзыв</Dialog.Title>
          </VisuallyHidden>
          <Dialog.Content className={s.content}>
            <ReviewContent review={review} variant={variant} />
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
