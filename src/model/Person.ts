import Structure from "./Structure";

export interface IPerson {
  id?: number;
  nom?: string;
  structure?: Structure;
  structureId?: number;
}

export class PersonDTO implements IPerson {
  id?: 0;
  nom?: "";
  structure?: Structure;
  structureId?: 0;
}

export default class Person extends PersonDTO {
  constructor(dto: PersonDTO) {
    super();
    Object.assign(this, dto);
    // TODO : not fan of doing it like this
    // but I need a field "structureId" (mirroring backend DTO)
    // .... is my backend DTO bad ?
    if(this.structure) {
      this.structureId = this.structure.id
    }
  }
  // DOESNT WORK for FORM submission with : form = new Form()
  // get structureId() {
  //   return this.structure?.id
  // }
}
