# Domain Model

> *"The Domain Model defines the fundamental concepts of Compass and the relationships between them."*

---

# Purpose

The Domain Model establishes the shared language of Compass.

It describes the core concepts of the clinical domain without reference to implementation, databases, APIs, or user interfaces.

Every feature, workflow, and technical implementation should be expressible using the concepts defined here.

The Domain Model represents **what exists**, not **how it is built**.

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

Domain Invariants

↓

**Domain Model**

↓

Architecture

↓

Implementation

---

# What is a Domain Model?

A Domain Model is a representation of reality.

It identifies:

- The important concepts.
- Their responsibilities.
- Their relationships.
- Their boundaries.

It deliberately ignores implementation details.

---

# Core Domain

```
Patient
    │
    ▼
Clinical Journey
    │
    ▼
Clinical Event
    │
    ├──────────────┐
    ▼              ▼
Evidence       Care Team
    │              │
    ▼              ▼
Diagnosis     Medication
    │              │
    └──────┬───────┘
           ▼
        Outcome
```

Every concept exists to help describe the patient's clinical journey.

---

# Core Entities

## Patient

Represents the individual receiving care.

Responsibilities

- Identity
- Demographics
- Clinical ownership

A Patient is the root of the domain.

---

## Clinical Journey

Represents the complete medical story of a patient.

Responsibilities

- Organize the patient's history
- Preserve chronology
- Connect clinical events

Everything that happens to a patient becomes part of the Clinical Journey.

---

## Clinical Event

Represents something that happened during the patient's care.

Examples

- Consultation
- Diagnosis
- Medication Change
- Laboratory Test
- Imaging Study
- Procedure
- Hospitalization
- Seizure Episode

Clinical Events are the building blocks of the Clinical Journey.

---

## Evidence

Represents the information supporting clinical understanding.

Examples

- Clinical Notes
- Laboratory Results
- Imaging Studies
- Prescriptions
- Reports
- Photographs
- Videos
- Observations

Evidence explains why a clinical statement exists.

---

## Diagnosis

Represents a clinical assessment.

A diagnosis has a lifecycle.

Examples

- Suspected
- Confirmed
- Resolved
- Ruled Out

A diagnosis evolves through evidence.

---

## Medication

Represents therapeutic treatment.

Medication includes:

- Drug
- Dose
- Route
- Frequency
- Duration

Medication changes are represented as Clinical Events.

---

## Care Team

Represents the people involved in care.

Examples

- Caregiver
- Primary Clinician
- Specialist
- Emergency Clinician
- Laboratory
- Imaging Center

Care Team members participate in Clinical Events.

---

## Outcome

Represents the result of a clinical decision or event.

Examples

- Improved
- Stable
- Worsened
- Resolved
- Ongoing

Outcomes help describe how the patient's condition changes over time.

---

# Relationships

The Domain Model emphasizes relationships over isolated data.

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

Medication

↓

Outcome

Each relationship adds meaning.

Removing relationships reduces understanding.

---

# Boundaries

The Domain Model intentionally excludes:

- Database tables
- APIs
- React components
- Services
- Authentication
- Storage technologies
- Programming languages

Those belong to Architecture and Implementation.

---

# Evolution

The Domain Model may grow as medicine evolves.

New entities may be introduced.

Existing entities may become more expressive.

However, every change must remain consistent with:

- Philosophy
- Principles
- Design Laws
- Domain Invariants

The Domain Model evolves within those constraints.

---

# Decision Checklist

Before introducing a new entity, ask:

□ Does this represent a real clinical concept?

□ Is it independent of implementation?

□ Does it have one clear responsibility?

□ Does it belong naturally within the Clinical Journey?

□ Does it strengthen understanding?

If the answer is "No", reconsider the model.

---

# Founder Notes

## Why does this document exist?

To define the shared language of Compass and establish the concepts that describe the clinical domain.

## What future decisions should it guide?

Entity design, architecture, APIs, databases, AI reasoning, workflows, and user interfaces.

## What must never change?

The Domain Model should always represent clinical reality rather than technical convenience.
