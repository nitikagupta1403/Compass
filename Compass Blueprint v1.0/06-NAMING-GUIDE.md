# Naming Guide

> *"Good names reduce documentation. Great names reduce misunderstanding."*

---

# Purpose

Names shape how people think.

In Compass, naming is not a cosmetic decision—it is a design decision.

The words we choose become the vocabulary of clinicians, caregivers, designers, engineers, and AI systems.

A clear name improves communication.

An ambiguous name creates confusion.

This guide establishes the principles for naming everything in Compass.

---

# Why Naming Matters

Every name should answer one question:

> **"What is this?"**

without requiring additional explanation.

If a name needs comments to be understood, it is probably the wrong name.

---

# Principle 1 — Prefer Domain Language

Compass should speak the language of medicine.

Prefer:

✓ Clinical Journey

✓ Clinical Event

✓ Evidence

✓ Care Team

✓ Imaging Study

✓ Laboratory Result

Avoid:

✗ Timeline

✗ Attachment

✗ Record

✗ User

✗ Data

The software should reflect how clinicians think.

---

# Principle 2 — Be Self-Descriptive

A name should explain itself.

Good

Clinical Journey

Medication History

Laboratory Result

Poor

Journey

History

Results

Info

Data

Short names are not always better.

Clear names are.

---

# Principle 3 — One Concept, One Name

Every concept should have one official name.

Never use multiple words for the same thing.

Bad

Timeline

Journey

History

Events

Good

Clinical Journey

Consistency improves understanding.

---

# Principle 4 — Nouns Represent Things

Entities should be nouns.

Examples

Patient

Diagnosis

Medication

Evidence

Clinical Event

Care Team

Avoid naming entities with verbs.

---

# Principle 5 — Verbs Represent Actions

Actions should use verbs.

Examples

Create Patient

Add Evidence

Update Diagnosis

Generate Summary

Review Report

The difference between nouns and verbs should always be clear.

---

# Principle 6 — Avoid Technical Vocabulary

Users should not see engineering terminology.

Avoid

Resource

Payload

Object

DTO

Schema

Entity

Model

Expose the language of medicine instead.

---

# Principle 7 — Prefer Specific Over Generic

Good

Medication History

Imaging Study

Laboratory Result

Poor

Information

Documents

Files

Data

Specific names communicate intent.

---

# Principle 8 — Think Long-Term

Choose names that will still make sense years from now.

Avoid names tied to implementation.

Bad

PDF Viewer

React Component

API Response

Good

Evidence

Clinical Note

Diagnostic Report

Implementation changes.

Names should endure.

---

# Principle 9 — AI Should Understand the Vocabulary

Compass uses the same language for:

• Users

• Designers

• Engineers

• AI systems

A single vocabulary improves consistency across the entire platform.

---

# The Grandma Test

If a non-technical person reads a screen,

they should understand the meaning of every important term.

If they ask,

> "What does that mean?"

the name should probably be reconsidered.

---

# Naming Checklist

Before introducing a new name, ask:

□ Does it use clinical language?

□ Is it self-descriptive?

□ Is it specific?

□ Could two people interpret it differently?

□ Will it still make sense in five years?

□ Does it match existing terminology?

If any answer is "No", choose a better name.

---

# Examples

| Instead of | Prefer |
|------------|---------|
| Timeline | Clinical Journey |
| Attachment | Evidence |
| User | Care Team Member |
| Report Viewer | Diagnostic Report |
| History | Medication History |
| Event Log | Clinical Journey |

---

# Founder Notes

## Why does this document exist?

To establish a shared vocabulary that improves communication, reduces ambiguity, and keeps Compass consistent as it grows.

## What future decisions should it guide?

Naming of domain entities, APIs, components, documentation, AI prompts, and user interfaces.

## What must never change?

Compass should always speak the language of the people it serves—not the language of its implementation.
