import { Ref, SVGProps, forwardRef, memo } from "react";

const ArrowSmLeftIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width="20"
    height="21"
    ref={ref}
    {...props}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 10.4997H15M5 10.4997L9.16667 6.33301M5 10.4997L9.16667 14.6663"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ForwardRef = forwardRef(ArrowSmLeftIcon);
const Memo = memo(ForwardRef);

export default Memo;
