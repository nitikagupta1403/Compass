import { ValueObject } from "../shared/value-object";

export enum BiologicalSex {
  Male = "Male",
  Female = "Female",
  Unknown = "Unknown",
}

interface PatientSexProps {
  value: BiologicalSex;
}

export class PatientSex extends ValueObject<PatientSexProps> {
  constructor(value: BiologicalSex) {
    super({ value });
  }

  public get value(): BiologicalSex {
    return this.props.value;
  }

  public toString(): string {
    return this.value;
  }
}