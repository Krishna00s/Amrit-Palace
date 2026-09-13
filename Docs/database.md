# Amrit Palace — Database Design

## 1. Purpose

This document defines the data model for the **Amrit Palace demo platform**.

The database should support the connected workflows that prove the product concept without introducing unnecessary hotel-management complexity.

The central relationship is:

**Guest → Booking → Stay → Food Order → Chef → Inventory → Bill → Payment**

The database should be clean, understandable and easy to extend after the client approves the prototype.

---

# 2. Database Technology

Use:

- PostgreSQL
- Prisma ORM

Prisma should provide the application with typed access to the database.

The schema should prioritise clear relationships and sensible constraints.

---

# 3. Core Entities

The initial database can contain:

```text
User
Role
GuestProfile
Room
Booking
EventEnquiry
EventBooking
MenuCategory
MenuItem
FoodOrder
FoodOrderItem
InventoryItem
InventoryTransaction
Bill
BillItem
Payment
Staff
```

Some entities may be combined where the implementation finds a simpler design appropriate for the prototype.

---

# 4. User

The `User` represents an authenticated account.

Suggested fields:

```text
id
phone
passwordHash
role
name
isActive
createdAt
updatedAt
```

The prototype uses:

**Phone Number + Password**

Passwords must be stored as hashes.

The production system can later evolve toward phone OTP authentication.

---

# 5. Role

Initial roles:

```text
CLIENT
CHEF
ADMIN
```

Role information controls which application experience and protected operations are available.

The backend should enforce role permissions.

---

# 6. Guest Profile

A guest profile stores information relevant to a client's stay.

Suggested fields:

```text
id
userId
name
phone
createdAt
updatedAt
```

Relationship:

```text
User
  └── GuestProfile
        ├── Bookings
        ├── FoodOrders
        └── Bills
```

A client account can have multiple bookings over time.

---

# 7. Room

The prototype should represent the actual room offering at Amrit Palace.

There is currently one room type.

Suggested fields:

```text
id
name
description
features
pricePerNight
isAvailable
createdAt
updatedAt
```

If the actual property later requires individual room inventory, a separate physical-room entity can be introduced.

For the prototype, the model should remain simple.

---

# 8. Booking

A booking connects a guest to a room and stay period.

Suggested fields:

```text
id
guestId
roomId
checkIn
checkOut
guestCount
status
totalAmount
createdAt
updatedAt
```

Initial statuses:

```text
REQUESTED
CONFIRMED
CHECKED_IN
CHECKED_OUT
CANCELLED
```

Relationship:

```text
Guest
  └── Booking
        └── Room
```

A booking is also the main context that connects the guest to food orders and the running bill.

---

# 9. Event Enquiry

An event enquiry represents a request from a visitor or client.

Suggested fields:

```text
id
userId (optional)
occasionType
preferredDate
guestCount
contactName
phone
requirements
message
status
createdAt
updatedAt
```

Possible statuses:

```text
NEW
REVIEWING
CONTACTED
CONFIRMED
CANCELLED
```

The prototype can keep this workflow lightweight.

---

# 10. Event Booking

If an enquiry becomes an actual event booking, it can be represented separately.

Suggested fields:

```text
id
enquiryId
guestId
eventDate
occasionType
guestCount
amount
status
notes
createdAt
updatedAt
```

Possible statuses:

```text
PENDING
CONFIRMED
COMPLETED
CANCELLED
```

Event charges can later contribute to a guest bill.

---

# 11. Menu Category

Represents a food category.

Suggested fields:

```text
id
name
description
sortOrder
isActive
createdAt
updatedAt
```

Examples can include:

- Starters
- Main Course
- Breads
- Rice / Biryani
- Snacks
- Desserts
- Beverages

Actual categories should come from the menu data.

---

# 12. Menu Item

Represents a dish available to guests.

Suggested fields:

```text
id
categoryId
name
description
imageUrl
price
isAvailable
isActive
createdAt
updatedAt
```

Relationships:

```text
MenuCategory
  └── MenuItem
        └── FoodOrderItem
```

The same menu data should power both the public dining experience and the authenticated guest ordering experience.

---

# 13. Food Order

A `FoodOrder` represents an order placed by a guest.

Suggested fields:

```text
id
guestId
bookingId
status
subtotal
totalAmount
notes
placedAt
acceptedAt
preparingAt
readyAt
deliveredAt
cancelledAt
createdAt
updatedAt
```

Initial statuses:

```text
PLACED
ACCEPTED
PREPARING
READY
DELIVERED
CANCELLED
```

The `bookingId` connects food activity to the guest's stay.

---

# 14. Food Order Item

Each order contains one or more items.

Suggested fields:

```text
id
orderId
menuItemId
quantity
unitPrice
totalPrice
```

The `unitPrice` should be stored on the order item so historical orders retain the price at the time of purchase even if the menu price later changes.

Relationship:

```text
FoodOrder
  └── FoodOrderItem
        └── MenuItem
```

---

# 15. Inventory Item

Represents an ingredient or operational stock item.

Suggested fields:

```text
id
name
category
unit
currentQuantity
minimumQuantity
isActive
createdAt
updatedAt
```

Examples:

```text
Rice
Flour
Paneer
Butter
Cooking Oil
Vegetables
Spices
```

The prototype should use realistic quantities.

---

# 16. Inventory Transaction

This is one of the most important database entities.

It records every meaningful movement of inventory.

Suggested fields:

```text
id
inventoryItemId
type
quantity
reason
orderId (optional)
userId
createdAt
```

Transaction types:

```text
STOCK_IN
CONSUMPTION
ADJUSTMENT
CORRECTION
```

The transaction should preserve the history of what happened.

Example:

```text
Rice
+25 kg
STOCK_IN
Admin
12 Sep 2026
```

or:

```text
Rice
-2 kg
CONSUMPTION
Order #1042
Chef
12 Sep 2026
```

---

# 17. Inventory Quantity Rules

The system should maintain a current quantity for each inventory item.

Conceptually:

```text
New Quantity =
Previous Quantity
+ Stock In
- Consumption
± Adjustments
```

The backend should be responsible for applying inventory changes.

The frontend should request an inventory operation rather than directly modifying the current quantity.

---

# 18. Inventory and Food Order Relationship

When the chef records ingredient consumption, the transaction can optionally reference the food order that caused the consumption.

This creates:

```text
FoodOrder
   │
   └── InventoryTransaction
          │
          └── InventoryItem
```

This is valuable because admin can later understand:

**Which order caused this stock movement?**

---

# 19. Bill

A bill represents the guest's running financial statement.

Suggested fields:

```text
id
guestId
bookingId
status
subtotal
totalAmount
paidAmount
remainingAmount
createdAt
updatedAt
```

Possible statuses:

```text
OPEN
PARTIALLY_PAID
PAID
CANCELLED
```

For the prototype, a guest can have a bill associated with their stay.

---

# 20. Bill Item

Every charge should be represented as a bill item.

Suggested fields:

```text
id
billId
type
description
quantity
unitPrice
amount
referenceId (optional)
createdAt
```

Charge types:

```text
ROOM
FOOD
EVENT
SERVICE
OTHER
```

Examples:

```text
Room — 2 nights
Butter Paneer — 1
Biryani — 2
Event Service — 1
```

This makes the bill understandable to both guest and admin.

---

# 21. Food → Bill Relationship

When a guest places food orders, the resulting food charges should be associated with the guest's bill.

Conceptually:

```text
FoodOrder
    ↓
FoodOrderItem
    ↓
BillItem
    ↓
Guest Bill
```

The prototype can use a simple predictable rule for when food charges are added.

The important thing is that the guest's bill reflects their food activity.

---

# 22. Room → Bill Relationship

Room charges should also contribute to the bill.

Conceptually:

```text
Booking
   ↓
Room Charge
   ↓
BillItem
   ↓
Guest Bill
```

For the prototype, room charges can be calculated from:

```text
Number of nights × Room price
```

The exact pricing can be controlled through seeded demo data.

---

# 23. Event → Bill Relationship

If an event becomes a confirmed booking and carries a charge:

```text
EventBooking
     ↓
Event Charge
     ↓
BillItem
     ↓
Guest Bill
```

This can remain lightweight during the demo.

---

# 24. Payment

Represents a payment attempt or completed payment.

Suggested fields:

```text
id
billId
guestId
provider
providerOrderId
providerPaymentId
amount
status
paidAt
createdAt
updatedAt
```

Provider:

```text
RAZORPAY
```

Statuses:

```text
PENDING
SUCCESS
FAILED
CANCELLED
```

Razorpay identifiers should be stored so payment records can be reconciled.

---

# 25. Staff

A lightweight staff record can support the admin experience.

Suggested fields:

```text
id
name
role
phone
status
createdAt
updatedAt
```

This does not need to become a complete HR system.

---

# 26. Core Relationships

The primary relationships should resemble:

```text
User
 ├── GuestProfile
 │     ├── Booking
 │     │     └── Room
 │     ├── FoodOrder
 │     │     └── FoodOrderItem
 │     │           └── MenuItem
 │     └── Bill
 │           ├── BillItem
 │           └── Payment
 │
 └── Role
```

Inventory:

```text
InventoryItem
    └── InventoryTransaction
            ├── User
            └── FoodOrder (optional)
```

Events:

```text
EventEnquiry
    └── EventBooking
            └── BillItem
```

---

# 27. The Complete Data Chain

The database should support this exact demonstration:

```text
Guest
  ↓
Booking
  ↓
Stay
  ↓
Food Order
  ↓
Chef
  ↓
Ingredient Consumption
  ↓
Inventory Transaction
  ↓
Updated Inventory
  ↓
Food Charge
  ↓
Guest Bill
  ↓
Razorpay Payment
  ↓
Payment Record
  ↓
Admin Visibility
```

This is the core reason the database matters.

---

# 28. Demo Inventory Example

Seed an inventory state such as:

```text
Rice       50 kg
Flour      25 kg
Paneer     15 kg
Butter     10 kg
Oil        20 L
```

The exact quantities are demonstration data.

When a chef records:

```text
Rice - 2 kg
Paneer - 1 kg
Butter - 0.25 kg
```

the database should reflect:

```text
Current Stock ↓
Consumption Transactions ↑
Order Reference recorded
```

Admin should immediately be able to inspect the movement.

---

# 29. 45-Day History

The database should retain inventory transactions with timestamps.

Admin can request:

```text
now - 45 days
```

through the API.

The frontend can present the resulting history with filters.

The prototype does not need an elaborate archival system.

A normal timestamped transaction table is sufficient.

---

# 30. Database Constraints

Useful constraints include:

- Unique user phone numbers
- Positive quantities where appropriate
- Valid prices
- Valid booking dates
- Valid order quantities
- Valid inventory quantities
- Required relationships for protected records

The exact constraints should be implemented naturally through Prisma and backend validation.

---

# 31. Transactions and Consistency

Inventory updates are a particularly important place for database consistency.

When consumption occurs:

```text
Check Stock
+
Decrease Inventory
+
Create Transaction
```

should happen as one logical database operation.

If one part fails, the inventory update should not be left half-complete.

Similarly, payment verification and bill updates should be handled carefully.

---

# 32. Seed Strategy

Create a development seed script that creates:

- Demo users
- Roles
- Room
- Menu categories
- Menu items
- Inventory items
- Inventory stock
- Example bookings
- Example orders
- Example inventory transactions
- Event enquiries
- Bills
- Example payments

The seed should be repeatable so the demo environment can be reset easily.

---

# 33. Demo Accounts

Provide clearly documented demo credentials.

Example:

```text
Client
Phone: demo client account
Password: demo password

Chef
Phone: demo chef account
Password: demo password

Admin
Phone: demo admin account
Password: demo password
```

Actual credentials should be defined in the project's seed/configuration rather than hardcoded into this documentation.

---

# 34. Data Ownership

Conceptually:

### Client

Reads and creates data related to their own experience.

### Chef

Reads operational orders and inventory relevant to kitchen work.

Can create:
- Order status changes
- Ingredient consumption

### Admin

Has broad management visibility.

Can create / update:
- Menu
- Stock
- Bookings
- Events
- Operational records
- Staff
- Other supported management data

The backend should enforce these boundaries.

---

# 35. Prototype Simplifications

The database intentionally avoids unnecessary complexity.

The prototype does not need:

- Full hotel room allocation across dozens of room records
- Complex rate plans
- Seasonal pricing
- Recipe management
- Automated ingredient deduction from recipes
- Supplier management
- Purchase orders
- Warehouse management
- Payroll
- Full accounting
- Multi-property architecture

These can be introduced later if the client approves the broader platform.

---

# 36. Future Evolution

The schema should remain extensible toward:

- Real hotel room inventory
- Multiple room types
- Multiple physical rooms
- Recipe / ingredient mappings
- Automatic inventory deduction
- Supplier management
- Purchase orders
- Advanced event management
- Notifications
- Production authentication
- Detailed audit logs
- Advanced reporting
- Multiple properties

The prototype should not implement these simply because they might exist someday.

---

# 37. Database North Star

The database should make the prototype tell one coherent story:

**A guest books a room.**

**That guest orders food.**

**The chef receives and prepares it.**

**The chef records what was consumed.**

**Inventory changes.**

**The system records why it changed.**

**The food appears on the guest's bill.**

**The guest pays.**

**The admin can see what happened.**

If the database can support that chain cleanly, it is doing its job for this phase of the project.
