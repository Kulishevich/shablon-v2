import { BelarusFlagIcon, RussiaFlagIcon } from "@/shared/assets/icons";
import { Option } from "./DefaultSelect";

export const countries: Option[] = [
  {
    id: 1,
    value: "+375",
    mask: "(99) 999-99-99",
    icon: <BelarusFlagIcon />,
  },
  {
    id: 2,
    value: "+7",
    mask: "(999) 999-99-99",
    icon: <RussiaFlagIcon />,
  },
];
