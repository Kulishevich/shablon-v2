import { Ref, SVGProps, forwardRef, memo } from 'react';

const PercentIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M6.41602 15.5827L15.5827 6.41602"
      stroke="#111434"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.6673 16.5007C15.6798 16.5007 16.5007 15.6798 16.5007 14.6673C16.5007 13.6548 15.6798 12.834 14.6673 12.834C13.6548 12.834 12.834 13.6548 12.834 14.6673C12.834 15.6798 13.6548 16.5007 14.6673 16.5007Z"
      stroke="#111434"
      stroke-width="1.5"
    />
    <path
      d="M7.33333 9.16667C8.34586 9.16667 9.16667 8.34586 9.16667 7.33333C9.16667 6.32081 8.34586 5.5 7.33333 5.5C6.32081 5.5 5.5 6.32081 5.5 7.33333C5.5 8.34586 6.32081 9.16667 7.33333 9.16667Z"
      stroke="#111434"
      stroke-width="1.5"
    />
  </svg>
);
const ForwardRef = forwardRef(PercentIcon);
const Memo = memo(ForwardRef);

export default Memo;
