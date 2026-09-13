/**
 * Amrit Palace — Reactive Shared Data Store
 * Complete in-memory + localStorage persistence engine implementing database.md specifications.
 * Supports cross-role reactivity, real-time subscriber notifications, and realistic hotel seeding.
 */

import type {
  User,
  UserRole,
  Room,
  Booking,
  MenuCategory,
  MenuItem,
  FoodOrder,
  FoodOrderItem,
  OrderStatus,
  InventoryItem,
  InventoryTransaction,
  Bill,
  BillItem,
  Payment,
  EventEnquiry,
} from '../types';

const STORAGE_KEY = 'amrit_palace_datastore_v1';

interface StoreState {
  users: User[];
  currentUserId: string | null;
  activeRole: UserRole;
  room: Room;
  bookings: Booking[];
  categories: MenuCategory[];
  menuItems: MenuItem[];
  orders: FoodOrder[];
  inventory: InventoryItem[];
  inventoryTransactions: InventoryTransaction[];
  bills: Bill[];
  payments: Payment[];
  eventEnquiries: EventEnquiry[];
}

type Listener = () => void;

class AmritDataStore {
  private state: StoreState;
  private listeners: Set<Listener> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;

  constructor() {
    this.state = this.loadInitialState();
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.broadcastChannel = new BroadcastChannel('amrit_palace_sync');
      this.broadcastChannel.onmessage = (event) => {
        if (event.data === 'sync_required') {
          this.reloadFromStorage();
        }
      };
    }
  }

  private loadInitialState(): StoreState {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Verify basic schema validity
          if (parsed && Array.isArray(parsed.users) && Array.isArray(parsed.menuItems)) {
            return parsed;
          }
        }
      } catch (err) {
        console.warn('Failed to parse saved dataStore state, re-seeding:', err);
      }
    }
    return this.createSeedState();
  }

  private saveState() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        this.broadcastChannel?.postMessage('sync_required');
      } catch (err) {
        console.error('Failed to save dataStore state to localStorage:', err);
      }
    }
    this.notifyListeners();
  }

  private reloadFromStorage() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          this.state = JSON.parse(saved);
          this.notifyListeners();
        }
      } catch (e) {
        console.error('Failed to reload from storage:', e);
      }
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Error in store listener:', err);
      }
    });
  }

  // -------------------------------------------------------------
  // Seed Data Generator
  // -------------------------------------------------------------
  private createSeedState(): StoreState {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const inTwoDays = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const users: User[] = [
      {
        id: 'user_client_1',
        phone: '9876543210',
        name: 'Priya Sharma',
        role: 'CLIENT',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        isActive: true,
        createdAt: new Date(now.getTime() - 3 * 86400000).toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: 'user_chef_1',
        phone: '9876543211',
        name: 'Chef Rajesh Kumar',
        role: 'CHEF',
        avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80',
        isActive: true,
        createdAt: new Date(now.getTime() - 30 * 86400000).toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: 'user_admin_1',
        phone: '9876543212',
        name: 'Vikramaditya Singh',
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        isActive: true,
        createdAt: new Date(now.getTime() - 60 * 86400000).toISOString(),
        updatedAt: now.toISOString(),
      },
    ];

    const room: Room = {
      id: 'room_master_1',
      name: 'Executive Master Suite',
      roomNumber: '204',
      description:
        'A spacious, climate-controlled master sanctuary offering pristine elegance, a king orthopedic bed, ambient architecture, and attentive hospitality right in Lohardaga.',
      features: [
        'Split Inverter Air-Conditioning',
        'King Master Bed with Luxury Linen',
        '43" 4K Smart TV with Streaming Apps',
        'Complimentary High-Speed Wi-Fi',
        '24/7 Dedicated In-Room Dining',
        'Modern En-Suite Bath with Hot Shower',
        'Tea & Coffee Station + Mineral Water',
        'Workstation Desk with USB Charging',
      ],
      pricePerNight: 2499,
      isAvailable: true,
      maxGuests: 3,
      imageUrl:
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&auto=format&fit=crop&q=85',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const bookings: Booking[] = [
      {
        id: 'booking_active_1',
        bookingCode: 'AP-BKG-2026-089',
        guestId: 'user_client_1',
        guestName: 'Priya Sharma',
        guestPhone: '9876543210',
        roomId: 'room_master_1',
        roomName: 'Executive Master Suite',
        roomNumber: '204',
        checkIn: todayStr,
        checkOut: inTwoDays,
        nights: 2,
        guestCount: 2,
        status: 'CHECKED_IN',
        ratePerNight: 2499,
        totalAmount: 4998,
        specialRequests: 'Quiet room preference, extra pillows requested.',
        createdAt: new Date(now.getTime() - 24 * 3600000).toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: 'booking_upcoming_2',
        bookingCode: 'AP-BKG-2026-094',
        guestId: 'user_client_2',
        guestName: 'Rohit Keshri',
        guestPhone: '9835102938',
        roomId: 'room_master_1',
        roomName: 'Executive Master Suite',
        roomNumber: '205',
        checkIn: new Date(now.getTime() + 4 * 86400000).toISOString().split('T')[0],
        checkOut: new Date(now.getTime() + 6 * 86400000).toISOString().split('T')[0],
        nights: 2,
        guestCount: 2,
        status: 'CONFIRMED',
        ratePerNight: 2499,
        totalAmount: 4998,
        specialRequests: 'Late check-in at 8:00 PM.',
        createdAt: new Date(now.getTime() - 12 * 3600000).toISOString(),
        updatedAt: now.toISOString(),
      },
    ];

    const categories: MenuCategory[] = [
      { id: 'cat_starters', name: 'Starters & Appetizers', slug: 'starters', description: 'Crisp, aromatic small plates crafted to stimulate the palate.', sortOrder: 1, isActive: true },
      { id: 'cat_mains', name: 'Royal Main Course', slug: 'mains', description: 'Rich gravies, tender paneer, and slow-simmered regional delicacies.', sortOrder: 2, isActive: true },
      { id: 'cat_rice', name: 'Biryani & Basmati Rice', slug: 'rice', description: 'Fragrant long-grain aged basmati dum-cooked with saffron and herbs.', sortOrder: 3, isActive: true },
      { id: 'cat_breads', name: 'Tandoori Breads', slug: 'breads', description: 'Freshly baked clay oven naans, rotis, and layered parathas.', sortOrder: 4, isActive: true },
      { id: 'cat_desserts', name: 'Sweet Delights', slug: 'desserts', description: 'Warm khoya dumplings and chilled saffron milk confections.', sortOrder: 5, isActive: true },
      { id: 'cat_beverages', name: 'Beverages & Refreshers', slug: 'beverages', description: 'Artisanal masala chai, chilled mocktails, and fresh juices.', sortOrder: 6, isActive: true },
    ];

    const inventory: InventoryItem[] = [
      { id: 'inv_paneer', name: 'Fresh Malai Paneer', category: 'DAIRY', unit: 'kg', currentQuantity: 18.5, minimumQuantity: 5.0, costPerUnit: 340, isActive: true, lastUpdated: now.toISOString() },
      { id: 'inv_rice', name: 'Aged Basmati Rice', category: 'GRAINS', unit: 'kg', currentQuantity: 42.0, minimumQuantity: 15.0, costPerUnit: 110, isActive: true, lastUpdated: now.toISOString() },
      { id: 'inv_flour', name: 'Sharbati Atta & Maida', category: 'GRAINS', unit: 'kg', currentQuantity: 30.0, minimumQuantity: 10.0, costPerUnit: 45, isActive: true, lastUpdated: now.toISOString() },
      { id: 'inv_butter', name: 'Pure Amul Butter & Ghee', category: 'DAIRY', unit: 'kg', currentQuantity: 12.0, minimumQuantity: 4.0, costPerUnit: 520, isActive: true, lastUpdated: now.toISOString() },
      { id: 'inv_cream', name: 'Fresh Dairy Milk & Cream', category: 'DAIRY', unit: 'L', currentQuantity: 20.0, minimumQuantity: 6.0, costPerUnit: 70, isActive: true, lastUpdated: now.toISOString() },
      { id: 'inv_oil', name: 'Refined & Cold-Pressed Oil', category: 'OILS', unit: 'L', currentQuantity: 24.0, minimumQuantity: 8.0, costPerUnit: 140, isActive: true, lastUpdated: now.toISOString() },
      { id: 'inv_spices', name: 'Royal Garam Masala & Saffron', category: 'SPICES', unit: 'kg', currentQuantity: 8.5, minimumQuantity: 2.0, costPerUnit: 950, isActive: true, lastUpdated: now.toISOString() },
      { id: 'inv_produce', name: 'Farm-Fresh Veggies & Herbs', category: 'PRODUCE', unit: 'kg', currentQuantity: 32.0, minimumQuantity: 10.0, costPerUnit: 60, isActive: true, lastUpdated: now.toISOString() },
    ];

    const menuItems: MenuItem[] = [
      {
        id: 'menu_paneer_tikka',
        categoryId: 'cat_starters',
        name: 'Crispy Paneer Tikka',
        description: 'Tender cubes of fresh malai paneer marinated in hung curd, Kashmiri deghi mirch, and mustard oil, chargrilled with crunchy peppers.',
        imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
        price: 260,
        isVeg: true,
        isAvailable: true,
        preparationTimeMinutes: 20,
        badge: "Chef's Special",
        ingredients: [
          { inventoryItemId: 'inv_paneer', itemName: 'Fresh Malai Paneer', quantityRequired: 0.25, unit: 'kg' },
          { inventoryItemId: 'inv_spices', itemName: 'Royal Garam Masala & Saffron', quantityRequired: 0.03, unit: 'kg' },
        ],
      },
      {
        id: 'menu_corn_kebab',
        categoryId: 'cat_starters',
        name: 'Corn & Cheese Seekh Kebab',
        description: 'Golden sweet corn and melting cheese skewers spiced with roasted cumin and fresh coriander, served with tangy mint chutney.',
        imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&auto=format&fit=crop&q=80',
        price: 240,
        isVeg: true,
        isAvailable: true,
        preparationTimeMinutes: 18,
        ingredients: [
          { inventoryItemId: 'inv_produce', itemName: 'Farm-Fresh Veggies & Herbs', quantityRequired: 0.2, unit: 'kg' },
          { inventoryItemId: 'inv_butter', itemName: 'Pure Amul Butter & Ghee', quantityRequired: 0.05, unit: 'kg' },
        ],
      },
      {
        id: 'menu_handi_paneer',
        categoryId: 'cat_mains',
        name: 'Handi Paneer Khas',
        description: 'Amrit Palace signature recipe — slow-simmered cottage cheese in a velvety tomato, cashew, and caramelized onion gravy garnished with ginger juliennes.',
        imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
        price: 320,
        isVeg: true,
        isAvailable: true,
        preparationTimeMinutes: 25,
        badge: 'Bestseller',
        ingredients: [
          { inventoryItemId: 'inv_paneer', itemName: 'Fresh Malai Paneer', quantityRequired: 0.3, unit: 'kg' },
          { inventoryItemId: 'inv_butter', itemName: 'Pure Amul Butter & Ghee', quantityRequired: 0.08, unit: 'kg' },
          { inventoryItemId: 'inv_cream', itemName: 'Fresh Dairy Milk & Cream', quantityRequired: 0.1, unit: 'L' },
          { inventoryItemId: 'inv_spices', itemName: 'Royal Garam Masala & Saffron', quantityRequired: 0.02, unit: 'kg' },
        ],
      },
      {
        id: 'menu_dal_makhani',
        categoryId: 'cat_mains',
        name: 'Dal Makhani Royal',
        description: 'Whole black urad lentils steeped overnight on low embers with vine-ripened tomatoes, finished with churned white butter and clotted cream.',
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
        price: 240,
        isVeg: true,
        isAvailable: true,
        preparationTimeMinutes: 15,
        badge: 'Slow Cooked',
        ingredients: [
          { inventoryItemId: 'inv_butter', itemName: 'Pure Amul Butter & Ghee', quantityRequired: 0.08, unit: 'kg' },
          { inventoryItemId: 'inv_cream', itemName: 'Fresh Dairy Milk & Cream', quantityRequired: 0.1, unit: 'L' },
        ],
      },
      {
        id: 'menu_biryani',
        categoryId: 'cat_rice',
        name: 'Amrit Dum Veg Biryani',
        description: 'Aged basmati rice sealed in a traditional handi with saffron, seasonal vegetables, caramelized onions, and kewra water. Accompanied by burani raita.',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
        price: 290,
        isVeg: true,
        isAvailable: true,
        preparationTimeMinutes: 25,
        badge: 'Signature',
        ingredients: [
          { inventoryItemId: 'inv_rice', itemName: 'Aged Basmati Rice', quantityRequired: 0.3, unit: 'kg' },
          { inventoryItemId: 'inv_produce', itemName: 'Farm-Fresh Veggies & Herbs', quantityRequired: 0.2, unit: 'kg' },
          { inventoryItemId: 'inv_butter', itemName: 'Pure Amul Butter & Ghee', quantityRequired: 0.06, unit: 'kg' },
          { inventoryItemId: 'inv_spices', itemName: 'Royal Garam Masala & Saffron', quantityRequired: 0.02, unit: 'kg' },
        ],
      },
      {
        id: 'menu_garlic_naan',
        categoryId: 'cat_breads',
        name: 'Butter Garlic Naan',
        description: 'Pillowy tandoor-baked refined flour bread encrusted with minced garlic and brushed generously with hot Amul butter.',
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
        price: 65,
        isVeg: true,
        isAvailable: true,
        preparationTimeMinutes: 10,
        ingredients: [
          { inventoryItemId: 'inv_flour', itemName: 'Sharbati Atta & Maida', quantityRequired: 0.12, unit: 'kg' },
          { inventoryItemId: 'inv_butter', itemName: 'Pure Amul Butter & Ghee', quantityRequired: 0.03, unit: 'kg' },
        ],
      },
      {
        id: 'menu_tandoori_roti',
        categoryId: 'cat_breads',
        name: 'Tandoori Roti (Butter)',
        description: 'Whole wheat round bread baked crisp in the clay oven, glazed with fresh butter.',
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80',
        price: 30,
        isVeg: true,
        isAvailable: true,
        preparationTimeMinutes: 8,
        ingredients: [
          { inventoryItemId: 'inv_flour', itemName: 'Sharbati Atta & Maida', quantityRequired: 0.08, unit: 'kg' },
          { inventoryItemId: 'inv_butter', itemName: 'Pure Amul Butter & Ghee', quantityRequired: 0.015, unit: 'kg' },
        ],
      },
      {
        id: 'menu_gulab_jamun',
        categoryId: 'cat_desserts',
        name: 'Shahi Gulab Jamun (2 Pcs)',
        description: 'Golden mawa dumplings fried to perfection and submerged in warm rosewater and green cardamom syrup.',
        imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80',
        price: 120,
        isVeg: true,
        isAvailable: true,
        preparationTimeMinutes: 5,
        ingredients: [
          { inventoryItemId: 'inv_cream', itemName: 'Fresh Dairy Milk & Cream', quantityRequired: 0.1, unit: 'L' },
          { inventoryItemId: 'inv_oil', itemName: 'Refined & Cold-Pressed Oil', quantityRequired: 0.05, unit: 'L' },
        ],
      },
      {
        id: 'menu_masala_chai',
        categoryId: 'cat_beverages',
        name: 'Kulhad Masala Chai',
        description: 'Steaming clay cup chai brewed with high-grown tea leaves, crushed ginger, green cardamom, and fresh dairy milk.',
        imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
        price: 40,
        isVeg: true,
        isAvailable: true,
        preparationTimeMinutes: 8,
        badge: 'Local Favourite',
        ingredients: [
          { inventoryItemId: 'inv_cream', itemName: 'Fresh Dairy Milk & Cream', quantityRequired: 0.15, unit: 'L' },
          { inventoryItemId: 'inv_spices', itemName: 'Royal Garam Masala & Saffron', quantityRequired: 0.01, unit: 'kg' },
        ],
      },
      {
        id: 'menu_fresh_lime_soda',
        categoryId: 'cat_beverages',
        name: 'Fresh Mint Lime Soda',
        description: 'Freshly muddled mint sprigs, hand-pressed lemons, rock salt, and effervescent club soda.',
        imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
        price: 80,
        isVeg: true,
        isAvailable: true,
        preparationTimeMinutes: 5,
        ingredients: [
          { inventoryItemId: 'inv_produce', itemName: 'Farm-Fresh Veggies & Herbs', quantityRequired: 0.05, unit: 'kg' },
        ],
      },
    ];

    const orders: FoodOrder[] = [
      {
        id: 'ord_101',
        orderNumber: 'AP-ORD-1042',
        guestId: 'user_client_1',
        guestName: 'Priya Sharma',
        guestPhone: '9876543210',
        bookingId: 'booking_active_1',
        roomNumber: '204',
        items: [
          {
            id: 'ord_item_1',
            menuItemId: 'menu_handi_paneer',
            name: 'Handi Paneer Khas',
            imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
            quantity: 1,
            unitPrice: 320,
            totalPrice: 320,
            isVeg: true,
          },
          {
            id: 'ord_item_2',
            menuItemId: 'menu_garlic_naan',
            name: 'Butter Garlic Naan',
            imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
            quantity: 2,
            unitPrice: 65,
            totalPrice: 130,
            isVeg: true,
          },
          {
            id: 'ord_item_3',
            menuItemId: 'menu_fresh_lime_soda',
            name: 'Fresh Mint Lime Soda',
            imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
            quantity: 1,
            unitPrice: 80,
            totalPrice: 80,
            isVeg: true,
          },
        ],
        subtotal: 530,
        taxes: 26.5,
        totalAmount: 556.5,
        status: 'PREPARING',
        notes: 'Please keep gravy medium spicy. Serve hot to Room 204.',
        placedAt: new Date(now.getTime() - 15 * 60000).toISOString(),
        acceptedAt: new Date(now.getTime() - 12 * 60000).toISOString(),
        preparingAt: new Date(now.getTime() - 10 * 60000).toISOString(),
        cancellableUntil: new Date(now.getTime() - 10 * 60000).toISOString(),
        ingredientsDeducted: true,
      },
    ];

    // 45 days of representative inventory transactions
    const inventoryTransactions: InventoryTransaction[] = [
      {
        id: 'tx_seed_1',
        inventoryItemId: 'inv_paneer',
        itemName: 'Fresh Malai Paneer',
        type: 'STOCK_IN',
        quantityChange: 20.0,
        unit: 'kg',
        resultingQuantity: 20.0,
        reason: 'Weekly dairy intake — Lohardaga Local Farm Supplier',
        recordedByUserId: 'user_admin_1',
        recordedByUserName: 'Vikramaditya Singh',
        createdAt: new Date(now.getTime() - 3 * 86400000).toISOString(),
      },
      {
        id: 'tx_seed_2',
        inventoryItemId: 'inv_rice',
        itemName: 'Aged Basmati Rice',
        type: 'STOCK_IN',
        quantityChange: 50.0,
        unit: 'kg',
        resultingQuantity: 50.0,
        reason: 'Grain inventory restock from Wholesale Mandi',
        recordedByUserId: 'user_admin_1',
        recordedByUserName: 'Vikramaditya Singh',
        createdAt: new Date(now.getTime() - 14 * 86400000).toISOString(),
      },
      {
        id: 'tx_seed_3',
        inventoryItemId: 'inv_butter',
        itemName: 'Pure Amul Butter & Ghee',
        type: 'STOCK_IN',
        quantityChange: 15.0,
        unit: 'kg',
        resultingQuantity: 15.0,
        reason: 'Amul distributor delivery invoice #4920',
        recordedByUserId: 'user_admin_1',
        recordedByUserName: 'Vikramaditya Singh',
        createdAt: new Date(now.getTime() - 7 * 86400000).toISOString(),
      },
      {
        id: 'tx_seed_4',
        inventoryItemId: 'inv_paneer',
        itemName: 'Fresh Malai Paneer',
        type: 'CONSUMPTION',
        quantityChange: -1.5,
        unit: 'kg',
        resultingQuantity: 18.5,
        reason: 'Kitchen prep for Room 204 & banquet sampling',
        relatedOrderId: 'ord_101',
        relatedOrderNumber: 'AP-ORD-1042',
        recordedByUserId: 'user_chef_1',
        recordedByUserName: 'Chef Rajesh Kumar',
        createdAt: new Date(now.getTime() - 10 * 60000).toISOString(),
      },
    ];

    const bills: Bill[] = [
      {
        id: 'bill_priya_1',
        billNumber: 'AP-INV-2026-089',
        guestId: 'user_client_1',
        guestName: 'Priya Sharma',
        guestPhone: '9876543210',
        bookingId: 'booking_active_1',
        roomNumber: '204',
        items: [
          {
            id: 'bi_1',
            type: 'ROOM',
            description: 'Executive Master Suite (2 Nights @ ₹2,499/night)',
            quantity: 2,
            unitPrice: 2499,
            amount: 4998,
            referenceId: 'booking_active_1',
            createdAt: new Date(now.getTime() - 24 * 3600000).toISOString(),
          },
          {
            id: 'bi_2',
            type: 'FOOD',
            description: 'In-Room Dining (Order #AP-ORD-1042)',
            quantity: 1,
            unitPrice: 556.5,
            amount: 556.5,
            referenceId: 'ord_101',
            createdAt: new Date(now.getTime() - 15 * 60000).toISOString(),
          },
        ],
        subtotal: 5554.5,
        taxAmount: 277.72,
        totalAmount: 5832.22,
        paidAmount: 0,
        remainingAmount: 5832.22,
        status: 'OPEN',
        createdAt: new Date(now.getTime() - 24 * 3600000).toISOString(),
        updatedAt: now.toISOString(),
      },
    ];

    const eventEnquiries: EventEnquiry[] = [
      {
        id: 'enq_1',
        enquiryCode: 'AP-EVT-0041',
        occasionType: 'WEDDING',
        occasionLabel: 'Traditional Royal Wedding',
        preferredDate: new Date(now.getTime() + 45 * 86400000).toISOString().split('T')[0],
        guestCount: 450,
        contactName: 'Amit Verma',
        phone: '9835199201',
        email: 'amit.verma@gmail.com',
        requirements: 'Grand banquet hall + lawn setup, pure vegetarian royal buffet, floral mandap decoration.',
        message: 'We are planning our daughter’s wedding in Lohardaga and would love a complete package walkthrough.',
        status: 'NEW',
        createdAt: new Date(now.getTime() - 2 * 86400000).toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: 'enq_2',
        enquiryCode: 'AP-EVT-0042',
        occasionType: 'BIRTHDAY',
        occasionLabel: 'Grand Family Birthday Celebration',
        preferredDate: new Date(now.getTime() + 10 * 86400000).toISOString().split('T')[0],
        guestCount: 75,
        contactName: 'Sunita Devi',
        phone: '9431102934',
        email: 'sunita.lohardaga@yahoo.com',
        requirements: 'Balloon theme decoration, sound system, kids friendly appetizers and dessert counter.',
        status: 'REVIEWING',
        createdAt: new Date(now.getTime() - 5 * 86400000).toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: 'enq_3',
        enquiryCode: 'AP-EVT-0043',
        occasionType: 'CONFERENCE',
        occasionLabel: 'Corporate Regional Business Summit',
        preferredDate: new Date(now.getTime() + 20 * 86400000).toISOString().split('T')[0],
        guestCount: 40,
        contactName: 'Sanjay Mukherjee',
        phone: '9731204921',
        requirements: 'High definition projector, collar mics, high-speed Wi-Fi, executive buffet lunch.',
        status: 'CONTACTED',
        createdAt: new Date(now.getTime() - 8 * 86400000).toISOString(),
        updatedAt: now.toISOString(),
      },
    ];

    return {
      users,
      currentUserId: null,
      activeRole: 'VISITOR',
      room,
      bookings,
      categories,
      menuItems,
      orders,
      inventory,
      inventoryTransactions,
      bills,
      payments: [],
      eventEnquiries,
    };
  }

  // -------------------------------------------------------------
  // Public Accessors & Auth
  // -------------------------------------------------------------
  public getState(): StoreState {
    return this.state;
  }

  public getActiveRole(): UserRole {
    return this.state.activeRole;
  }

  public getCurrentUser(): User | null {
    if (!this.state.currentUserId) return null;
    return this.state.users.find((u) => u.id === this.state.currentUserId) || null;
  }

  public setActiveRole(role: UserRole) {
    this.state.activeRole = role;
    if (role === 'VISITOR') {
      this.state.currentUserId = null;
    } else if (role === 'CLIENT') {
      this.state.currentUserId = 'user_client_1';
    } else if (role === 'CHEF') {
      this.state.currentUserId = 'user_chef_1';
    } else if (role === 'ADMIN') {
      this.state.currentUserId = 'user_admin_1';
    }
    this.saveState();
  }

  public login(phone: string): { success: boolean; user?: User; error?: string } {
    const user = this.state.users.find((u) => u.phone === phone.trim());
    if (!user) {
      // Auto-register demo guest if phone doesn't exist
      const newUser: User = {
        id: `user_guest_${Date.now()}`,
        phone: phone.trim(),
        name: 'Guest ' + phone.slice(-4),
        role: 'CLIENT',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.state.users.push(newUser);
      this.state.currentUserId = newUser.id;
      this.state.activeRole = 'CLIENT';
      this.saveState();
      return { success: true, user: newUser };
    }

    this.state.currentUserId = user.id;
    this.state.activeRole = user.role;
    this.saveState();
    return { success: true, user };
  }

  public logout() {
    this.state.currentUserId = null;
    this.state.activeRole = 'VISITOR';
    this.saveState();
  }

  // -------------------------------------------------------------
  // Room & Booking Actions
  // -------------------------------------------------------------
  public getRoom(): Room {
    return this.state.room;
  }

  public getBookings(): Booking[] {
    return [...this.state.bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public createBooking(params: {
    guestName: string;
    guestPhone: string;
    checkIn: string;
    checkOut: string;
    guestCount: number;
    specialRequests?: string;
  }): Booking {
    const now = new Date();
    const dIn = new Date(params.checkIn);
    const dOut = new Date(params.checkOut);
    const diffTime = Math.max(dOut.getTime() - dIn.getTime(), 86400000);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const rate = this.state.room.pricePerNight;
    const totalAmount = nights * rate;

    // Ensure user exists
    let guestUser = this.state.users.find((u) => u.phone === params.guestPhone);
    if (!guestUser) {
      guestUser = {
        id: `user_guest_${Date.now()}`,
        name: params.guestName,
        phone: params.guestPhone,
        role: 'CLIENT',
        isActive: true,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };
      this.state.users.push(guestUser);
    }

    const booking: Booking = {
      id: `booking_${Date.now()}`,
      bookingCode: `AP-BKG-${now.getFullYear()}-${String(Math.floor(100 + Math.random() * 900))}`,
      guestId: guestUser.id,
      guestName: params.guestName,
      guestPhone: params.guestPhone,
      roomId: this.state.room.id,
      roomName: this.state.room.name,
      roomNumber: '204',
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      nights,
      guestCount: params.guestCount,
      status: 'CONFIRMED',
      ratePerNight: rate,
      totalAmount,
      specialRequests: params.specialRequests,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    this.state.bookings.unshift(booking);

    // Automatically initialize or add to running bill
    const billItem: BillItem = {
      id: `bi_${Date.now()}`,
      type: 'ROOM',
      description: `${this.state.room.name} (${nights} Night${nights > 1 ? 's' : ''} @ ₹${rate}/night)`,
      quantity: nights,
      unitPrice: rate,
      amount: totalAmount,
      referenceId: booking.id,
      createdAt: now.toISOString(),
    };

    const existingBill = this.state.bills.find((b) => b.guestId === guestUser!.id && b.status === 'OPEN');
    if (existingBill) {
      existingBill.items.push(billItem);
      existingBill.subtotal += totalAmount;
      existingBill.taxAmount = existingBill.subtotal * 0.05;
      existingBill.totalAmount = existingBill.subtotal + existingBill.taxAmount;
      existingBill.remainingAmount = existingBill.totalAmount - existingBill.paidAmount;
      existingBill.updatedAt = now.toISOString();
    } else {
      const subtotal = totalAmount;
      const tax = subtotal * 0.05;
      const newBill: Bill = {
        id: `bill_${Date.now()}`,
        billNumber: `AP-INV-${now.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        guestId: guestUser.id,
        guestName: params.guestName,
        guestPhone: params.guestPhone,
        bookingId: booking.id,
        roomNumber: '204',
        items: [billItem],
        subtotal,
        taxAmount: tax,
        totalAmount: subtotal + tax,
        paidAmount: 0,
        remainingAmount: subtotal + tax,
        status: 'OPEN',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };
      this.state.bills.push(newBill);
    }

    // Set as current client user
    this.state.currentUserId = guestUser.id;
    this.state.activeRole = 'CLIENT';

    this.saveState();
    return booking;
  }

  public updateBookingStatus(bookingId: string, status: Booking['status']) {
    const bkg = this.state.bookings.find((b) => b.id === bookingId);
    if (bkg) {
      bkg.status = status;
      bkg.updatedAt = new Date().toISOString();
      this.saveState();
    }
  }

  // -------------------------------------------------------------
  // Menu & Food Order Actions
  // -------------------------------------------------------------
  public getMenuCategories(): MenuCategory[] {
    return [...this.state.categories].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public getMenuItems(categoryId?: string): MenuItem[] {
    if (categoryId) {
      return this.state.menuItems.filter((m) => m.categoryId === categoryId);
    }
    return this.state.menuItems;
  }

  public toggleMenuItemAvailability(itemId: string) {
    const item = this.state.menuItems.find((m) => m.id === itemId);
    if (item) {
      item.isAvailable = !item.isAvailable;
      this.saveState();
    }
  }

  public updateMenuItemPrice(itemId: string, newPrice: number) {
    const item = this.state.menuItems.find((m) => m.id === itemId);
    if (item && newPrice > 0) {
      item.price = newPrice;
      this.saveState();
    }
  }

  public getOrders(): FoodOrder[] {
    return [...this.state.orders].sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime());
  }

  public createFoodOrder(params: {
    items: { menuItem: MenuItem; quantity: number; notes?: string }[];
    notes?: string;
    roomNumber?: string;
  }): FoodOrder {
    const now = new Date();
    const currentUser = this.getCurrentUser();
    const guestId = currentUser ? currentUser.id : 'user_client_1';
    const guestName = currentUser ? currentUser.name : 'Priya Sharma';
    const guestPhone = currentUser ? currentUser.phone : '9876543210';
    const roomNum = params.roomNumber || '204';

    const orderItems: FoodOrderItem[] = params.items.map((it, idx) => ({
      id: `ord_item_${Date.now()}_${idx}`,
      menuItemId: it.menuItem.id,
      name: it.menuItem.name,
      imageUrl: it.menuItem.imageUrl,
      quantity: it.quantity,
      unitPrice: it.menuItem.price,
      totalPrice: it.menuItem.price * it.quantity,
      isVeg: it.menuItem.isVeg,
      notes: it.notes,
    }));

    const subtotal = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const taxes = subtotal * 0.05;
    const totalAmount = subtotal + taxes;

    // 5 minutes cancellation window
    const cancellableUntil = new Date(now.getTime() + 5 * 60000).toISOString();

    const order: FoodOrder = {
      id: `ord_${Date.now()}`,
      orderNumber: `AP-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      guestId,
      guestName,
      guestPhone,
      roomNumber: roomNum,
      items: orderItems,
      subtotal,
      taxes,
      totalAmount,
      status: 'PLACED',
      notes: params.notes,
      cancellableUntil,
      placedAt: now.toISOString(),
      ingredientsDeducted: false,
    };

    this.state.orders.unshift(order);

    // Attach to running guest bill
    const activeBill = this.state.bills.find((b) => b.guestId === guestId && b.status === 'OPEN');
    if (activeBill) {
      const billItem: BillItem = {
        id: `bi_${Date.now()}`,
        type: 'FOOD',
        description: `Food Order #${order.orderNumber} (${orderItems.length} item${orderItems.length > 1 ? 's' : ''})`,
        quantity: 1,
        unitPrice: totalAmount,
        amount: totalAmount,
        referenceId: order.id,
        createdAt: now.toISOString(),
      };
      activeBill.items.push(billItem);
      activeBill.subtotal += subtotal;
      activeBill.taxAmount += taxes;
      activeBill.totalAmount += totalAmount;
      activeBill.remainingAmount += totalAmount;
      activeBill.updatedAt = now.toISOString();
    }

    this.saveState();
    return order;
  }

  public updateOrderStatus(orderId: string, status: OrderStatus): FoodOrder | null {
    const order = this.state.orders.find((o) => o.id === orderId);
    if (!order) return null;

    const now = new Date().toISOString();
    order.status = status;

    if (status === 'ACCEPTED') order.acceptedAt = now;
    if (status === 'PREPARING') order.preparingAt = now;
    if (status === 'READY') order.readyAt = now;
    if (status === 'DELIVERED') order.deliveredAt = now;
    if (status === 'CANCELLED') order.cancelledAt = now;

    this.saveState();
    return order;
  }

  public cancelFoodOrder(orderId: string): { success: boolean; message: string } {
    const order = this.state.orders.find((o) => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found.' };

    const now = new Date();
    if (now.getTime() > new Date(order.cancellableUntil).getTime() && order.status !== 'PLACED') {
      return { success: false, message: 'Cancellation window has expired. The kitchen has begun preparation.' };
    }

    order.status = 'CANCELLED';
    order.cancelledAt = now.toISOString();

    // Deduct from bill if open
    const activeBill = this.state.bills.find((b) => b.guestId === order.guestId && b.status === 'OPEN');
    if (activeBill) {
      activeBill.items = activeBill.items.filter((it) => it.referenceId !== order.id);
      activeBill.subtotal = activeBill.items.reduce((s, it) => s + (it.type === 'FOOD' ? it.amount / 1.05 : it.amount), 0);
      activeBill.taxAmount = activeBill.subtotal * 0.05;
      activeBill.totalAmount = activeBill.subtotal + activeBill.taxAmount;
      activeBill.remainingAmount = activeBill.totalAmount - activeBill.paidAmount;
      activeBill.updatedAt = now.toISOString();
    }

    this.saveState();
    return { success: true, message: 'Order has been successfully cancelled.' };
  }

  // -------------------------------------------------------------
  // Inventory & Consumption Workflow
  // -------------------------------------------------------------
  public getInventory(): InventoryItem[] {
    return [...this.state.inventory].sort((a, b) => a.name.localeCompare(b.name));
  }

  public getInventoryTransactions(): InventoryTransaction[] {
    return [...this.state.inventoryTransactions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public addStock(params: {
    inventoryItemId: string;
    quantityToAdd: number;
    reason: string;
    userId?: string;
  }): { success: boolean; item?: InventoryItem } {
    const item = this.state.inventory.find((i) => i.id === params.inventoryItemId);
    if (!item) return { success: false };

    const now = new Date().toISOString();
    item.currentQuantity += params.quantityToAdd;
    item.lastUpdated = now;

    const user = this.getCurrentUser();
    const recordedByUserId = params.userId || (user ? user.id : 'user_admin_1');
    const recordedByUserName = user ? user.name : 'Vikramaditya Singh';

    const tx: InventoryTransaction = {
      id: `tx_${Date.now()}`,
      inventoryItemId: item.id,
      itemName: item.name,
      type: 'STOCK_IN',
      quantityChange: params.quantityToAdd,
      unit: item.unit,
      resultingQuantity: item.currentQuantity,
      reason: params.reason,
      recordedByUserId,
      recordedByUserName,
      createdAt: now,
    };

    this.state.inventoryTransactions.unshift(tx);
    this.saveState();
    return { success: true, item };
  }

  public recordIngredientConsumption(params: {
    consumptions: { inventoryItemId: string; quantityUsed: number }[];
    orderId?: string;
    orderNumber?: string;
    reason?: string;
  }): { success: boolean; message: string } {
    const now = new Date().toISOString();
    const user = this.getCurrentUser();
    const recordedByUserId = user ? user.id : 'user_chef_1';
    const recordedByUserName = user ? user.name : 'Chef Rajesh Kumar';

    for (const c of params.consumptions) {
      const item = this.state.inventory.find((i) => i.id === c.inventoryItemId);
      if (item && c.quantityUsed > 0) {
        item.currentQuantity = Math.max(0, Math.round((item.currentQuantity - c.quantityUsed) * 100) / 100);
        item.lastUpdated = now;

        const tx: InventoryTransaction = {
          id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          inventoryItemId: item.id,
          itemName: item.name,
          type: 'CONSUMPTION',
          quantityChange: -c.quantityUsed,
          unit: item.unit,
          resultingQuantity: item.currentQuantity,
          reason: params.reason || `Ingredient used for Order #${params.orderNumber || 'General Prep'}`,
          relatedOrderId: params.orderId,
          relatedOrderNumber: params.orderNumber,
          recordedByUserId,
          recordedByUserName,
          createdAt: now,
        };
        this.state.inventoryTransactions.unshift(tx);
      }
    }

    if (params.orderId) {
      const order = this.state.orders.find((o) => o.id === params.orderId);
      if (order) {
        order.ingredientsDeducted = true;
      }
    }

    this.saveState();
    return { success: true, message: 'Ingredient consumption recorded and stock updated.' };
  }

  // -------------------------------------------------------------
  // Billing & Razorpay Payment Simulation
  // -------------------------------------------------------------
  public getBills(): Bill[] {
    return [...this.state.bills].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getActiveGuestBill(guestId?: string): Bill | null {
    const targetGuestId = guestId || (this.getCurrentUser() ? this.getCurrentUser()!.id : 'user_client_1');
    return this.state.bills.find((b) => b.guestId === targetGuestId && b.status === 'OPEN') || null;
  }

  public recordRazorpayPayment(params: {
    billId: string;
    amount: number;
    paymentId?: string;
  }): { success: boolean; payment: Payment; bill: Bill } {
    const bill = this.state.bills.find((b) => b.id === params.billId);
    if (!bill) throw new Error('Bill not found');

    const now = new Date().toISOString();
    const paymentId = params.paymentId || `pay_rzp_test_${Math.random().toString(36).substr(2, 9)}`;

    const payment: Payment = {
      id: `pay_${Date.now()}`,
      paymentNumber: `AP-PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      billId: bill.id,
      guestId: bill.guestId,
      provider: 'RAZORPAY',
      providerOrderId: `order_rzp_${Math.random().toString(36).substr(2, 9)}`,
      providerPaymentId: paymentId,
      amount: params.amount,
      status: 'SUCCESS',
      paidAt: now,
      createdAt: now,
    };

    bill.paidAmount += params.amount;
    bill.remainingAmount = Math.max(0, bill.totalAmount - bill.paidAmount);
    if (bill.remainingAmount <= 0) {
      bill.status = 'PAID';
    } else {
      bill.status = 'PARTIALLY_PAID';
    }
    bill.updatedAt = now;

    this.state.payments.unshift(payment);
    this.saveState();
    return { success: true, payment, bill };
  }

  // -------------------------------------------------------------
  // Event Enquiries
  // -------------------------------------------------------------
  public getEventEnquiries(): EventEnquiry[] {
    return [...this.state.eventEnquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public createEventEnquiry(params: {
    occasionType: EventEnquiry['occasionType'];
    occasionLabel: string;
    preferredDate: string;
    guestCount: number;
    contactName: string;
    phone: string;
    email?: string;
    requirements: string;
    message?: string;
  }): EventEnquiry {
    const now = new Date().toISOString();
    const enq: EventEnquiry = {
      id: `enq_${Date.now()}`,
      enquiryCode: `AP-EVT-00${Math.floor(45 + Math.random() * 50)}`,
      occasionType: params.occasionType,
      occasionLabel: params.occasionLabel,
      preferredDate: params.preferredDate,
      guestCount: params.guestCount,
      contactName: params.contactName,
      phone: params.phone,
      email: params.email,
      requirements: params.requirements,
      message: params.message,
      status: 'NEW',
      createdAt: now,
      updatedAt: now,
    };

    this.state.eventEnquiries.unshift(enq);
    this.saveState();
    return enq;
  }

  public updateEventEnquiryStatus(enquiryId: string, status: EventEnquiry['status']) {
    const enq = this.state.eventEnquiries.find((e) => e.id === enquiryId);
    if (enq) {
      enq.status = status;
      enq.updatedAt = new Date().toISOString();
      this.saveState();
    }
  }

  // Reset demo store
  public resetToDefault() {
    this.state = this.createSeedState();
    this.saveState();
  }
}

export const dataStore = new AmritDataStore();
