import { Ref, SVGProps, forwardRef, memo } from 'react';

const BanknoteIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M11.9993 25.3327C8.25412 25.3327 6.3815 25.3327 5.03631 24.4339C4.45396 24.0447 3.95396 23.5447 3.56484 22.9624C2.66602 21.6172 2.66602 19.7445 2.66602 15.9993C2.66602 12.2541 2.66602 10.3815 3.56484 9.03631C3.95396 8.45396 4.45396 7.95396 5.03631 7.56484C6.3815 6.66602 8.25412 6.66602 11.9993 6.66602H19.9993C23.7445 6.66602 25.6172 6.66602 26.9624 7.56484C27.5447 7.95396 28.0447 8.45396 28.4339 9.03631C29.3327 10.3815 29.3327 12.2541 29.3327 15.9993C29.3327 19.7445 29.3327 21.6172 28.4339 22.9624C28.0447 23.5447 27.5447 24.0447 26.9624 24.4339C25.6172 25.3327 23.7445 25.3327 19.9993 25.3327H11.9993Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M16 12C18.2092 12 20 13.7908 20 16C20 18.2092 18.2092 20 16 20C13.7908 20 12 18.2092 12 16C12 13.7908 13.7908 12 16 12Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path d="M7.33398 20V12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M24.666 20V12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const ForwardRef = forwardRef(BanknoteIcon);
const Memo = memo(ForwardRef);

export default Memo;
