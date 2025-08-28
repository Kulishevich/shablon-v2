import { Ref, SVGProps, forwardRef, memo } from 'react';

const DotIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="3"
    height="4"
    viewBox="0 0 3 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <circle opacity="0.5" cx="1.5" cy="2" r="1.5" fill="#111434" />
  </svg>
);
const ForwardRef = forwardRef(DotIcon);
const Memo = memo(ForwardRef);

export default Memo;
