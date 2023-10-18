export interface IPerson {
  id?: number;
  nom: string;
  structureId: string;
}

export class PersonDTO implements IPerson {
  id?: number;
  nom: string = "";
  structureId: string = "0";
}

export default class Person extends PersonDTO {
  constructor(dto: PersonDTO) {
    super();
    Object.assign(this, dto);
  }
}
