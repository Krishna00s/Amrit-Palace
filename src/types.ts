/**
 * Amrit Palace — Core Domain Types
 * Matching database.md and architecture.md specifications.
 */

export type UserRole = 'VISITOR' | 'CLIENT' | 'CHEF' | 'ADMIN';

export interface User {
  id: string;
  phone: string;
  role: UserRole;
  name: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GuestProfile {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  name: string;
  roomNumber?: string;
  description: string;
  features: string[];
  pricePerNight: number;
  isAvailable: boolean;
  maxGuests: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'REQUESTED' | 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';

export interface Booking {
  id: string;
  bookingCode: string;
  guestId: string;
  guestName: string;
  guestPhone: string;
  roomId: string;
  roomName: string;
  roomNumber: string;
  checkIn: string; // ISO date string YYYY-MM-DD
  checkOut: string; // ISO date string YYYY-MM-DD
  nights: number;
  guestCount: number;
  status: BookingStatus;
  ratePerNight: number;
  totalAmount: number;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export type EventOccasionType = 'WEDDING' | 'BIRTHDAY' | 'ANNIVERSARY' | 'CONFERENCE' | 'CEREMONY' | 'CORPORATE_MEETING' | 'FAMILY_GATHERING' | 'OTHER';

export type EventEnquiryStatus = 'NEW' | 'REVIEWING' | 'CONTACTED' | 'CONFIRMED' | 'CANCELLED';

export interface EventEnquiry {
  id: string;
  enquiryCode: string;
  userId?: string;
  occasionType: EventOccasionType;
  occasionLabel: string;
  preferredDate: string;
  guestCount: number;
  contactName: string;
  phone: string;
  email?: string;
  requirements: string;
  message?: string;
  status: EventEnquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

export interface MenuItemIngredient {
  inventoryItemId: string;
  itemName: string;
  quantityRequired: number;
  unit: string;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  isVeg: boolean;
  isAvailable: boolean;
  preparationTimeMinutes: number;
  ingredients: MenuItemIngredient[];
  badge?: string; // e.g. "Chef's Special", "Bestseller"
}

export type OrderStatus = 'PLACED' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';

export interface FoodOrderItem {
  id: string;
  menuItemId: string;
  name: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  isVeg: boolean;
  notes?: string;
}

export interface FoodOrder {
  id: string;
  orderNumber: string;
  guestId: string;
  guestName: string;
  guestPhone: string;
  bookingId?: string;
  roomNumber: string;
  items: FoodOrderItem[];
  subtotal: number;
  taxes: number;
  totalAmount: number;
  status: OrderStatus;
  notes?: string;
  cancellableUntil: string; // ISO string (e.g. 5 minutes after placedAt)
  placedAt: string;
  acceptedAt?: string;
  preparingAt?: string;
  readyAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  ingredientsDeducted: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'DAIRY' | 'GRAINS' | 'SPICES' | 'PRODUCE' | 'OILS' | 'BEVERAGES' | 'OTHER';
  unit: 'kg' | 'g' | 'L' | 'ml' | 'units';
  currentQuantity: number;
  minimumQuantity: number;
  costPerUnit: number;
  isActive: boolean;
  lastUpdated: string;
}

export type TransactionType = 'STOCK_IN' | 'CONSUMPTION' | 'ADJUSTMENT' | 'CORRECTION';

export interface InventoryTransaction {
  id: string;
  inventoryItemId: string;
  itemName: string;
  type: TransactionType;
  quantityChange: number; // positive for stock-in, negative for consumption
  unit: string;
  resultingQuantity: number;
  reason: string;
  relatedOrderId?: string;
  relatedOrderNumber?: string;
  recordedByUserId: string;
  recordedByUserName: string;
  createdAt: string; // ISO string
}

export type BillChargeType = 'ROOM' | 'FOOD' | 'EVENT' | 'SERVICE' | 'OTHER';

export interface BillItem {
  id: string;
  type: BillChargeType;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  referenceId?: string; // orderId or bookingId
  createdAt: string;
}

export type BillStatus = 'OPEN' | 'PARTIALLY_PAID' | 'PAID' | 'CANCELLED';

export interface Bill {
  id: string;
  billNumber: string;
  guestId: string;
  guestName: string;
  guestPhone: string;
  bookingId: string;
  roomNumber: string;
  items: BillItem[];
  subtotal: number;
  taxAmount: number; // 5% GST
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: BillStatus;
  createdAt: string;
  updatedAt: string;
}

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

export interface Payment {
  id: string;
  paymentNumber: string;
  billId: string;
  guestId: string;
  provider: 'RAZORPAY';
  providerOrderId: string;
  providerPaymentId?: string;
  amount: number;
  status: PaymentStatus;
  paidAt?: string;
  createdAt: string;
}
