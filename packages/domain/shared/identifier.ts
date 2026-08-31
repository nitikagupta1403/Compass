/**
 * ============================================================================
 * Identifier
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the unique identity of an Entity.
 *
 * Identity is immutable and independent of an Entity's attributes.
 * Two entities are considered the same if they share the same Identifier.
 *
 * This class is intentionally generic and reusable across the entire domain.
 *
 * Blueprint References
 * --------------------
 * - INV-001 : Every Patient Has One Canonical Identity
 * - Domain Model
 * - Design Law 5 : One Concept, One Home
 * ============================================================================
 */

export class Identifier {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("Identifier cannot be empty.");
    }

    this.value = value;
  }

  /**
   * Returns the underlying identifier value.
   */
  public toString(): string {
    return this.value;
  }

  /**
   * Compares two identifiers.
   */
  public equals(other: Identifier): boolean {
    return this.value === other.value;
  }
}