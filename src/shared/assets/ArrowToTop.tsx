import { Ref, SVGProps, forwardRef, memo } from 'react';

const ArrowToTop = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.0003 5V15M10.0003 5L14.167 9.16667M10.0003 5L5.83366 9.16667"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ForwardRef = forwardRef(ArrowToTop);
const Memo = memo(ForwardRef);

export default Memo;
