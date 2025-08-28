'use client';
import { useMediaQuery } from './useMediaQuery';

export const useBreakpoint = () => {
  return {
    isMobile: useMediaQuery('(max-width: 768px)'),
    isTablet: useMediaQuery('(max-width: 1024px)'),
    isDesktop: useMediaQuery('(min-width: 1025px)'),
  };
};
