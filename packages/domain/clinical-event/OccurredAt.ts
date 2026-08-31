/**
 * ============================================================================
 * OccurredAt
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents when a Clinical Event occurred.
 *
 * Blueprint References
 * --------------------
 * - Clinical Journey
 * ============================================================================
 */

import { ValueObject } from "../shared/value-object";

interface OccurredAtProps {
  value: Date;
}

export class OccurredAt extends ValueObject<OccurredAtProps> {
  constructor(value: Date) {
    if (Number.isNaN(value.getTime())) {
      throw new Error("Invalid occurrence date.");
    }

    super({
      value: new Date(value.getTime()),
    });
  }

  public get value(): Date {
    return new Date(this.props.value.getTime());
  }

  public toString(): string {
    return this.value.toISOString();
  }
}