/**
 * ============================================================================
 * Entity
 * ============================================================================
 *
 * Purpose
 * -------
 * Base class for all domain entities.
 *
 * An Entity is defined by its identity rather than its attributes.
 * Attributes may change over time, but identity remains constant.
 *
 * Blueprint References
 * --------------------
 * - INV-001 : Every Patient Has One Canonical Identity
 * - DL-005  : One Concept, One Home
 * - Domain Model
 * ============================================================================
 */

import { Identifier } from "./identifier";

export abstract class Entity {
  protected readonly id: Identifier;

  protected constructor(id: Identifier) {
    this.id = id;
  }

  /**
   * Returns the entity identifier.
   */
  public getId(): Identifier {
    return this.id;
  }

  /**
   * Two entities are equal if they share the same identity.
   */
  public equals(other: Entity): boolean {
    return this.id.equals(other.id);
  }
}