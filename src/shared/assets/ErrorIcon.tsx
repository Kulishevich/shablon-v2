import { Ref, SVGProps, forwardRef, memo } from 'react';

const ErrorIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    ref={ref}
    {...props}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.9993 29.3333C23.3631 29.3333 29.3327 23.3638 29.3327 16C29.3327 8.63616 23.3631 2.66663 15.9993 2.66663C8.63555 2.66663 2.66602 8.63616 2.66602 16C2.66602 23.3638 8.63555 29.3333 15.9993 29.3333Z"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M19.3327 12.6667L12.666 19.3333M12.666 12.6666L19.3327 19.3333"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const ForwardRef = forwardRef(ErrorIcon);
const Memo = memo(ForwardRef);

export default Memo;
