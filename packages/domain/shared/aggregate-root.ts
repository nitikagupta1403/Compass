/**
 * ============================================================================
 * AggregateRoot
 * ============================================================================
 *
 * Purpose
 * -------
 * Base class for Aggregate Roots.
 *
 * An Aggregate Root is the entry point to a consistency boundary.
 * All modifications to objects within an aggregate must occur through
 * the Aggregate Root to preserve domain invariants.
 *
 * Examples
 * --------
 * - Patient
 * - Clinical Journey
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - Domain Invariants
 * - DL-002 : Preserve the Clinical Journey
 * ============================================================================
 */

import { Entity } from "./entity";
import { Identifier } from "./identifier";

export abstract class AggregateRoot extends Entity {
  protected constructor(id: Identifier) {
    super(id);
  }
}