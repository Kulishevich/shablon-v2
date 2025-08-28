export type OrderPostT = {
  customer_name: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
  delivery_method_id: number;
  payment_method_id: number;
  items: ItemT[];
};

export type OrderResponse = {
  created_at: string;
  customer_name: string;
  id: number;
  order_number: string;
  total_amount: string;
};

type ItemT = {
  product_id: number;
  quantity: number;
};
