/**
 * ============================================================================
 * ClinicalJourneyId
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the unique identity of a Clinical Journey.
 *
 * A ClinicalJourneyId is a strongly typed identifier that prevents
 * accidental interchange with identifiers belonging to other domain
 * entities or aggregates.
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - INV-002 : Every Clinical Journey Belongs to One Patient
 * ============================================================================
 */

import { Identifier } from "../shared/identifier";

export class ClinicalJourneyId extends Identifier {
  constructor(value: string) {
    super(value);
  }
}