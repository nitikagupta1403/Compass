# The Compass Pyramid

> *"Every decision in Compass should be traceable to the product vision."*

---

# Purpose

The Compass Pyramid defines the hierarchy of decision making.

Not every decision carries the same weight.

Changing a button color is different from changing the definition of a Clinical Journey.

The Pyramid helps us recognize which decisions are foundational, which are architectural, and which are purely implementation details.

It ensures that Compass evolves deliberately instead of accidentally.

---

# The Pyramid

```
                          WHY
        ─────────────────────────────────

                         Vision

                           │
                           ▼

                      Philosophy

                           │
                           ▼

                  Design Principles

                           │
                           ▼

                     Domain Model

                           │
                           ▼

                     Architecture

                           │
                           ▼

                    User Experience

                           │
                           ▼

                     Implementation

             Components • APIs • Database

                           │
                           ▼

                      Styling & Polish
```

---

# Reading the Pyramid

The higher a decision sits in the Pyramid,

the more carefully it should be made,

and the less frequently it should change.

Every lower layer exists to support the layers above it.

Nothing at the bottom should contradict something at the top.

---

# Layer 1 — Vision

## Question

**Why does Compass exist?**

The Vision defines the destination.

Everything else exists to achieve it.

Examples

- Preserve the patient's clinical journey.
- Improve understanding.
- Support better clinical decisions.

The Vision should almost never change.

---

# Layer 2 — Philosophy

## Question

**How does Compass think?**

The Philosophy defines beliefs.

Examples

- Story Before Storage
- Evidence Before Opinion
- Context Before Data

Technology must adapt to these principles.

These principles should not adapt to technology.

---

# Layer 3 — Design Principles

## Question

**How do we design?**

Examples

- Grandma Test
- Self-descriptive Names
- Clarity Before Complexity
- Design Before Build

Design principles influence every screen and interaction.

---

# Layer 4 — Domain Model

## Question

**What exists in Compass?**

This layer defines the language of the system.

Examples

- Patient
- Clinical Journey
- Clinical Event
- Evidence
- Care Team
- Medication
- Imaging Study
- Laboratory Result

If something is not defined here,

it probably should not appear in the user interface.

---

# Layer 5 — Architecture

## Question

**How is the system organized?**

Examples

- Services
- APIs
- Database
- AI Layer
- Authentication

Architecture exists to support the Domain Model.

It should never redefine it.

---

# Layer 6 — User Experience

## Question

**How do people experience Compass?**

This includes

- Navigation
- Information hierarchy
- Workflows
- Search
- Patient pages

UX translates architecture into human understanding.

---

# Layer 7 — Implementation

## Question

**How do we build it?**

Examples

- React Components
- Next.js
- TypeScript
- API routes
- Database queries

Implementation changes frequently.

The layers above should remain stable.

---

# Layer 8 — Styling

## Question

**How does it look?**

Examples

- Colors
- Typography
- Spacing
- Animations
- Icons

Styling is important,

but it should never drive product decisions.

---

# Stability Principle

The Pyramid is ordered by stability.

```
Most Stable

Vision

↓

Philosophy

↓

Design Principles

↓

Domain Model

↓

Architecture

↓

User Experience

↓

Implementation

↓

Styling

Least Stable
```

The lower a layer sits,

the easier it should be to change.

The higher a layer sits,

the more carefully it should evolve.

---

# Decision Flow

Every significant decision should move downward through the Pyramid.

```
Vision

↓

Does this support our Philosophy?

↓

Does it follow our Design Principles?

↓

Does it belong in the Domain Model?

↓

Does the Architecture support it?

↓

How should users experience it?

↓

How should we implement it?

↓

How should it look?
```

If a decision cannot pass through every layer,

it should be reconsidered.

---

# Practical Examples

## Example 1

"We want to redesign the Patient page."

This is primarily a

✓ User Experience decision.

Not a Domain Model decision.

---

## Example 2

"We should rename Timeline to Clinical Journey."

This affects the

✓ Domain Model

because it changes the language of Compass.

Every layer below should adapt accordingly.

---

## Example 3

"We should migrate from React to another framework."

This is an

✓ Implementation decision.

It should not change the Vision,

the Philosophy,

or the Domain Model.

---

## Example 4

"We want AI to summarize a patient's history."

Begin at the top.

Does it support the Vision?

Does it respect the Philosophy?

Does it strengthen evidence?

Only then should implementation begin.

---

# The Golden Rule

Never solve a philosophical problem with code.

Never solve a domain problem with UI.

Never solve an architectural problem with CSS.

Find the correct layer.

Solve the problem there.

---

# Founder Notes

## Why does this document exist?

To ensure every product and engineering decision follows a consistent reasoning process.

## What future decisions should it guide?

Architecture, product design, naming, implementation, AI, user experience, and long-term evolution.

## What must never change?

Every decision must remain aligned with the Vision of Compass.

The Pyramid exists to protect that alignment.
