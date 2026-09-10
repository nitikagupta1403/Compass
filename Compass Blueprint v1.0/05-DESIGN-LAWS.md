# Design Laws

> *"Design Laws are the non-negotiable constraints that protect the integrity of Compass."*

---

# Purpose

Design Laws define the boundaries within which Compass is designed and built.

They are intentionally few, stable, and difficult to change.

Every feature, interface, data model, workflow, and engineering decision must respect these laws.

Whenever there is uncertainty, the Design Laws take precedence over convenience.

---

# Law 1 — Every Screen Answers One Clinical Question

Every screen in Compass must have a single primary purpose.

Users should immediately understand why the screen exists.

Examples:

• What happened?
• What medications is the patient currently taking?
• What evidence supports this diagnosis?
• Who participated in the patient's care?

If a screen attempts to answer too many questions, it should be redesigned.

---

# Law 2 — Every Important Statement Must Be Traceable

Clinical information must be supported by evidence.

Users should always be able to discover:

• where the information came from
• when it was recorded
• who recorded it
• what evidence supports it

Trust begins with traceability.

---

# Law 3 — Preserve the Clinical Journey

The patient's journey is the primary organizing structure of Compass.

Reports, laboratory results, imaging studies, medications, and consultations should contribute to that journey—not replace it.

The journey comes first.

---

# Law 4 — Use the Language of Medicine

Compass speaks the language of clinicians and caregivers.

Prefer domain terms over technical terms.

Examples:

✓ Clinical Journey

✓ Imaging Study

✓ Laboratory Result

✓ Care Team

Avoid internal engineering terminology in user-facing experiences.

---

# Law 5 — One Concept, One Home

Every concept should have one authoritative place.

A Clinical Event should not exist in multiple competing forms.

A Medication should have one definition.

A Diagnosis should have one definition.

Avoid duplication.

Avoid ambiguity.

---

# Law 6 — Clarity Over Cleverness

Simple designs are preferred.

Fancy interactions, animations, and abstractions should never reduce understanding.

Users should think about the patient—not the interface.

---

# Law 7 — Relationships Are First-Class

Medicine is relational.

Compass should preserve relationships between:

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

Disconnected information reduces understanding.

---

# Law 8 — Design Before Implementation

Major decisions belong in the Blueprint before they belong in the codebase.

Implementation should express a decision.

Implementation should not discover one.

---

# Law 9 — AI Must Strengthen Trust

Artificial Intelligence should organize, summarize, and assist.

AI should never fabricate evidence.

AI should always make its reasoning understandable.

Evidence always takes precedence over generated content.

---

# Law 10 — The Blueprint Is the Source of Truth

When implementation and the Blueprint disagree,

the Blueprint should be reviewed first.

If the Blueprint is correct,

the implementation should change.

If the implementation reveals a better idea,

the Blueprint should evolve before the code.

The Blueprint and the product should evolve together.

---

# Decision Checklist

Before merging a significant feature, ask:

□ Does it answer one clear clinical question?

□ Is every important statement traceable?

□ Does it strengthen the Clinical Journey?

□ Does it use the language of medicine?

□ Does it reduce cognitive effort?

□ Does it preserve relationships?

□ Is the design documented in the Blueprint?

If any answer is "No", reconsider the design.

---

# Founder Notes

## Why does this document exist?

To define the non-negotiable rules that protect the integrity, consistency, and trustworthiness of Compass.

## What future decisions should it guide?

Every design, engineering, architecture, AI, documentation, and product decision.

## What must never change?

Compass should always prioritize clarity, evidence, traceability, context, and the patient's journey over technical convenience.
