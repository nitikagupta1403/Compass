/**
 * ============================================================================
 * PatientWeight
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the body weight of a Patient.
 *
 * PatientWeight is a Value Object consisting of a numeric value and
 * a unit of measurement.
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - DL-005 : One Concept, One Home
 * ============================================================================
 */

import { ValueObject } from "../shared/value-object";

export enum WeightUnit {
  Kilogram = "kg",
  Gram = "g",
  Pound = "lb",
}

interface PatientWeightProps {
  value: number;
  unit: WeightUnit;
}

export class PatientWeight extends ValueObject<PatientWeightProps> {
  constructor(value: number, unit: WeightUnit = WeightUnit.Kilogram) {
    if (!Number.isFinite(value)) {
      throw new Error("Patient weight must be a valid number.");
    }

    if (value <= 0) {
      throw new Error("Patient weight must be greater than zero.");
    }

    super({
      value,
      unit,
    });
  }

  /**
   * Returns the numeric weight.
   */
  public get value(): number {
    return this.props.value;
  }

  /**
   * Returns the weight unit.
   */
  public get unit(): WeightUnit {
    return this.props.unit;
  }

  public toString(): string {
    return `${this.value} ${this.unit}`;
  }

  public equals(other: PatientWeight): boolean {
    return (
      this.value === other.value &&
      this.unit === other.unit
    );
  }
}