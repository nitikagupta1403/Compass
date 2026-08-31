/**
 * ============================================================================
 * Demographics
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the demographic profile of a Patient.
 *
 * Demographics is a Value Object that groups the patient's immutable
 * demographic characteristics.
 *
 * Blueprint References
 * --------------------
 * - Domain Model
 * - DL-005 : One Concept, One Home
 * ============================================================================
 */

import { ValueObject } from "../shared/value-object";
import { PatientName } from "./PatientName";
import { PatientSex } from "./PatientSex";
import { PatientDateOfBirth } from "./PatientDateOfBirth";
import { PatientSpecies } from "./PatientSpecies";
import { PatientBreed } from "./PatientBreed";
import { PatientWeight } from "./PatientWeight";

interface DemographicsProps {
  name: PatientName;
  sex: PatientSex;
  dateOfBirth: PatientDateOfBirth;
  species: PatientSpecies;
  breed: PatientBreed;
  weight: PatientWeight;
}

export class Demographics extends ValueObject<DemographicsProps> {
  constructor(props: DemographicsProps) {
    super(props);
  }

  public get name(): PatientName {
    return this.props.name;
  }

  public get sex(): PatientSex {
    return this.props.sex;
  }

  public get dateOfBirth(): PatientDateOfBirth {
    return this.props.dateOfBirth;
  }

  public get species(): PatientSpecies {
    return this.props.species;
  }

  public get breed(): PatientBreed {
    return this.props.breed;
  }

  public get weight(): PatientWeight {
    return this.props.weight;
  }
}