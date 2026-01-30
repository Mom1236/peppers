import type { CartItem } from "@/lib/cart";
import { getLS, setLS } from "@/lib/storage";
import { calcCommissionForOrder, recordAffiliateOrder } from "@/lib/affiliate-admin";

export type OrderStatus = "Placed" | "Processing" | "Fulfilled" | "Shipped";

export type Order = {
  orderNumber: string;
  createdAt: number;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  trackingNumber: string | null;
  affiliateRef: string | null;
  affiliateId: string | null;
  affiliateCommission: number | null;
  customerNote: string | null;
};

const KEY = "axiom_orders_v1";

function nextOrderNumber() {
  const rand = Math.floor(Math.random() * 9000 + 1000);
  const date = new Date();
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `AX-${yy}${mm}${dd}-${rand}`;
}

export function createOrder(input: Omit<Order, "orderNumber"|"createdAt"|"status"|"trackingNumber"|"affiliateCommission">) {
  const orderNumber = nextOrderNumber();
  const createdAt = Date.now();
  const status: OrderStatus = "Placed";

  const affiliateCommission = input.affiliateRef ? calcCommissionForOrder(input.affiliateRef, input.subtotal) : null;

  const order: Order = {
    orderNumber,
    createdAt,
    status,
    trackingNumber: null,
    affiliateCommission,
    ...input,
  };

  const orders = getLS<Order[]>(KEY, []);
  orders.unshift(order);
  setLS(KEY, orders);

  if (input.affiliateRef && input.affiliateId && affiliateCommission) {
    recordAffiliateOrder({
      affiliateId: input.affiliateId,
      refCode: input.affiliateRef,
      orderNumber,
      subtotal: input.subtotal,
      commission: affiliateCommission,
    });
  }

  return order;
}

export function getOrderByNumber(orderNumber: string) {
  const orders = getLS<Order[]>(KEY, []);
  return orders.find((o) => o.orderNumber === orderNumber) ?? null;
}

export function updateOrderTracking(orderNumber: string, trackingNumber: string) {
  const orders = getLS<Order[]>(KEY, []);
  const idx = orders.findIndex((o) => o.orderNumber === orderNumber);
  if (idx >= 0) {
    orders[idx] = { ...orders[idx], trackingNumber };
    setLS(KEY, orders);
  }
}

export function setOrderStatusLocal(orderNumber: string, status: OrderStatus) {
  const orders = getLS<Order[]>(KEY, []);
  const idx = orders.findIndex((o) => o.orderNumber === orderNumber);
  if (idx >= 0) {
    orders[idx] = { ...orders[idx], status };
    setLS(KEY, orders);
  }
}
