# Amrit Palace — Design Direction

## 1. Purpose

This document translates the product vision into a visual and experiential direction for the Amrit Palace digital experience.

It defines the feeling, visual language, interaction philosophy, motion direction and product personality that should guide implementation.

It is a creative and technical direction rather than a rigid implementation specification. Use professional design and engineering judgment to achieve the intended experience.

---

# 2. Core Design Idea

The Amrit Palace website should feel like entering a place rather than opening a website.

The visual experience should create curiosity first, communicate the character of the property second, and make actions feel natural once the visitor understands the place.

The central idea is:

> **A Place for Every Occasion.**

The website should visually demonstrate that idea rather than repeatedly explaining it.

A visitor should be able to feel the difference between arriving at the property, staying there, dining there, celebrating there and meeting there while still experiencing one coherent brand.

---

# 3. Cinematic-First Experience

The public website should be built around visual storytelling.

Photography, video, typography, spatial composition and motion should carry much of the communication.

Large visual moments should have room to breathe.

Sections should feel intentionally composed rather than assembled from conventional cards and text blocks.

The experience should have a sense of progression:

**Arrival → Discovery → Stay → Dine → Celebrate → Meet → Brand**

The exact section order and choreography can evolve during implementation when a stronger experience is discovered.

---

# 4. The Landing Film

The current cinematic film is approximately 33 seconds long and is intended to become one of the defining visual elements of the landing page.

The film contains a visual journey through Amrit Palace, including:

- aerial arrival
- approach toward the property
- entering the hotel
- interior discovery
- banquet/event spaces
- Indian wedding celebrations
- family celebrations
- children's birthday celebrations
- professional meetings
- Amrit Palace branding

The film resolves into the brand message:

> **AMRIT PALACE**
>
> **A PLACE FOR EVERY OCCASION**

The film should be treated as a cinematic asset with narrative importance.

It can function as a hero experience, a scroll-linked visual journey, or another presentation that produces the strongest result.

Study the actual footage and frame archive before deciding how best to present it.

---

# 5. Cinematic Frame Archive

The project contains a frame archive in:

`docs/amrit_palace_frames_30fps.zip`

The archive contains the extracted cinematic frames from the assembled film.

These frames can be used for advanced visual treatments such as:

- image-sequence playback
- scroll-controlled cinematic progression
- frame-based transitions
- visual scrubbing
- layered image reveals
- responsive cinematic storytelling

The archive should be treated as a visual reference and available production asset.

When implementing a frame-based experience, consider performance, loading strategy, responsive behavior and perceived smoothness.

The objective is to make the cinematic experience feel fluid rather than technically impressive for its own sake.

---

# 6. Motion Philosophy

Motion is a fundamental part of the public experience.

The website should feel smooth, fluid and deliberate.

Modern motion technologies should be considered where they meaningfully improve the experience, including:

- GSAP
- GSAP ScrollTrigger
- smooth scrolling systems
- Lenis, Locomotive Scroll or an equivalent approach where appropriate
- Three.js
- WebGL
- shaders
- image-sequence animation
- masking
- parallax
- depth effects
- page transitions
- carefully designed micro-interactions

These technologies are tools, not goals.

Use them when they create better storytelling, spatial continuity, responsiveness or visual depth.

The desired result is:

> **Buttery movement with purpose.**

Scroll should feel connected to the visual experience.

---

# 7. Scroll Experience

Scrolling should feel like moving through the property.

A section can reveal itself through:

- gradual image movement
- scale changes
- masked transitions
- typography choreography
- layered depth
- pinned cinematic sequences
- horizontal movement
- image sequencing
- environmental transitions

The page should be capable of creating moments where the visitor feels that content is unfolding rather than simply appearing.

The exact choreography should be determined through implementation and iteration.

---

# 8. Three.js and WebGL

Three.js/WebGL can create memorable visual moments when appropriate.

Potential applications include:

- subtle 3D environments
- atmospheric effects
- interactive image surfaces
- shader transitions
- depth-based imagery
- cinematic visual transformations
- interactive architectural moments

A WebGL element should feel like part of the visual world of Amrit Palace.

It should support the story and remain responsive to the visitor's interaction.

Choose the simplest technically sound solution that produces the desired visual result.

---

# 9. Glassmorphism Direction

Glass is a major interface language for the public website.

The visual language should be closer to refined architectural glass than generic frosted UI cards.

Glass surfaces can use:

- translucency
- backdrop blur
- subtle borders
- controlled highlights
- soft shadows
- restrained tinting
- depth
- layering

The cinematic footage may contain many colors and changing lighting conditions.

The interface should provide a calm visual layer above that environment.

The UI does not need to match every color appearing in the film.

Instead, the interface should maintain a stable visual identity while allowing the film to provide changing color and atmosphere.

The result should feel like:

> **The video is the environment. The interface is the architecture.**

---

# 10. Color Direction

The permanent interface palette should remain restrained so the cinematic material can provide visual richness.

A foundation of:

- warm ivory
- cream
- charcoal
- deep neutral tones
- subtle champagne/golden accents
- translucent neutral glass

can establish the visual system.

Refine the exact palette through the actual Amrit Palace assets.

Allow warm golden tones, sunset blues, floral colors, wedding colors and celebration colors to remain visible without forcing the entire interface to change with them.

---

# 11. Typography

Typography should provide a strong editorial character.

The system can combine an expressive display typeface with a highly readable supporting typeface.

Large typography can function as part of the visual composition rather than simply acting as headings.

Potential typographic behavior includes:

- oversized headlines
- restrained supporting text
- animated word reveals
- split-line transitions
- editorial alignment
- large numerical or contextual labels
- elegant uppercase microcopy

Typography should remain highly readable and work harmoniously with the glass interface.

---

# 12. Layout Philosophy

The layout should feel spacious and intentional.

Use:

- strong visual hierarchy
- generous negative space
- asymmetric compositions where useful
- layered imagery
- large media
- editorial grids
- carefully positioned floating elements
- visual rhythm between dense and quiet sections

Not every section needs to follow the same grid.

The page should have moments of surprise while maintaining a coherent underlying system.

---

# 13. Navigation

Navigation should remain immediately understandable while becoming part of the visual experience.

The navigation can use a floating glass treatment over cinematic sections.

It should respond naturally to the visitor's scroll position and visual environment.

Possible behavior includes:

- transparent navigation over the hero
- refined glass navigation after scrolling
- contextual state changes
- smooth appearance/disappearance
- elegant mobile navigation
- subtle interaction feedback

The navigation should always make location and available actions clear.

---

# 14. Calls to Action

Calls to action should feel like natural invitations.

Examples include:

- Explore
- Book a Room
- Plan an Event
- View Menu
- Contact Us
- Login

The visual treatment can use glass, solid surfaces, typography or other appropriate treatments depending on the surrounding composition.

The action hierarchy should remain clear.

---

# 15. Public Website Visual Journey

A possible visual structure is:

## Hero / Arrival

The cinematic film introduces the property.

The first interaction should immediately establish:

**Amrit Palace**

and the feeling of:

**A Place for Every Occasion.**

## Introduction

Transition from the cinematic arrival into a concise introduction to the property.

Use typography and imagery to establish the character of the place.

## Stay

Introduce the guest-room experience through strong imagery, spatial composition and concise information.

The room should be represented as an actual comfortable guest room rather than an exaggerated luxury suite.

## Dine

Use food photography, movement and editorial composition to introduce the dining experience.

The menu experience can eventually connect directly to the guest ordering system.

## Celebrate

Create an emotionally rich visual section around:

- weddings
- birthdays
- anniversaries
- ceremonies
- family celebrations
- private events

People should be an important part of the storytelling.

## Meet

Shift the visual atmosphere toward professional gatherings.

Show:

- meetings
- conferences
- business gatherings
- professional collaboration

The transition should demonstrate that Amrit Palace can move naturally between celebration and professional hospitality.

## Brand Film / Brand Moment

The dedicated Amrit Palace brand sequence can provide a strong emotional conclusion.

The visual destination is:

**AMRIT PALACE**

**A PLACE FOR EVERY OCCASION**

This can become a transition into the final information and footer area.

---

# 16. Human Presence

People should be an important storytelling element.

Hospitality is fundamentally about people.

Visuals should capture:

- genuine celebration
- family connection
- wedding emotion
- children's happiness
- guests enjoying food
- professional collaboration
- arrival and departure moments

Human movement should feel natural.

Expressions, gestures and interactions should contribute to the atmosphere rather than appearing staged.

---

# 17. Cultural Visual Language

The visual treatment should feel authentically Indian where the occasion calls for it.

Wedding imagery should naturally include:

- Indian wedding attire
- Indian floral decoration
- family participation
- traditional celebration
- culturally appropriate ceremony environments

Birthday imagery can communicate Indian family celebration and children's joy.

Professional meeting imagery should feel natural to the Indian business environment.

Culture should emerge through the people, environments, décor and moments being shown.

---

# 18. Authentic Property Representation

The design should make Amrit Palace look exceptional through presentation while remaining connected to the real property.

Actual property imagery should be prioritized.

The visual system should work with the real architecture, rooms, event spaces, food and atmosphere.

When generated visual assets are used, they should maintain a believable relationship to the real property and brand.

The goal is an elevated digital representation of Amrit Palace.

---

# 19. Public Product vs Operational Product

The project contains several distinct digital experiences.

They share the same brand system but should have different interaction priorities.

### Public Website

Cinematic, immersive, editorial and emotional.

### Client / Guest Portal

Comfortable, clear, polished and hospitality-focused.

### Chef Portal

Fast, practical, operational and action-oriented.

### Admin Portal

Structured, information-rich, analytical and decision-oriented.

The same typography, surfaces, spacing principles and visual identity can connect these experiences while allowing each one to develop its own appropriate interface personality.

---

# 20. Demo Login Experience

The project is initially a demonstration platform.

The public website should provide a clear path into a login experience for the different platform roles.

The demo login can use:

- mobile number
- password

rather than implementing a real OTP delivery and verification system at this stage.

The purpose is to demonstrate the product experience and role-based flows.

The demo should provide believable seeded accounts for:

- Client
- Chef
- Admin

After login, the experience should take the user to the appropriate dashboard.

The authentication architecture should be designed so it can later evolve into proper authentication and OTP verification when the platform moves toward production.

---

# 21. Client Dashboard Direction

The client dashboard should feel like a continuation of the Amrit Palace hospitality experience.

Useful areas include:

- overview
- current stay
- bookings
- room information
- food menu
- food orders
- order status
- bill
- payments
- profile

The experience should make the guest's information easy to understand.

Important information should be visible quickly without making the interface feel like a generic enterprise dashboard.

---

# 22. Chef Dashboard Direction

The chef experience should prioritize operational clarity.

It should make it immediately clear:

- which orders are new
- which orders are accepted
- what is being prepared
- what is ready
- what has been delivered
- which ingredients are being consumed
- what inventory information matters now

The interface should feel fast and practical while still belonging to the Amrit Palace product.

---

# 23. Admin Dashboard Direction

The admin experience should provide a central operational view of the hotel.

Potential areas include:

- dashboard
- bookings
- guests
- orders
- menu
- rooms
- services
- inventory
- staff
- payments
- reports

The dashboard can use:

- KPI cards
- charts
- tables
- filters
- activity streams
- status indicators
- contextual actions

The visual system should make complex information understandable.

---

# 24. Responsive Design

The experience should be designed intentionally across:

- large desktop displays
- laptops
- tablets
- mobile phones

The cinematic experience should adapt rather than simply shrink.

Determine appropriate behavior for:

- video
- frame sequences
- navigation
- typography
- glass surfaces
- interactive sections
- dashboards
- tables
- charts
- touch interactions

Mobile should remain a first-class experience.

---

# 25. Performance as Part of Design

A visually ambitious website must still feel fast.

Performance should be considered from the beginning.

Relevant strategies may include:

- asset optimization
- lazy loading
- responsive image sizing
- video optimization
- intelligent frame loading
- progressive loading
- code splitting
- GPU-conscious animation
- efficient WebGL usage
- reduced-motion support
- mobile-specific asset strategies

The experience should feel smooth because the implementation is thoughtful.

---

# 26. Interaction Quality

Small details should make the product feel alive.

Examples include:

- refined hover states
- button feedback
- image transitions
- navigation transitions
- loading states
- form feedback
- booking confirmation
- order status transitions
- dashboard updates
- subtle cursor interactions
- contextual animations

Every interaction should reinforce confidence and clarity.

---

# 27. Transitions Between Worlds

One of the strongest opportunities in the project is transitioning between different emotional environments.

Examples:

**Exterior → Interior**

Cool sunset atmosphere gradually becomes warm interior light.

**Hotel → Wedding**

Calm hospitality becomes celebration and movement.

**Wedding → Birthday**

Traditional celebration becomes playful family energy.

**Celebration → Meeting**

Color and energy settle into professional focus.

**Meeting → Brand**

Human activity resolves into the identity of Amrit Palace.

These transitions can become an important signature of the website.

---

# 28. Footer Relationship

The footer should feel like the natural end of the experience rather than a separate block attached to the page.

The dedicated Amrit Palace brand moment should ideally lead into the footer.

The visitor should move from:

**experience → identity → information → connection**

The footer can provide practical navigation, contact information, location, social presence and relevant actions.

---

# 29. Creative Direction for Antigravity

Antigravity should interpret this document as a design brief and use its own design and engineering judgment.

The goal is to discover the strongest implementation of the vision.

When choosing between multiple approaches, consider:

- visual quality
- usability
- performance
- responsiveness
- maintainability
- emotional impact
- authenticity
- technical appropriateness

Explore sophisticated solutions where they improve the experience.

The project should feel like a carefully art-directed digital product rather than a collection of automatically generated sections.

---

# 30. Design North Star

The final experience should make someone feel:

> **“This is a place where things happen.”**

A place to arrive.

A place to stay.

A place to eat.

A place to celebrate.

A place to meet.

A place where different people can gather for completely different reasons.

And ultimately:

> **AMRIT PALACE**
>
> **A PLACE FOR EVERY OCCASION**
