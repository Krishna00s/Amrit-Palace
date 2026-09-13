# Amrit Palace — Experience Map

## 1. Purpose

This document maps how people experience Amrit Palace across the public website and the three core operational portals:

- Visitor / prospective guest
- Client / Guest
- Chef
- Admin

The goal is to connect the cinematic public experience with a believable working hotel system.

The experience should feel like one connected ecosystem rather than a collection of unrelated pages:

**Discover → Plan → Book → Stay → Dine → Celebrate → Order → Prepare → Deliver → Bill → Pay**

Every role experiences the same Amrit Palace, but from a different perspective.

The public website creates desire and trust.

The guest portal makes the stay convenient.

The chef portal turns orders into action.

The admin portal gives the business visibility and control.

---

# 2. Experience Principles

## 2.1 Emotion on the outside, utility on the inside

The public website should be cinematic, editorial and immersive.

The internal portals should be sophisticated, clear and highly usable.

Both should still feel like the same Amrit Palace brand.

---

## 2.2 Visual storytelling comes first

Amrit Palace should be experienced visually before it is explained through large amounts of copy.

Use:

- Cinematic video
- Real property photography
- Food photography
- Event imagery
- Image sequences
- Elegant typography
- Layered compositions
- Scroll-linked storytelling
- Subtle depth and motion
- Refined glass surfaces
- Meaningful micro-interactions

Let the visuals communicate atmosphere, hospitality, celebration and possibility.

---

## 2.3 One place, many occasions

The experience should naturally communicate the four central ideas:

**STAY**  
A comfortable place to rest.

**DINE**  
Food and hospitality that people want to experience.

**CELEBRATE**  
A space for weddings, birthdays, anniversaries, ceremonies and family occasions.

**MEET**  
A place for conferences, meetings, corporate gatherings and other organised events.

The visitor should gradually understand that Amrit Palace is not simply somewhere to sleep. It is a place where people come together.

---

# 3. Public Website Experience

## 3.1 Arrival

The visitor enters through the cinematic landing experience.

The existing approximately 33-second film can establish the visual world of Amrit Palace through:

1. Exterior arrival
2. Movement into the property
3. Interior discovery
4. Celebration and people
5. Different occasions
6. Brand reveal
7. Amrit Palace identity

The interaction should feel like an arrival rather than a conventional hero banner.

The visitor should immediately understand:

**AMRIT PALACE**  
**A PLACE FOR EVERY OCCASION**

---

# 4. Public Discovery Journey

The public journey can flow through:

**Arrival → Discovery → Stay → Dine → Celebrate → Meet → Plan Your Visit**

Each section should have its own visual personality while remaining part of one continuous story.

---

## 4.1 Stay

Introduce the actual accommodation honestly and attractively.

Amrit Palace currently has one room type.

The room experience should communicate the available features such as:

- Air conditioning
- Master bed
- Television where applicable
- Comfortable stay
- Practical hospitality

The design should make the room feel desirable without inventing multiple room categories or luxury features that are not actually offered.

Primary actions:

- View room
- Check availability
- Book / request booking
- Contact Amrit Palace

---

# 5. Dining Experience — Make People Hungry

The food experience is one of the most important parts of the digital product.

It should not feel like a spreadsheet of dishes.

It should feel like a **visual dining experience**.

The objective is simple:

**The guest should want the food before they even place the order.**

## 5.1 Public food discovery

Food should be presented with:

- Large, high-quality photography
- Strong visual hierarchy
- Close-up food imagery
- Editorial composition
- Elegant typography
- Smooth transitions
- Subtle hover and tap interactions
- Category exploration
- Dish details
- Prices
- Availability
- Clear ordering actions

Use the available food imagery as a major visual asset.

When appropriate, the interface can use large dish photography, layered image treatments, horizontal exploration, immersive detail views, or other creative patterns chosen by Antigravity.

The important thing is that the interface makes food feel:

**fresh, desirable, warm, abundant and real.**

---

## 5.2 Food categories

The menu can be organised into intuitive categories based on the actual menu data.

Possible categories include:

- Starters
- Main Course
- Breads
- Rice / Biryani
- Snacks
- Desserts
- Beverages
- Other available categories

The actual categories should come from the menu data rather than being invented unnecessarily.

---

## 5.3 Dish interaction

A guest should be able to:

1. Discover a dish
2. See its image
3. Understand what it is
4. See its price
5. Select quantity
6. Add it to the order
7. Review the order
8. Place the order

The interaction should feel satisfying.

A successful food-ordering moment should feel closer to a premium restaurant experience than a generic e-commerce cart.

---

# 6. Events & Occasions

The public website should visually introduce the kinds of occasions Amrit Palace can host.

Examples:

- Weddings
- Birthdays
- Anniversaries
- Ceremonies
- Conferences
- Corporate meetings
- Family gatherings
- Private events
- Other custom occasions

Each occasion can have a strong visual moment.

For example:

**WEDDINGS**  
A room full of people, celebration and shared moments.

**BIRTHDAYS**  
Family, children, cake and energy.

**MEETINGS**  
A focused professional gathering.

The content should communicate possibility without making the website feel like a catalogue.

---

# 7. Event Enquiry / Booking Journey

For events where final pricing depends on requirements, the visitor should be guided toward an enquiry/request process.

Possible journey:

**Explore Occasion → View Venue → Tell Us About Your Event → Submit Enquiry → Admin Reviews → Follow Up / Confirm**

Useful enquiry information can include:

- Occasion type
- Preferred date
- Approximate guest count
- Contact information
- Requirements
- Additional message

The experience should make submitting an enquiry feel easy and premium.

---

# 8. Visitor → Client / Guest Transition

A visitor who wants to make a booking or use guest services enters the client experience.

For the working demo:

**Phone Number + Password**

is sufficient.

The demo should use seeded accounts so the complete product can be demonstrated without real OTP delivery.

Production can later evolve this into a phone-number + OTP authentication system.

---

# 9. Client / Guest Portal

The guest portal represents the person's personal relationship with Amrit Palace.

The guest should be able to understand their stay and services quickly.

Core areas:

- Dashboard
- My Stay
- My Bookings
- Food / Dining
- My Orders
- My Bill
- Profile

---

# 10. Guest Dashboard

The dashboard should provide an immediate overview.

Possible information:

- Current stay
- Upcoming booking
- Room information
- Recent food order
- Current order status
- Running bill
- Quick access to food
- Quick access to bookings
- Important stay information

The guest should not need to search through the application to understand what is happening.

---

# 11. Room Booking Journey

Core flow:

**Discover Room → Select Date → Check Availability → Enter Guest Details → Confirm Booking → View Booking**

The demo can use simplified availability and booking logic while still behaving like a real workflow.

The booking should become visible inside the guest portal.

Relevant booking states can include:

- Requested
- Confirmed
- Checked In
- Checked Out
- Cancelled

The exact state model can be refined during implementation.

---

# 12. Guest Food Ordering Journey

This is one of the flagship demo workflows.

### Flow

**Guest Dashboard → Food → Explore Menu → Dish Detail → Add to Order → Cart → Place Order → Chef Receives Order**

After placement, the guest should immediately have visibility into the order.

### Order status

The experience should support:

**Placed → Accepted → Preparing → Ready → Delivered**

The guest can return to the order at any point and see its current state.

The UI should make status changes feel alive through subtle transitions and feedback.

---

# 13. Food Charges & Guest Bill

Food orders are connected to the guest's stay.

Instead of treating every food order as an isolated payment:

**Room Charges + Food Charges + Event / Service Charges + Other Charges = Running Guest Bill**

This gives the system a more realistic hotel experience.

The guest should be able to open their bill and understand where the total came from.

For example:

- Room
- Food
- Event / banquet
- Additional services
- Other approved charges
- Total

---

# 14. Food Order Cancellation

The guest can have a defined cancellation window for food orders.

The interface should clearly communicate whether an order is still cancellable.

Example experience:

**Order placed → Cancellation available → Cutoff reached → Order locked**

The backend should ultimately enforce the actual cancellation rule so the interface is not the only protection.

For the demo, the rule can be simplified while preserving the real product concept.

---

# 15. Checkout & Razorpay

Once the guest is ready to settle their bill:

**View Bill → Checkout → Razorpay Test Checkout → Payment Verification → Bill Updated → Confirmation**

The demo should use Razorpay's test/sandbox environment.

The payment architecture should be designed around a backend-created payment order and server-side verification rather than trusting the browser alone.

The guest should receive a clear confirmation after successful payment.

---

# 16. Chef Experience

The chef portal is a working operational tool.

The chef's primary concern is:

**What needs to be prepared, what is available, and what ingredients were consumed?**

Core areas:

- Dashboard
- New Orders
- Kitchen / Active Orders
- Inventory
- Consumption / Stock Usage

---

# 17. Chef Order Workflow

When a guest places a food order:

**Guest Places Order → Chef Receives Order → Chef Accepts → Preparing → Ready → Delivered**

The chef should have a clear queue.

Each order should communicate:

- Order number
- Guest / room context where appropriate
- Items
- Quantities
- Special notes where available
- Time
- Current status

The interface should prioritise speed and clarity because this is a working kitchen workflow.

---

# 18. Chef Inventory Management

Inventory is a core part of the system.

The chef should be able to record ingredients consumed while preparing food.

Example:

**Order #1042**

Items:

- Paneer dish
- Butter naan
- Biryani

Chef records consumption such as:

- Paneer — quantity used
- Flour — quantity used
- Butter — quantity used
- Rice — quantity used
- Other ingredients

The system then updates inventory accordingly.

The experience should make this practical enough for a chef to use without turning the kitchen workflow into unnecessary accounting.

---

# 19. Inventory Lifecycle

The inventory system connects multiple roles.

### Admin adds stock

**Stock Received → Inventory Increased → Stock Entry Recorded**

### Chef consumes stock

**Food Preparation → Ingredient Consumption Recorded → Inventory Decreased → Consumption Transaction Recorded**

### Admin audits inventory

**Current Stock → Stock In → Consumption → Transaction History → 45-Day View**

This creates a complete operational chain.

---

# 20. Inventory Transaction History

Every meaningful inventory movement should create a transaction record.

A transaction can capture:

- Date
- Time
- Ingredient / item
- Quantity
- Action
- Reason / reference
- User responsible

Examples of actions:

- Stock In
- Consumption
- Adjustment
- Correction

Admin should be able to inspect the **last 45 days of inventory history**.

The history should be presented as a useful operational ledger rather than a decorative table.

---

# 21. Admin Experience

The admin portal is the business command centre.

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

The admin should be able to understand the state of the business quickly.

---

# 22. Admin Dashboard

Useful dashboard information can include:

- Current occupancy
- Upcoming room bookings
- Upcoming events
- Food orders
- Revenue
- Pending actions
- Low-stock items
- Recent payments
- Inventory activity
- Upcoming occasions

The dashboard should prioritise information that helps someone operate Amrit Palace.

---

# 23. Admin Booking Management

Admin can review:

- Room bookings
- Event enquiries
- Event bookings
- Guest information
- Booking status
- Dates
- Requirements
- Charges

The interface should make it easy to move from a booking to the associated guest and financial information.

---

# 24. Admin Food Management

Admin should be able to manage the food catalogue.

Possible actions:

- Add dish
- Edit dish
- Set price
- Add image
- Assign category
- Set availability
- Update description
- Disable unavailable dishes

The public and guest-facing menu should ultimately consume this same menu data.

That creates a direct relationship between:

**Admin Menu → Guest Menu → Food Order → Chef Kitchen → Guest Bill**

---

# 25. Admin Inventory Management

Admin has broader inventory visibility than the chef.

Admin should be able to:

- View current stock
- Add stock
- Review stock movement
- Identify low-stock ingredients
- Inspect chef consumption
- Review adjustments
- Review 45-day history
- Understand inventory trends

The system should make it easy to answer:

**What came in?**

**What was consumed?**

**What is left?**

**Who recorded it?**

**When did it happen?**

---

# 26. Cross-System Relationships

The strongest part of the demo is that actions in one role affect another role.

### Food

**Guest**
→ places food order

**Chef**
→ receives order

**Chef**
→ prepares order

**Chef**
→ records ingredient consumption

**Inventory**
→ decreases

**Guest**
→ sees order delivered

**Guest Bill**
→ receives food charge

**Admin**
→ can inspect order, payment and inventory activity

This is the core connected workflow.

---

# 27. Booking + Stay Relationship

A room booking should connect to the guest.

That guest can then:

- View their stay
- Order food
- Accumulate charges
- View their bill
- Pay through Razorpay test checkout

The system should therefore behave like a simplified hotel management ecosystem rather than separate demos.

---

# 28. Event Relationship

An event enquiry can move through:

**Visitor → Enquiry → Admin Review → Guest / Client Relationship → Event Booking → Charges → Bill**

For the prototype, some steps can be simplified or manually controlled by admin.

The underlying experience should still communicate the intended production workflow.

---

# 29. Role-Based Experience

The application should recognise the user's role and take them to the appropriate experience.

### Client / Guest

Sees:

- Their stay
- Their bookings
- Food
- Orders
- Bill
- Profile

### Chef

Sees:

- Orders
- Kitchen workflow
- Inventory
- Consumption

### Admin

Sees:

- Business operations
- Bookings
- Guests
- Menu
- Orders
- Inventory
- Staff
- Payments
- Reports

The interface should feel purpose-built for each role.

---

# 30. Demo Authentication

The prototype should provide seeded demonstration accounts.

Suggested roles:

- Client
- Chef
- Admin

Login:

**Phone Number + Password**

The demo should make it easy to switch between roles and demonstrate the connected system.

This is a prototype convenience. Production authentication can later use phone OTP, stronger session management, permissions and other security controls.

---

# 31. Important Experience States

The product should feel alive because users can understand what is happening.

Useful states include:

- Loading
- Empty
- Available
- Unavailable
- Pending
- Confirmed
- Preparing
- Ready
- Delivered
- Cancelled
- Payment successful
- Payment failed
- Low stock
- Booking submitted
- Enquiry submitted

Each state should have appropriate visual feedback and clear next actions.

---

# 32. Mobile Experience

A large portion of guests will interact with the product from phones.

The mobile experience should therefore be designed intentionally rather than treated as a compressed desktop layout.

Priorities:

- Easy food browsing
- Comfortable food ordering
- Simple booking
- Clear order status
- Fast bill access
- Easy navigation
- Touch-friendly controls

The chef workflow should also remain practical on a tablet or phone.

Admin can be more information-dense on larger screens while remaining responsive.

---

# 33. Public Website vs Operational Portals

The two sides of the product have different jobs.

### Public

**Emotion**

The visitor should think:

> “This looks like a place I want to experience.”

### Guest

**Convenience**

The guest should think:

> “Everything about my stay is easy to manage.”

### Chef

**Action**

The chef should think:

> “I know exactly what needs to happen next.”

### Admin

**Control**

The admin should think:

> “I can see and manage what is happening.”

This distinction should guide the design decisions throughout implementation.

---

# 34. Prototype Scope

The first build is a strong working prototype.

The prototype should demonstrate the most important connected experiences:

### Workflow 1 — Booking

**Visitor → Room → Booking → Client Account → Guest Dashboard**

### Workflow 2 — Food

**Guest → Menu → Order → Chef → Status → Guest**

### Workflow 3 — Billing

**Room + Food + Event / Service Charges → Bill → Razorpay Test Checkout**

### Workflow 4 — Inventory

**Admin Stock In → Chef Consumption → Inventory Update → Transaction History → Admin 45-Day View**

These workflows should feel real enough to demonstrate the product concept to the hotel.

More advanced production capabilities can be expanded after client approval.

---

# 35. Demo vs Production

The prototype is intentionally focused.

### Demonstrate now

- Real navigation
- Real role separation
- Working authentication flow
- Database-backed core data
- Room booking workflow
- Food ordering
- Chef order management
- Inventory consumption
- Admin stock management
- Bill calculation
- Razorpay test checkout
- Connected state changes

### Expand later for production

- Real phone OTP
- Production payment configuration
- Hardened RBAC
- Advanced availability rules
- Notifications
- SMS / WhatsApp integrations
- Advanced reporting
- Audit/security controls
- More detailed hotel operations
- Production deployment and monitoring

The prototype should establish the architecture and experience direction without pretending that every hotel-management feature needs to be solved immediately.

---

# 36. Signature Moments

The product should have several moments that people remember.

## Public

**The cinematic arrival**

The visitor feels like they are entering Amrit Palace.

## Dining

**The food reveal**

The visitor sees a dish and immediately wants to explore it.

## Guest

**The order moment**

A guest orders food and can see the kitchen workflow progressing.

## Chef

**The kitchen queue**

The chef immediately understands what needs attention.

## Inventory

**The consumption update**

Ingredients used for an order become part of the operational record.

## Admin

**The command centre**

The admin can see bookings, orders, money and inventory from one place.

## Brand

**The final Amrit Palace reveal**

The brand film transitions into:

**AMRIT PALACE**

**A PLACE FOR EVERY OCCASION**

and naturally leads into the footer.

---

# 37. The Connected Story

The entire digital product should ultimately communicate one simple idea:

Someone discovers Amrit Palace.

They become interested.

They book a stay or enquire about an occasion.

They arrive.

They eat.

They order again.

The chef prepares the food.

Ingredients are consumed.

The inventory reflects reality.

The charges accumulate.

The guest sees their bill.

The guest pays.

The admin sees the business activity.

Everything is connected.

That is what turns the website into a **hotel experience platform** rather than simply a marketing website.

---

# 38. Design Freedom for Antigravity

This document defines the experience and relationships, not every pixel.

Antigravity should use its design and engineering judgement to determine the strongest implementation.

The experience can use:

- Cinematic transitions
- Scroll choreography
- Interactive food galleries
- Editorial menu layouts
- Layered glass surfaces
- Image sequences
- Micro-interactions
- Depth
- Motion
- Responsive compositions
- WebGL / 3D where it genuinely elevates the experience

The implementation should continuously ask:

**What would make this feel like an exceptional digital experience for Amrit Palace?**

rather than simply:

**What is the quickest way to put this information on a page?**

---

# 39. Handoff to Requirements

The next document should translate this experience map into a structured product requirements document.

That document should define:

- Functional requirements
- User stories
- Core entities
- Workflow states
- Demo data
- Business rules
- Booking requirements
- Food requirements
- Inventory requirements
- Billing requirements
- Payment requirements
- Role permissions
- Prototype boundaries

The experience map defines **how the system should feel and flow**.

The requirements document will define **what the system needs to do**.
