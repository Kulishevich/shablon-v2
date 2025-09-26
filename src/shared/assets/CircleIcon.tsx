import { Ref, SVGProps, forwardRef, memo } from 'react';

const CircleIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="3"
    height="3"
    viewBox="0 0 3 3"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
  </svg>
);
const ForwardRef = forwardRef(CircleIcon);
const Memo = memo(ForwardRef);

export default Memo;
