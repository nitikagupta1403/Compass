/**
 * ============================================================================
 * PatientBreed
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the breed of a Patient.
 *
 * A PatientBreed is a Value Object. It is immutable and is defined
 * entirely by its value.
 *
 * Breed interpretation is species-dependent. Validation of whether
 * a breed belongs to a particular species is handled by the domain,
 * not by this Value Object.
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - DL-005 : One Concept, One Home
 * ============================================================================
 */

import { ValueObject } from "../shared/value-object";

interface PatientBreedProps {
  value: string;
}

export class PatientBreed extends ValueObject<PatientBreedProps> {
  constructor(value: string) {
    const normalized = value.trim();

    if (normalized.length === 0) {
      throw new Error("Patient breed cannot be empty.");
    }

    if (normalized.length > 100) {
      throw new Error("Patient breed cannot exceed 100 characters.");
    }

    super({
      value: normalized,
    });
  }

  /**
   * Returns the breed.
   */
  public get value(): string {
    return this.props.value;
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: PatientBreed): boolean {
    return this.value === other.value;
  }
}