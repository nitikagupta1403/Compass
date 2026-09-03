# Compass — NEXT

## Locked Design Direction

This file freezes the current visual-computational direction for **Hope Story / Hope Depth Journey** so future work continues from here without losing the idea.

### Core principle

Compass should not reduce clinical data to only ordinary graph nodes and edges.

The visual system should combine graph structure for relationships, semantic zoom for narrative depth, multivariate visual encoding for meaning, clustering for story regions, and source traceability for every clinical claim.

The target is an explainable computational visual language, not decorative visualization.

## Treatment Paw Constellation

Treatment history should not render as a long vertical list. At the far view, treatment records appear as **Hope paw landmarks**.

- Hope/treatment accent: orange
- Compass structural/evidence accent: deep teal/slate
- Pink paw cursor remains the user's navigation signature

Clicking a paw opens the underlying documented treatment record.

### Primary encoding

For medication/treatment i:

R_i = number of documented instances of treatment i

The first locked mapping is:

paw size_i = f(R_i)

Meaning: **Size = documented recurrence.**

A single documented instance is small; repeated instances become progressively larger.

Do not interpret paw size as clinical importance, severity, or efficacy.

## Multivariate Visual Encoding

Different visual channels should encode different variables rather than mixing all meaning into node size.

Locked direction:

- size = recurrence
- color = family/category
- opacity/glow = recency
- ring/style = role

Possible role categories include maintenance, SOS, emergency, and supportive.

These are visual roles, not independent clinical judgments. The underlying source-derived treatment wording must remain unchanged.

## Salience Model

Keep the explainable salience equation as a future computational layer:

S_i = α R̂_i + β Ĉ_i + γ Ŵ_i

Where:
- R̂_i = normalized recurrence
- Ĉ_i = normalized recency
- Ŵ_i = normalized role weight
- α, β, γ are explicit tunable weights

Important: recurrence should remain independently visible through node/paw size even if a salience score is later introduced.

The score can be used for secondary visual attention, ranking, layout, zoom transitions, or label prominence.

No hidden AI weighting.

## Graph Structure

Compass still uses a graph:

G = (V, E)

V may contain treatment records, medications, clinical events, diary entries, lab records, videos, evidence records, and questions/unresolved items.

E represents documented relationships such as prescribed at, follows, linked to, supports, monitored by, source for, and associated with.

Graph topology answers: **What is connected to what?**

Visual salience answers: **What should attract attention at this zoom level?**

Use both.

## Graph Clustering

After recurrence-based paw sizing, add clustering.

Represent clusters as meaningful clinical/story regions rather than arbitrary visual groups.

Initial high-level Hope Story clusters:
1. First Event
2. Patterns
3. Treatment
4. Evidence
5. Questions / unresolved items, if clinically useful

Within Treatment, later subclusters can include daily/maintenance, SOS, emergency, supportive care, and medication families.

Within Evidence: laboratory, drug monitoring, videos, diary, prescriptions/records.

Clustering can be rule-based first. Do not add ML solely for novelty.

## Semantic Zoom

Compass should behave like a map.

Far away: only a few major story regions/clusters.

Zoom closer: families and major concepts appear.

Closer: individual medications/events appear.

Closer still: individual dated records and evidence links appear.

Example:

Treatment cluster → medication family → drug → dated instance → source evidence

Zoom should not merely enlarge graphics.

Eventually, the representation itself may change with depth:

S_i^(z) = α_z R_i + β_z C_i + γ_z W_i + δ_z E_i

where z is semantic zoom level and E_i may represent evidence-related information.

Any depth-dependent weighting must remain explainable.

## Mathematical Representation

A node can carry a feature vector such as:

x_i = [R_i, C_i, W_i, family_i, status_i, ...]

Compass then performs an explainable mapping:

(V, E, x_i) → (position, size, color, opacity, ring, detail)

This is the central design direction.

## AI Principle

AI may later assist with clustering, layout optimization, identifying repeated patterns, suggesting useful semantic groupings, and learning or proposing salience weights.

But the clinical representation must remain deterministic where possible, inspectable, source-traceable, clinically neutral, and explainable.

AI should improve representation, not invent clinical meaning.

## Clinical Safety Locks

Never encode unsupported interpretation.

- treatment is documented, not advised
- no dosing recommendations
- medication size must not imply importance or efficacy
- phenobarbital interpretation stays source-reported
- no unit inference where source says NIL/unit absent
- logged diary entries are not automatically confirmed seizures
- use “multi-event days,” not formal cluster terminology unless supported
- rescue/emergency wording remains source-faithful
- preserve discrepancies instead of silently reconciling them
- evidence traceability remains Claim → Evidence → Source

## Immediate Next Implementation

Current treatment-history UI already has clickable paw landmarks and medication-family colors.

Next coding step:
1. Group treatment records by medication identity/family carefully.
2. Compute documented recurrence count.
3. Map recurrence to a bounded paw-size scale.
4. Keep each dated treatment instance underneath the aggregate paw.
5. After recurrence sizing is visually approved, introduce graph clustering.
6. Do not commit until the resulting screen is visually and clinically reviewed.

First implementation rule:

size = f(recurrence)

Do not introduce α, β, γ into production until the recurrence-only representation is tested and understood.

## Locked sentence

> **Graph = structure. Salience = attention. Clustering = story regions. Semantic zoom = depth. Evidence = truth anchor.**

This is the frozen Compass direction to continue from.
