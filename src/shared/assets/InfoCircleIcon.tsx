import { Ref, SVGProps, forwardRef, memo } from 'react';

const InfoCircleIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M15.9993 29.3327C23.3631 29.3327 29.3327 23.3631 29.3327 15.9993C29.3327 8.63555 23.3631 2.66602 15.9993 2.66602C8.63555 2.66602 2.66602 8.63555 2.66602 15.9993C2.66602 23.3631 8.63555 29.3327 15.9993 29.3327Z"
      stroke="currentColor"
      stroke-width="1.7"
    />
    <path d="M16 22.666V14.666" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
    <path
      d="M15.999 11.1504C16.2659 11.1504 16.4822 10.9338 16.4824 10.667C16.4824 10.4001 16.266 10.1836 15.999 10.1836C15.7322 10.1838 15.5156 10.4002 15.5156 10.667C15.5158 10.9337 15.7323 11.1502 15.999 11.1504Z"
      fill="#25338C"
      stroke="currentColor"
      stroke-width="1.7"
    />
  </svg>
);
const ForwardRef = forwardRef(InfoCircleIcon);
const Memo = memo(ForwardRef);

export default Memo;
