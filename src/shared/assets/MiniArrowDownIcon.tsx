import { Ref, SVGProps, forwardRef, memo } from 'react';

const MiniArrowDownIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M4.152 6.6432C4.54367 7.26987 5.45633 7.26987 5.848 6.6432L9.04375 1.53C9.46003 0.86395 8.98119 0 8.19575 0H1.80425C1.01881 0 0.539969 0.863951 0.956249 1.53L4.152 6.6432Z"
      fill="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(MiniArrowDownIcon);
const Memo = memo(ForwardRef);

export default Memo;
