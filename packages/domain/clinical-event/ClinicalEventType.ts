/**
 * ============================================================================
 * ClinicalEventType
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the type of a Clinical Event.
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - Clinical Journey
 * ============================================================================
 */

import { ValueObject } from "../shared/value-object";

export enum EventType {
  Consultation = "Consultation",
  Symptom = "Symptom",
  Diagnosis = "Diagnosis",
  Medication = "Medication",
  Laboratory = "Laboratory",
  Imaging = "Imaging",
  Procedure = "Procedure",
  Surgery = "Surgery",
  Hospitalization = "Hospitalization",
  FollowUp = "FollowUp",
  Outcome = "Outcome",
  Observation = "Observation",
  Other = "Other",
}

interface ClinicalEventTypeProps {
  value: EventType;
}

export class ClinicalEventType extends ValueObject<ClinicalEventTypeProps> {
  constructor(value: EventType) {
    super({ value });
  }

  public get value(): EventType {
    return this.props.value;
  }

  public toString(): string {
    return this.value;
  }
}