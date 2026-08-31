/**
 * ============================================================================
 * Patient
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the canonical identity of an individual receiving care.
 *
 * The Patient is the Aggregate Root of the patient domain.
 * All clinical information ultimately belongs to a Patient through
 * one or more Clinical Journeys.
 *
 * Blueprint References
 * --------------------
 * - INV-001 : Every Patient Has One Canonical Identity
 * - Domain Model
 * - Clinical Journey
 * ============================================================================
 */

import { AggregateRoot } from "../shared/aggregate-root";
import { Identifier } from "../shared/identifier";

export class Patient extends AggregateRoot {
  constructor(id: Identifier) {
    super(id);
  }
}