/**
 * ============================================================================
 * EvidenceId
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the unique identity of an Evidence.
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - Evidence Before Opinion
 * ============================================================================
 */

import { Identifier } from "../shared/identifier";

export class EvidenceId extends Identifier {
  constructor(value: string) {
    super(value);
  }
}