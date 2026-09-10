# Domain Invariants

> *"Domain Invariants are truths that must always hold within Compass, regardless of technology or implementation."*

---

# Purpose

Domain Invariants define the fundamental truths of the Compass domain.

Unlike implementation details, they are independent of programming languages, databases, APIs, or user interfaces.

Every architectural decision, data model, AI capability, and workflow must respect these invariants.

If an implementation violates an invariant, the implementation is incorrect—not the invariant.

---

# What is an Invariant?

An invariant is a statement that is always true.

It is not a preference.

It is not a guideline.

It is not an implementation detail.

It is a property of the domain itself.

---

# Invariant 1 — Every Patient Has One Canonical Identity

Every patient represented in Compass has exactly one canonical identity.

Names may change.

Identifiers may change.

Medical records may grow.

The patient remains the same.

---

# Invariant 2 — Every Clinical Journey Belongs to One Patient

A Clinical Journey always belongs to exactly one Patient.

A journey cannot exist without a patient.

---

# Invariant 3 — Every Clinical Event Belongs to One Clinical Journey

Every Clinical Event exists within exactly one Clinical Journey.

An event cannot exist independently.

---

# Invariant 4 — Every Clinical Event Has a Time

Every Clinical Event records when it occurred.

If the exact time is unknown, the uncertainty should be represented explicitly.

Events never exist without temporal context.

---

# Invariant 5 — Every Important Clinical Statement Is Supported by Evidence

Clinical conclusions should be traceable.

Evidence may include:

- Clinical notes
- Laboratory results
- Imaging studies
- Prescriptions
- Observations
- Reports

Evidence is the foundation of trust.

---

# Invariant 6 — Evidence Is Immutable

Evidence represents historical fact.

It is never overwritten.

If corrections are necessary, new versions or annotations should be created while preserving history.

---

# Invariant 7 — Clinical History Is Append-Only

The patient's history represents a chronological record.

Past events should never disappear.

Corrections add information.

They do not erase history.

---

# Invariant 8 — Relationships Carry Meaning

Relationships between entities are first-class knowledge.

For example:

Patient

↓

Clinical Journey

↓

Clinical Event

↓

Evidence

↓

Diagnosis

↓

Treatment

↓

Outcome

Removing relationships reduces clinical understanding.

---

# Invariant 9 — AI Cannot Become the Source of Truth

Artificial Intelligence may:

- summarize
- organize
- explain
- discover patterns

Artificial Intelligence must not replace evidence.

Evidence always remains authoritative.

---

# Invariant 10 — Every AI Statement Is Traceable

Whenever AI generates a summary, recommendation, or explanation, users should be able to identify the supporting evidence.

Generated knowledge without traceability should never become part of the patient's record.

---

# Invariant 11 — Domain Concepts Are Independent of Technology

Patients, Clinical Journeys, Evidence, and Diagnoses exist independently of implementation.

Technology expresses the domain.

It does not define it.

---

# Invariant 12 — One Concept Has One Meaning

Every domain concept has one clear definition.

Examples:

Patient

Clinical Journey

Clinical Event

Evidence

Diagnosis

Medication

Care Team

The same concept should never have multiple meanings.

---

# Invariant 13 — Every Clinical Decision Exists Within Context

A diagnosis, treatment, or recommendation is never interpreted in isolation.

Each decision belongs within the patient's clinical journey and should preserve its surrounding context.

Removing context reduces clinical understanding.

---

# Invariant 14 — The Domain Evolves, Truth Does Not

The domain model may evolve.

The architecture may evolve.

The technology may evolve.

The implementation may evolve.

The invariants define the stable foundation upon which those changes occur.

---

# Relationship to the Blueprint

Compass Blueprint

↓

Founder

↓

Philosophy

↓

Compass Pyramid

↓

Principles

↓

Design Laws

↓

**Domain Invariants**

↓

Domain Model

↓

Architecture

↓

Implementation

---

# Founder Notes

## Why does this document exist?

To define the enduring truths of Compass that remain valid regardless of implementation or technology.

## What future decisions should it guide?

Domain modeling, architecture, APIs, databases, AI systems, validation rules, and future product evolution.

## What must never change?

Every implementation of Compass must preserve these invariants.
