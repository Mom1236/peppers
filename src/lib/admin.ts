import { getLS, setLS } from "@/lib/storage";
import type { Order, OrderStatus } from "@/lib/orders";
import { getAllAffiliates as _getAllAffiliates, markAffiliatePaid } from "@/lib/affiliate-admin";

const ORD_KEY = "axiom_orders_v1";

export function getAllOrders() {
  return getLS<Order[]>(ORD_KEY, []);
}

export function setOrderStatus(orderNumber: string, status: OrderStatus) {
  const orders = getLS<Order[]>(ORD_KEY, []);
  const idx = orders.findIndex((o) => o.orderNumber === orderNumber);
  if (idx >= 0) {
    orders[idx] = { ...orders[idx], status };
    setLS(ORD_KEY, orders);
  }
}

export function setOrderTracking(orderNumber: string, trackingNumber: string) {
  const orders = getLS<Order[]>(ORD_KEY, []);
  const idx = orders.findIndex((o) => o.orderNumber === orderNumber);
  if (idx >= 0) {
    orders[idx] = { ...orders[idx], trackingNumber };
    setLS(ORD_KEY, orders);
  }
}

export function getAllAffiliates() {
  return _getAllAffiliates().map((a) => a);
}

export function markCommissionPaid(affiliateId: string) {
  markAffiliatePaid(affiliateId);
}
