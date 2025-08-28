import { Ref, SVGProps, forwardRef, memo } from 'react';

const BurgerMobileIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width="22"
    height="22"
    ref={ref}
    {...props}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="0.75"
      y1="7.5"
      x2="21.25"
      y2="7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="0.75"
      y1="14.833"
      x2="21.25"
      y2="14.833"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const ForwardRef = forwardRef(BurgerMobileIcon);
const Memo = memo(ForwardRef);

export default Memo;
