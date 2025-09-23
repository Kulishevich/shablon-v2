import { Ref, SVGProps, forwardRef, memo } from 'react';

const ColorPickerIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M13.125 7L20.125 14"
      stroke="white"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.875 8.74922L20.125 3.49922C21.0875 2.53672 22.6625 2.53672 23.625 3.49922C24.5875 4.46172 24.5875 6.03672 23.625 6.99922L18.375 12.2492"
      stroke="white"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.6125 9.01172L4.9875 18.6367C4.4625 19.1617 4.2875 19.7742 4.2875 20.4742C3.85 20.7367 3.5 21.2617 3.5 21.8742C3.5 22.8367 4.2875 23.6242 5.25 23.6242C5.8625 23.6242 6.3875 23.2742 6.7375 22.8367C7.35 22.8367 8.05 22.5742 8.575 22.1367L18.2 12.5117"
      stroke="white"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ForwardRef = forwardRef(ColorPickerIcon);
const Memo = memo(ForwardRef);

export default Memo;
