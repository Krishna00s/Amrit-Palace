# Amrit Palace — Product Requirements

## 1. Purpose

This document turns the Amrit Palace experience map into a practical product definition for the first working prototype.

The prototype should demonstrate a believable, connected hotel experience rather than a collection of static screens.

Core product:
- Cinematic public website
- Client / Guest portal
- Chef portal
- Admin portal
- Shared Node.js backend
- PostgreSQL database with Prisma
- Authentication and role-based access
- Connected booking, food, inventory and billing workflows
- Razorpay test checkout

The prototype should be polished enough to present to Amrit Palace while keeping implementation focused on the workflows that prove the product's value.

---

## 2. Product Vision

Amrit Palace should have a digital presence that feels as thoughtful as the physical place.

The public website creates desire and communicates the breadth of the property. The application layer turns that interest into an operational experience.

The central relationship is:

**Visitor → Booking → Stay → Dining → Kitchen → Inventory → Billing → Payment → Administration**

The system should make these relationships visible through real working interactions.

---

## 3. User Roles

### Visitor
Can:
- Explore Amrit Palace
- View the property
- Explore the room
- Explore food
- Explore occasions and services
- View gallery / visual content
- Contact Amrit Palace
- Start a room booking
- Submit an event enquiry
- Enter the client experience

### Client / Guest
Can:
- Sign in
- View dashboard
- View stay
- View bookings
- Browse food
- Place food orders
- Track food orders
- Cancel eligible food orders
- View running bill
- Pay through Razorpay test checkout
- View profile

### Chef
Can:
- Sign in
- View kitchen dashboard
- Receive food orders
- Accept orders
- Move orders through preparation states
- Mark orders ready / delivered
- View relevant inventory
- Record ingredient consumption
- Review consumption activity

### Admin
Can:
- Sign in
- View business dashboard
- Manage bookings
- Manage guests
- Manage food menu
- Manage rooms
- Manage services / events
- Manage orders
- Manage inventory
- Add stock
- Review consumption
- Review 45-day inventory history
- Manage staff records
- View payments
- View reports

---

## 4. Authentication

### Prototype

Use:

**Phone Number + Password**

Seeded demo accounts should exist for:
- Client
- Chef
- Admin

The demo should make role switching easy during presentation.

### Production direction

The architecture should leave room for:

**Phone Number → OTP → Authenticated Session**

Production can later add OTP delivery, secure sessions, recovery, device management and stronger authorization.

---

# 5. Public Website

## Navigation

Primary navigation:
- Home
- Services
- About Us
- Contact Us

Rooms, Dining, Gallery and Events can be integrated where they strengthen the experience.

## Homepage

The homepage should be a cinematic introduction following:

**Arrival → Discovery → Stay → Dine → Celebrate → Meet → Brand**

The approximately 33-second Amrit Palace film is a major visual asset. The extracted 30fps archive is available at:

`docs/amrit_palace_frames_30fps.zip`

The site can use the film, individual frames, image sequences or combinations where appropriate.

## Stay

Amrit Palace currently has one room type. Present the actual offering honestly, including features such as:
- Air conditioning
- Master bed
- Television where applicable
- Comfortable accommodation

Do not invent additional room categories.

Visitor actions:
- View room
- Check availability
- Begin booking
- Contact property

## Dining

Dining should be one of the strongest visual experiences.

The menu should feel like a premium digital restaurant experience rather than a plain table of dishes.

Dish data can include:
- Name
- Image
- Description
- Price
- Category
- Availability
- Dietary information where known

Use:
- Large food photography
- Editorial layouts
- Smooth transitions
- Layered imagery
- Hover / tap interactions
- Dish detail experiences
- Elegant typography
- Strong visual hierarchy

The goal is simple:

**Make the visitor hungry.**

The journey should feel like:

**Discover → Explore → Select → Order**

## Events & Services

Communicate the range of occasions Amrit Palace can host:
- Weddings
- Birthdays
- Anniversaries
- Ceremonies
- Conferences
- Corporate meetings
- Family gatherings
- Private events
- Custom occasions

Use strong visual storytelling rather than excessive copy.

---

# 6. Event Enquiry

Where final event pricing depends on requirements, support an enquiry flow:

**Visitor → Event Enquiry → Admin Review → Follow-up → Event Booking**

Useful fields:
- Occasion type
- Preferred date
- Guest count
- Contact details
- Requirements
- Additional message

The prototype may simplify confirmation while preserving the workflow.

---

# 7. Room Booking

A room booking should associate:
- Guest
- Room / room type
- Check-in
- Check-out
- Number of guests
- Booking status
- Price / charges
- Created timestamp

Initial booking states:
- Requested
- Confirmed
- Checked In
- Checked Out
- Cancelled

Flow:

**Visitor → Room → Dates → Availability → Guest Details → Booking → Confirmation → Guest Dashboard**

A successful booking must become visible to the client.

---

# 8. Client / Guest Portal

Core areas:
- Dashboard
- My Stay
- My Bookings
- Food / Dining
- My Orders
- My Bill
- Profile

The dashboard should immediately communicate:
- Current stay
- Upcoming booking
- Room information
- Recent order
- Active order status
- Running bill
- Quick food access
- Quick booking access

---

# 9. Food Ordering

The guest should be able to:
- Browse categories
- Browse dishes
- View dish details
- See prices
- See availability
- Select quantity
- Add to cart
- Modify quantities
- Remove items
- Review cart
- Place order

An order should contain:
- Guest
- Stay / booking relationship where applicable
- Items
- Quantities
- Prices
- Subtotal
- Total
- Status
- Timestamp
- Relevant notes

Order status:

**Placed → Accepted → Preparing → Ready → Delivered**

Status changes made by the chef should become visible to the guest.

## Food order cancellation

Support a defined cancellation window:

**Order Placed → Cancellation Window → Cutoff → Order Locked**

The backend should enforce the actual rule. The prototype can use a clearly defined simplified duration.

## Food charges

Food orders contribute to the guest's running bill rather than requiring isolated payment for every order.

**Room Charges + Food Charges + Event / Service Charges + Other Charges = Guest Bill**

---

# 10. Chef Portal

The chef's primary concerns are:

**What needs to be prepared, what is available, and what ingredients were consumed?**

Core areas:
- Dashboard
- New Orders
- Kitchen / Active Orders
- Inventory
- Consumption / Stock Usage

Each order should show:
- Order number
- Guest / room context where appropriate
- Items
- Quantities
- Notes
- Time
- Status

Chef actions:
- Accept
- Start preparing
- Mark ready
- Mark delivered

The kitchen interface should be fast and practical.

---

# 11. Inventory Management — Core Product Feature

Inventory is a core operational system, not a decorative admin feature.

The system tracks ingredients and stock used for food preparation.

Core lifecycle:

**Stock In → Available Inventory → Ingredient Consumption → Updated Inventory → Transaction History**

## Inventory items

Useful fields:
- Item name
- Category
- Unit
- Current quantity
- Minimum / low-stock threshold
- Active status
- Created / updated timestamps

Demo data can include realistic ingredients such as rice, flour, paneer, butter, cooking oil, vegetables and spices.

## Admin stock in

Admin can record:
- Item
- Quantity
- Unit
- Date / time
- Reason / supplier reference where useful
- User responsible

When stock is added:

**Inventory increases + Stock-In transaction is created**

## Chef consumption

While preparing an order, the chef records ingredients consumed.

Example:
- Paneer
- Butter
- Flour
- Rice
- Other ingredients

The system should:
1. Check available stock
2. Reduce inventory
3. Record consumption
4. Associate it with the order where appropriate
5. Make updated stock visible to authorised users

---

# 12. Inventory Transaction Ledger

Every meaningful inventory movement should create a transaction.

Useful fields:
- Date
- Time
- Item
- Quantity
- Unit
- Action
- Reason
- Related order where applicable
- User
- Resulting stock

Actions:
- Stock In
- Consumption
- Adjustment
- Correction

## 45-day history

Admin must be able to inspect the previous **45 days** of inventory activity.

Useful filters:
- Date
- Item
- Action
- User
- Order
- Category

The system should make it easy to answer:

**What came in? What was consumed? When? How much? Who recorded it?**

## Low stock

Support minimum stock thresholds.

When stock reaches or falls below its threshold, identify the item as low stock.

Admin can see:
- Low-stock count
- Low-stock items
- Current quantity
- Threshold

---

# 13. Connected Food + Inventory Workflow

This is a flagship prototype workflow:

**Guest Places Food Order**
↓
**Chef Receives Order**
↓
**Chef Prepares Food**
↓
**Chef Records Ingredients Consumed**
↓
**Inventory Decreases**
↓
**Consumption Transaction Recorded**
↓
**Food Order Marked Ready**
↓
**Guest Receives Food**
↓
**Food Charge Appears on Guest Bill**

This must work as a connected flow.

---

# 14. Admin Portal

Core areas:
- Dashboard
- Bookings
- Guests
- Orders
- Menu
- Rooms
- Services / Events
- Inventory
- Staff
- Payments
- Reports

## Dashboard

Useful information:
- Occupancy
- Bookings
- Upcoming events
- Food orders
- Revenue
- Pending enquiries
- Low-stock items
- Recent payments
- Inventory activity

## Menu management

Admin can:
- Create dish
- Edit dish
- Add / update image
- Set name
- Set description
- Set price
- Assign category
- Set availability
- Disable dish

The guest menu should consume the same underlying menu data:

**Admin Menu → Guest Menu → Food Order → Chef**

## Booking management

Admin can review:
- Room bookings
- Event enquiries
- Event bookings
- Guest information
- Dates
- Status
- Requirements
- Charges

## Guest management

Admin can view relevant:
- Guest name
- Phone number
- Current / previous booking
- Current stay
- Orders
- Bill
- Account status

## Services / events

Admin can:
- View enquiries
- Update enquiry status
- Review requirements
- Associate event with client
- Record relevant charges

## Inventory

Admin can:
- View current stock
- Add stock
- Review movement
- Identify low stock
- Inspect chef consumption
- Review adjustments
- Review 45-day history
- Understand consumption

## Staff

A basic staff area can contain:
- Name
- Role
- Contact information where appropriate
- Status

Additional operational roles can be introduced later.

---

# 15. Billing

The bill aggregates applicable charges.

Charge types:
- Room
- Food
- Event / banquet
- Services
- Other approved charges

Bill should show:
- Line items
- Quantity where applicable
- Unit price
- Amount
- Subtotal
- Total
- Payment status

The guest should understand exactly what they are paying for.

---

# 16. Razorpay Test Payment

Prototype flow:

**Guest Bill → Checkout → Backend Creates Razorpay Order → Razorpay Checkout → Backend Verifies Payment → Database Updated → Confirmation**

Use Razorpay test / sandbox mode.

Payment states:
- Pending
- Successful
- Failed
- Cancelled

The browser should not be treated as the sole source of payment truth.

Admin should be able to view:
- Guest
- Bill
- Amount
- Payment status
- Payment reference
- Date / time

---

# 17. Role-Based Access

Experience-level access:

**Client → Guest features**

**Chef → Kitchen + inventory consumption**

**Admin → Business operations + management**

Role authorization should ultimately be enforced server-side. The frontend should reflect role permissions but the backend remains the source of truth.

---

# 18. Core Database Entities

Likely entities:
- User
- Role
- Guest Profile
- Room
- Room Booking
- Event / Service
- Event Enquiry
- Menu Category
- Menu Item
- Food Order
- Food Order Item
- Inventory Item
- Inventory Transaction
- Bill
- Bill Item
- Payment
- Staff

Use clean relationships and keep the schema extensible for production.

---

# 19. Backend

Technology direction:
- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL

API areas:
- Authentication
- Users
- Bookings
- Guests
- Menu
- Food orders
- Chef workflow
- Inventory
- Billing
- Payments
- Admin operations

Business logic should live in backend services rather than being scattered through frontend components.

---

# 20. Frontend

Technology direction:
- React
- TypeScript
- Vite
- Tailwind CSS

Appropriate experience technologies may include:
- GSAP
- ScrollTrigger
- Smooth scrolling
- Three.js / WebGL
- Image sequences
- Masking
- Parallax
- Depth
- Page transitions

Use technology according to the experience being created.

Internal portals should prioritise clarity and speed while retaining the Amrit Palace visual language.

---

# 21. Responsive Experience

Support:
- Desktop
- Laptop
- Tablet
- Mobile

Public priorities:
- Cinematic visuals
- Readability
- Touch interaction
- Fast navigation

Guest priorities:
- Food ordering
- Booking
- Order tracking
- Bill access

Chef priorities:
- Order visibility
- Fast status updates
- Inventory consumption

Admin priorities:
- Information density
- Lists / tables
- Filters
- Dashboard visibility

---

# 22. Important Application States

Support meaningful states:
- Loading
- Empty
- Available
- Unavailable
- Pending
- Confirmed
- Cancelled
- Accepted
- Preparing
- Ready
- Delivered
- Payment successful
- Payment failed
- Low stock
- Error
- Enquiry submitted

Every state should provide useful feedback and an obvious next action.

---

# 23. Demo Data

Seed realistic data so the prototype feels alive.

Include:
- Demo guests
- Room data
- Example bookings
- Menu categories
- Attractive food items
- Food images
- Example food orders
- Chef order history
- Inventory items
- Stock quantities
- Inventory transactions
- Event enquiries
- Bills
- Test payment records

Data should tell a believable story without making unsupported claims about the real business.

---

# 24. Visual Assets

Prioritise real Amrit Palace assets wherever available.

Asset groups:
- Exterior
- Interior
- Food
- Events
- Branding
- Cinematic video
- Extracted video frames

Existing frame archive:

`docs/amrit_palace_frames_30fps.zip`

Keep assets organised for continued visual development.

---

# 25. Visual Quality — Especially Food

The food section is a signature part of the product.

The menu should feel capable of stopping someone mid-scroll.

Give strong food photography room to breathe.

Potential treatments:
- Full-bleed food imagery
- Large dish reveals
- Editorial grids
- Horizontal exploration
- Detail overlays
- Smooth image transitions
- Layered cards
- Tasteful motion
- Micro-interactions

The goal is not decoration for its own sake.

The goal is **desire**.

The guest should see the food and think:

**“I want that.”**

---

# 26. Design Direction

Follow `design-direction.md`.

Visual character:
- Cinematic
- Editorial
- Warm
- Refined
- Architectural
- Modern
- Immersive
- Authentic

Public experience:
- Cinematic visual storytelling
- Restrained glassmorphism as an architectural layer
- Video provides emotion and environmental colour
- Interface provides structure and calm

Internal portals:
- Same brand system
- More functional
- More information-dense
- Clear hierarchy
- Strong usability

---

# 27. Performance

The cinematic direction should remain smooth.

Consider:
- Optimised video
- Responsive image sizing
- Lazy loading
- Appropriate formats
- Progressive loading
- Efficient animation
- Mobile-specific media strategies
- Efficient WebGL usage

Visual richness should be supported by thoughtful engineering.

---

# 28. Accessibility

Maintain sensible accessibility practices:
- Readable contrast
- Keyboard navigation
- Meaningful labels
- Focus states
- Reduced-motion support
- Semantic structure
- Touch target sizing
- Accessible form feedback

Accessibility should coexist with the visual experience.

---

# 29. Prototype Boundary

## Core

- Public website
- Demo authentication
- Client dashboard
- Room booking
- Food ordering
- Chef order workflow
- Chef inventory consumption
- Admin stock management
- Inventory ledger
- 45-day history
- Guest bill
- Razorpay test payment

## Simplified

- Event administration
- Staff management
- Reports
- Advanced room operations
- Advanced hotel operations
- Notifications

## Production expansion

- Real OTP
- Production payments
- Advanced RBAC
- Notifications
- SMS / WhatsApp
- Detailed hotel front-desk operations
- Advanced availability
- Production monitoring
- Security hardening
- Comprehensive audit controls

---

# 30. Prototype Success Criteria

The prototype succeeds when someone can watch this sequence happen:

1. Visitor explores the cinematic Amrit Palace website.
2. Visitor discovers the room and books it.
3. Visitor enters the guest experience.
4. Guest browses an impressive food menu.
5. Guest orders food.
6. Chef sees the order.
7. Chef changes its status.
8. Chef records ingredients consumed.
9. Inventory decreases and a transaction is recorded.
10. Guest sees the updated order status.
11. Food charge appears on the guest bill.
12. Guest completes Razorpay test checkout.
13. Admin inspects booking, order, payment and inventory activity.

That sequence demonstrates the actual product idea.

---

# 31. Quality Bar

The public website should feel like a premium digital brand experience.

The guest portal should feel effortless.

The chef portal should feel practical.

The admin portal should feel powerful.

The backend should make the workflows genuinely connected.

The food experience should be visually memorable.

The inventory system should be operationally believable.

The prototype should communicate what a production version of the Amrit Palace platform could become.

---

# 32. Guiding Principle

The product balances:

**DESIRE + UTILITY**

The public website creates desire.

The application creates utility.

The food experience creates appetite.

The chef system creates action.

The inventory system creates operational visibility.

The bill creates financial clarity.

The payment flow completes the guest journey.

The admin portal connects everything.

Together they form one digital ecosystem for:

**AMRIT PALACE**

**A PLACE FOR EVERY OCCASION**
