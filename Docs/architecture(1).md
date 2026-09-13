# Amrit Palace — Architecture

## 1. Architecture Purpose

This document defines the technical shape of the **Amrit Palace demo platform**.

The current goal is **not to build a complete production hotel-management system**.

The goal is to build a convincing, polished, working demonstration that shows Amrit Palace what can be achieved:

- A premium cinematic public website
- A believable guest experience
- A working chef workflow
- A working admin workflow
- Connected food ordering
- Connected inventory management
- Guest billing
- Razorpay test checkout
- A shared backend and database where they add real value

The architecture should therefore be:

**Simple enough to build quickly, structured enough to demonstrate real capability, and clean enough to evolve into production later.**

---

# 2. Prototype Mindset

The prototype should prove the product idea.

It does not need to solve every operational complexity that a real hotel would eventually require.

The strongest demonstration is a small number of connected workflows that genuinely work.

### Primary demo chain

**Visitor → Booking → Guest Portal → Food Order → Chef → Inventory → Bill → Payment → Admin**

If this chain works smoothly, the client can see the potential of the larger platform.

---

# 3. High-Level System

The prototype can be structured as:

```text
                    AMRIT PALACE
                         │
             ┌───────────┴───────────┐
             │                       │
      Public Website          Application Portals
             │                       │
             │              ┌────────┼────────┐
             │              │        │        │
             │           Client     Chef     Admin
             │              │        │        │
             └──────────────┴────────┴────────┘
                            │
                       Backend API
                            │
                     Business Services
                            │
                       Prisma ORM
                            │
                      PostgreSQL DB
                            │
                    Razorpay Test API
```

The public website and portals should feel like one product while remaining logically separated.

---

# 4. Technology Direction

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

Experience technologies can include where appropriate:

- GSAP
- ScrollTrigger
- Smooth scrolling
- Three.js / WebGL
- Image sequences
- Masking
- Parallax
- Page transitions

The visual technology should support the experience rather than become the experience itself.

## Backend

- Node.js
- TypeScript
- Express

## Database

- PostgreSQL
- Prisma ORM

## Payments

- Razorpay Test / Sandbox

---

# 5. Suggested Project Structure

```text
amrit-palace/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   ├── guest/
│   │   │   ├── chef/
│   │   │   └── admin/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   │
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── ...
│   │
│   └── ...
│
├── prisma/
│   └── schema.prisma
│
├── docs/
│   ├── vision.md
│   ├── design-direction.md
│   ├── experience-map.md
│   ├── requirements.md
│   ├── architecture.md
│   ├── database.md
│   └── visual-assets.md
│
└── ...
```

The exact folder organisation can evolve if Antigravity identifies a cleaner structure.

The important goal is clear separation of concerns.

---

# 6. Frontend Architecture

The frontend has four major experiences.

## Public

Responsible for:

- Cinematic homepage
- About
- Services
- Stay
- Dining
- Events
- Gallery
- Contact
- Booking entry points

## Guest

Responsible for:

- Dashboard
- Stay
- Bookings
- Food
- Orders
- Bill
- Profile

## Chef

Responsible for:

- Dashboard
- Orders
- Kitchen
- Inventory
- Consumption

## Admin

Responsible for:

- Dashboard
- Bookings
- Guests
- Menu
- Orders
- Inventory
- Payments
- Events / Services
- Staff
- Reports

Shared components and design tokens should keep the experiences visually related.

---

# 7. Backend Architecture

The backend should expose focused API areas.

Conceptually:

```text
/auth
/users
/bookings
/guests
/menu
/orders
/chef
/inventory
/billing
/payments
/events
/admin
```

The exact endpoint design is up to the implementation.

The important principle is that the frontend communicates with the backend through clear APIs rather than directly manipulating database data.

---

# 8. Service Responsibilities

Keep business logic in services.

Examples:

### Booking Service

Handles:
- Availability
- Booking creation
- Booking state
- Booking relationships

### Menu Service

Handles:
- Categories
- Dishes
- Prices
- Availability

### Order Service

Handles:
- Cart/order creation
- Order items
- Order status
- Cancellation rules
- Guest/order relationships

### Inventory Service

Handles:
- Stock
- Stock-in
- Consumption
- Adjustments
- Transaction history
- Low-stock calculations

### Billing Service

Handles:
- Bill creation
- Charge aggregation
- Food charges
- Room charges
- Event/service charges
- Payment state

### Payment Service

Handles:
- Razorpay order creation
- Payment verification
- Payment state

This structure keeps the demo understandable while preparing the codebase for future growth.

---

# 9. Authentication Architecture

For the demo:

**Phone Number + Password**

The backend authenticates the user and establishes the authenticated session.

The account's role determines the available application experience.

Demo users:

```text
Client
Chef
Admin
```

The frontend can route users according to their role.

The backend should also verify permissions for protected actions.

### Production evolution

Later, authentication can become:

**Phone → OTP → Session**

along with stronger security, account recovery, session management and production-grade authorization.

The demo does not need to implement all of that now.

---

# 10. Role-Based Access

The system has three important application roles.

```text
CLIENT
  └── Guest experience

CHEF
  └── Kitchen + inventory consumption

ADMIN
  └── Business operations
```

A simple authorization middleware can protect role-specific API routes.

For example:

```text
Client → /api/orders
Chef   → /api/chef/*
Admin  → /api/admin/*
```

The exact route structure can differ.

The principle is that permissions belong to the backend, not only to frontend navigation.

---

# 11. Booking Architecture

The booking relationship is:

```text
User
  │
  └── Guest Profile
          │
          └── Booking
                │
                └── Room
```

A booking stores the dates, guest relationship, room information, status and applicable charges.

For the demo, availability logic can remain straightforward.

The important result is:

**A visitor creates a booking → the booking becomes visible inside the guest portal → admin can see it.**

---

# 12. Food Architecture

The food system connects four areas:

```text
Admin Menu
     ↓
Guest Menu
     ↓
Food Order
     ↓
Chef Kitchen
     ↓
Inventory Consumption
     ↓
Guest Bill
```

This is one of the most important architectural relationships in the prototype.

The menu should come from shared data.

A guest order should be stored.

The chef should receive that order.

The chef should be able to change its state.

The order should contribute to billing.

Ingredient consumption should connect to inventory.

---

# 13. Food Order State

Initial state machine:

```text
PLACED
   ↓
ACCEPTED
   ↓
PREPARING
   ↓
READY
   ↓
DELIVERED
```

Cancellation can occur while the order remains inside the defined cancellation window.

Once the cutoff has passed, the backend should prevent cancellation.

The UI should clearly communicate the current state.

---

# 14. Inventory Architecture

Inventory is a shared system between Chef and Admin.

### Admin

Adds stock:

```text
Admin
  ↓
Stock In
  ↓
Inventory Quantity +
  ↓
Inventory Transaction
```

### Chef

Consumes stock:

```text
Food Preparation
  ↓
Ingredient Consumption
  ↓
Inventory Quantity -
  ↓
Inventory Transaction
```

### Admin

Reviews:

```text
Current Stock
Stock In
Consumption
Adjustments
45-Day History
Low Stock
```

This gives the prototype a genuine operational loop.

---

# 15. Inventory Data Relationship

Conceptually:

```text
Inventory Item
      │
      ├── Current Quantity
      │
      └── Inventory Transactions
                │
                ├── Stock In
                ├── Consumption
                ├── Adjustment
                └── Correction
```

A transaction can reference:

- Inventory item
- Quantity
- Action
- Reason
- User
- Related order where appropriate
- Timestamp
- Resulting stock

The transaction history should provide a reliable explanation of how the current stock was reached.

---

# 16. Chef Consumption Flow

The chef should have a practical consumption workflow.

Example:

```text
Chef opens order
       ↓
Prepares dishes
       ↓
Records ingredients used
       ↓
Backend validates available stock
       ↓
Inventory is reduced
       ↓
Consumption transaction created
       ↓
Order continues through kitchen workflow
```

For the demo, consumption can be entered manually.

A future production system could eventually use recipes or predefined ingredient mappings.

That complexity is intentionally outside the first prototype.

---

# 17. Inventory History

Admin should be able to inspect the previous **45 days**.

The backend can query transactions using a date range.

The frontend can provide:

- Date filter
- Item filter
- Action filter
- User filter
- Order filter

The primary purpose is operational visibility.

---

# 18. Billing Architecture

A bill can contain multiple charge sources.

```text
Room Charges
      +
Food Charges
      +
Event / Service Charges
      +
Other Charges
      =
Guest Bill
```

A bill should contain individual bill items so the guest and admin can understand the total.

Food orders can create bill items when they are placed or according to the chosen operational rule.

For the prototype, the billing behaviour should be simple and predictable.

---

# 19. Payment Architecture

Razorpay test checkout should be connected through the backend.

Conceptually:

```text
Guest
  ↓
View Bill
  ↓
Checkout
  ↓
Frontend requests payment order
  ↓
Backend creates Razorpay order
  ↓
Razorpay Checkout
  ↓
Payment Result
  ↓
Backend verifies
  ↓
Payment stored
  ↓
Bill updated
  ↓
Guest sees confirmation
```

The prototype uses test credentials and test mode.

Production payment configuration can be introduced later.

---

# 20. Event Architecture

Events can remain intentionally lightweight in the prototype.

Relationship:

```text
Visitor
  ↓
Event Enquiry
  ↓
Admin
  ↓
Review / Follow-up
  ↓
Event Booking
  ↓
Charges
  ↓
Guest Bill
```

The system does not need a complete event-management ERP in the first version.

It needs enough functionality to demonstrate the concept.

---

# 21. Admin Architecture

The admin experience is a view across the connected systems.

Admin can access:

```text
Bookings
Guests
Menu
Orders
Inventory
Events
Payments
Staff
Reports
```

The dashboard can derive its information from the same underlying data.

For example:

**Food Orders Today** should be based on actual order records.

**Low Stock** should be based on inventory quantities.

**Revenue** should be based on billing/payment data.

The prototype should prefer real derived values over invented dashboard numbers.

---

# 22. Data Flow Example

A complete demo interaction could look like:

```text
Guest books room
      ↓
Booking stored
      ↓
Guest opens menu
      ↓
Guest places food order
      ↓
Order stored
      ↓
Chef sees order
      ↓
Chef accepts
      ↓
Chef prepares
      ↓
Chef records ingredient consumption
      ↓
Inventory decreases
      ↓
Transaction recorded
      ↓
Chef marks order ready
      ↓
Chef marks delivered
      ↓
Food charge appears on bill
      ↓
Guest checks out
      ↓
Razorpay test payment
      ↓
Payment verified
      ↓
Admin sees resulting activity
```

This is the architectural heart of the prototype.

---

# 23. Demo Data Strategy

The application should be seeded with believable demonstration data.

Seed:

- Client account
- Chef account
- Admin account
- Room
- Example booking
- Menu categories
- Attractive dishes
- Food images
- Example orders
- Inventory items
- Stock levels
- Inventory transactions
- Event enquiries
- Bills
- Payment examples

The seed data should make every dashboard immediately useful.

---

# 24. State Synchronisation

For the prototype, the system does not need an elaborate real-time infrastructure.

After an action, the relevant interface can:

- Update local state
- Refetch the affected data
- Refresh a relevant query
- Revalidate the page

For example:

Chef changes:

**PREPARING → READY**

The guest can refresh or revalidate their order data and see the new state.

If Antigravity chooses a lightweight real-time approach that materially improves the demo, it can introduce one.

The prototype should prioritise reliable behaviour over unnecessary infrastructure.

---

# 25. API and Frontend Separation

The frontend should not know database implementation details.

The flow should be:

```text
React UI
   ↓
Frontend Service / API Client
   ↓
Express API
   ↓
Backend Service
   ↓
Prisma
   ↓
PostgreSQL
```

This makes the system easier to understand and later replace or expand.

---

# 26. Error Handling

The backend should return useful errors for situations such as:

- Invalid login
- Booking unavailable
- Invalid booking dates
- Unavailable food item
- Invalid quantity
- Insufficient inventory
- Invalid order state transition
- Cancellation cutoff reached
- Invalid payment state

The frontend should turn these into clear user feedback.

---

# 27. Prototype Security Baseline

Even though this is a demo, use sensible foundations:

- Passwords should not be stored as plain text
- Protected routes should require authentication
- Role permissions should be checked server-side
- Secrets should live in environment variables
- Razorpay credentials should remain server-side
- User input should be validated
- Database access should be handled through controlled backend operations

This provides a sensible foundation without turning the prototype into a full security-hardening project.

---

# 28. Environment Configuration

Keep environment-specific values outside source code.

Examples:

```text
DATABASE_URL
PORT
AUTH_SECRET
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
```

Use an environment file for local development.

Never place private credentials inside frontend code.

---

# 29. Performance Architecture

The public website may contain large visual assets.

Plan for:

- Video optimisation
- Lazy-loaded images
- Responsive image sizes
- Efficient frame loading
- Controlled WebGL usage
- Animation optimisation
- Mobile media strategies

The application portals can prioritise fast navigation and data rendering.

---

# 30. Architecture vs Future Production

The prototype architecture should be capable of evolving.

However, the current implementation should remain intentionally focused.

### Build now

- Working authentication
- Working roles
- Working booking
- Working food ordering
- Working chef status flow
- Working inventory
- Working billing
- Working Razorpay test checkout
- Shared PostgreSQL database
- Clean backend API

### Later

- Real OTP
- Advanced room inventory
- Complex hotel front-desk operations
- Automated recipe-to-inventory deductions
- Notifications
- SMS / WhatsApp
- Advanced reporting
- Production payment configuration
- Comprehensive audit systems
- Advanced security and monitoring
- Multi-property support if ever required

The architecture should leave these doors open without building them prematurely.

---

# 31. Engineering Philosophy

This is a **demo that behaves like a real product**.

That means we should avoid both extremes:

### Too shallow

A collection of pretty pages with fake buttons and disconnected mock data.

### Too heavy

A massive enterprise architecture that takes weeks to build before anyone can see the product.

The right middle ground is:

**Real core workflows + clean structure + premium experience + focused scope.**

---

# 32. Antigravity's Engineering Freedom

This document defines the system relationships and prototype boundaries.

Antigravity should use its judgement for implementation details.

It can improve:

- Folder organisation
- API naming
- State management
- Validation
- Query patterns
- Component architecture
- Animation architecture
- Database indexing
- Error handling
- Loading strategies

When a simpler solution produces the same quality of demo, prefer the simpler solution.

When a more sophisticated technique materially improves the experience or reliability, use it.

---

# 33. Architecture North Star

The architecture should make this sentence true:

> **A guest can interact with Amrit Palace, the chef can act on that interaction, the inventory can reflect that action, the bill can reflect the guest's activity, and the admin can see the complete picture.**

That is enough to demonstrate the power of the platform.

The first version does not need to be the final hotel operating system.

It needs to make Amrit Palace see what the final system **could become**.
