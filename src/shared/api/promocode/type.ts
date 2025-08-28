export type CheckPromocodeT = {
  code: string;
  cart_amount: number;
  product_ids: number[];
};

export type PromocodeInCartT = {
  code: string;
  products: {
    id: number;
    quantity: number;
  }[];
};

export type PromocodeResponse = {
  valid: boolean;
  code: string;
  type: string;
  value: string;
  min_order_amount: string;
  products: [
    {
      id: number;
      product_discount: string;
      product_discount_amount: number;
      promo_discount_amount: number;
      promo_discount_percent: number;
      best_discount: string;
      best_discount_amount: number;
      best_discount_percent: string;
    },
  ];
  message: string;
};
