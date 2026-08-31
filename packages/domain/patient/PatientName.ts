/**
 * ============================================================================
 * PatientName
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the display name of a Patient.
 *
 * A PatientName is a Value Object. It has no identity and is defined
 * entirely by its value.
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - DL-005 : One Concept, One Home
 * ============================================================================
 */

import { ValueObject } from "../shared/value-object";

interface PatientNameProps {
  value: string;
}

export class PatientName extends ValueObject<PatientNameProps> {
  constructor(value: string) {
    const normalized = value.trim();

    if (normalized.length === 0) {
      throw new Error("Patient name cannot be empty.");
    }

    if (normalized.length > 200) {
      throw new Error("Patient name cannot exceed 200 characters.");
    }

    super({
      value: normalized,
    });
  }

  /**
   * Returns the patient's display name.
   */
  public toString(): string {
    return this.props.value;
  }
}