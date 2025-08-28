export type ContactsT = {
  address: string | null;
  phones: string[];
  email: string | null;
  working_hours: string | null;
  social_links: {
    instagram: string | null;
    telegram: string | null;
    whatsapp: string | null;
    viber: string | null;
  };
  company_info: string | null;
  bank_details: string | null;
  company_description: string | null;
};

export type SettingsT = {
  colors: {
    icon_color: string;
    button_color_static: string;
    button_color_hover: string;
    button_color_static_additional: string;
    heading_color: string;
    main_text_color: string;
    link_color: string;
    background_color: string;
    card_background_color: string;
  };
  logo: string | null;
  favicon: string | null;
  feedback_image: string | null;
  about: {
    text: string | null;
    image: string | null;
  };
  delivery_payment: {
    delivery_text: string | null;
    payment_text: string | null;
  };
  privacy_policy: {
    text: string | null;
  };
  "main_banner": {
    tag: string | null;
    title: string | null;
    description: string | null;
    button_text: string | null;
    button_url: string | null;
    photo: string | null;
    mobile_photo: string | null;
  };
  block_status: {
    contacts_enabled: boolean;
    advantages_enabled: boolean;
    banners_enabled: boolean;
    about_enabled: boolean;
    delivery_payment_enabled: boolean;
    privacy_policy_enabled: boolean;
  };
};
