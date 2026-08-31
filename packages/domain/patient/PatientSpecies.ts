/**
 * ============================================================================
 * PatientSpecies
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the biological species of a Patient.
 *
 * Species is a Value Object used throughout the clinical domain.
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - DL-005 : One Concept, One Home
 * ============================================================================
 */

import { ValueObject } from "../shared/value-object";

export enum Species {
  Dog = "Dog",
  Cat = "Cat",
  Horse = "Horse",
  Bird = "Bird",
  Rabbit = "Rabbit",
  Cow = "Cow",
  Goat = "Goat",
  Sheep = "Sheep",
  Pig = "Pig",
  Other = "Other",
}

interface PatientSpeciesProps {
  value: Species;
}

export class PatientSpecies extends ValueObject<PatientSpeciesProps> {
  constructor(value: Species) {
    super({ value });
  }

  public get value(): Species {
    return this.props.value;
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: PatientSpecies): boolean {
    return this.value === other.value;
  }
}