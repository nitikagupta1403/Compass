/**
 * ============================================================================
 * PatientDateOfBirth
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the date of birth of a Patient.
 *
 * PatientDateOfBirth is immutable and is used to derive age and other
 * age-dependent clinical information.
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - DL-005 : One Concept, One Home
 * ============================================================================
 */

import { ValueObject } from "../shared/value-object";

interface PatientDateOfBirthProps {
  value: Date;
}

export class PatientDateOfBirth extends ValueObject<PatientDateOfBirthProps> {
  constructor(value: Date) {
    if (Number.isNaN(value.getTime())) {
      throw new Error("Invalid date of birth.");
    }

    const today = new Date();

    if (value > today) {
      throw new Error("Date of birth cannot be in the future.");
    }

    super({
      value: new Date(value.getTime()),
    });
  }

  /**
   * Returns the patient's date of birth.
   */
  public get value(): Date {
    return new Date(this.props.value.getTime());
  }

  /**
   * Returns the patient's age in completed years.
   */
  public getAge(referenceDate: Date = new Date()): number {
    let age = referenceDate.getFullYear() - this.props.value.getFullYear();

    const hasHadBirthdayThisYear =
      referenceDate.getMonth() > this.props.value.getMonth() ||
      (referenceDate.getMonth() === this.props.value.getMonth() &&
        referenceDate.getDate() >= this.props.value.getDate());

    if (!hasHadBirthdayThisYear) {
      age--;
    }

    return age;
  }

  public toString(): string {
    return this.props.value.toISOString().split("T")[0];
  }
}