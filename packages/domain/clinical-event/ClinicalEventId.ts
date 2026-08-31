/**
 * ============================================================================
 * ClinicalEventId
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the unique identity of a Clinical Event.
 *
 * A ClinicalEventId is a strongly typed identifier that prevents
 * accidental interchange with identifiers belonging to other domain
 * entities or aggregates.
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - Clinical Journey
 * - INV-003 : Every Clinical Event Belongs to One Clinical Journey
 * ============================================================================
 */

import { Identifier } from "../shared/identifier";

export class ClinicalEventId extends Identifier {
  constructor(value: string) {
    super(value);
  }
}