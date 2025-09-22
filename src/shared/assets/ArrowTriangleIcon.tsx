import { Ref, SVGProps, forwardRef, memo } from 'react';

const ArrowTriangleIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="12"
    height="10"
    viewBox="0 0 12 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M5.14251 1.42916C5.53091 0.781817 6.46909 0.781816 6.85749 1.42916L11.0913 8.4855C11.4912 9.15203 11.0111 10 10.2338 10H1.76619C0.988896 10 0.508783 9.15203 0.908698 8.4855L5.14251 1.42916Z"
      fill="#111434"
    />
  </svg>
);
const ForwardRef = forwardRef(ArrowTriangleIcon);
const Memo = memo(ForwardRef);

export default Memo;
