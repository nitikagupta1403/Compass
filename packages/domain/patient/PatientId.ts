/**
 * ============================================================================
 * PatientId
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the unique identity of a Patient.
 *
 * A PatientId is a strongly typed identifier that prevents accidental
 * interchange with identifiers belonging to other domain entities.
 *
 * Blueprint References
 * --------------------
 * - INV-001 : Every Patient Has One Canonical Identity
 * - Domain Model
 * ============================================================================
 */

import { Identifier } from "../shared/identifier";

export class PatientId extends Identifier {
  constructor(value: string) {
    super(value);
  }
}