/**
 * ============================================================================
 * ValueObject
 * ============================================================================
 *
 * Purpose
 * -------
 * Base class for all Value Objects in the Compass domain.
 *
 * A Value Object has no identity.
 * It is defined entirely by the values it contains.
 *
 * Two Value Objects are equal if all of their properties are equal.
 *
 * Examples
 * --------
 * - PatientName
 * - PatientSex
 * - PatientDateOfBirth
 * - PatientSpecies
 * - Dose
 * - Frequency
 * - Route
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - DL-005 : One Concept, One Home
 * ============================================================================
 */

export abstract class ValueObject<T extends object> {
  protected readonly _props: Readonly<T>;

  protected constructor(props: T) {
    this._props = Object.freeze({ ...props });
  }

  /**
   * Returns the immutable properties of this Value Object.
   */
  protected get props(): Readonly<T> {
    return this._props;
  }

  /**
   * Compares two Value Objects by value.
   */
  public equals(other: ValueObject<T>): boolean {
    return JSON.stringify(this._props) === JSON.stringify(other._props);
  }
}