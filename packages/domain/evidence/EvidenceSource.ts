/**
 * ============================================================================
 * EvidenceSource
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the origin of clinical evidence.
 *
 * Blueprint References
 * --------------------
 * - Evidence Before Opinion
 * ============================================================================
 */

import { ValueObject } from "../shared/value-object";

export enum EvidenceSourceValue {
  Owner = "Owner",
  Veterinarian = "Veterinarian",
  Laboratory = "Laboratory",
  Hospital = "Hospital",
  ImagingCenter = "Imaging Center",
  WearableDevice = "Wearable Device",
  ReferralClinic = "Referral Clinic",
  ExternalProvider = "External Provider",
  Unknown = "Unknown",
}

interface EvidenceSourceProps {
  value: EvidenceSourceValue;
}

export class EvidenceSource extends ValueObject<EvidenceSourceProps> {
  constructor(value: EvidenceSourceValue) {
    super({ value });
  }

  public get value(): EvidenceSourceValue {
    return this.props.value;
  }

  public toString(): string {
    return this.value;
  }
}