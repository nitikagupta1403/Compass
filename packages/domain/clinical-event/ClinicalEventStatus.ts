/**
 * ============================================================================
 * ClinicalEventStatus
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the lifecycle state of a Clinical Event.
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * ============================================================================
 */

import { ValueObject } from "../shared/value-object";

export enum EventStatus {
  Draft = "Draft",
  Recorded = "Recorded",
  Verified = "Verified",
  Corrected = "Corrected",
  Archived = "Archived",
}

interface ClinicalEventStatusProps {
  value: EventStatus;
}

export class ClinicalEventStatus extends ValueObject<ClinicalEventStatusProps> {
  constructor(value: EventStatus) {
    super({ value });
  }

  public get value(): EventStatus {
    return this.props.value;
  }

  public toString(): string {
    return this.value;
  }
}