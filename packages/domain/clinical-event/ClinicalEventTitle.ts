/**
 * ============================================================================
 * ClinicalEventTitle
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the human-readable title of a Clinical Event.
 *
 * Examples
 * --------
 * - Initial Consultation
 * - First Seizure
 * - MRI Examination
 * - Phenobarbital Started
 *
 * Blueprint References
 * --------------------
 * - Clinical Journey
 * ============================================================================
 */

import { ValueObject } from "../shared/value-object";

interface ClinicalEventTitleProps {
  value: string;
}

export class ClinicalEventTitle extends ValueObject<ClinicalEventTitleProps> {
  constructor(value: string) {
    const normalized = value.trim();

    if (normalized.length === 0) {
      throw new Error("Clinical event title cannot be empty.");
    }

    if (normalized.length > 200) {
      throw new Error("Clinical event title cannot exceed 200 characters.");
    }

    super({
      value: normalized,
    });
  }

  public get value(): string {
    return this.props.value;
  }

  public toString(): string {
    return this.value;
  }
}