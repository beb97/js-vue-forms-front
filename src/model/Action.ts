import Person from "./Person";
import Structure from "./Structure";

export interface IAction {
    id?: number;
    nom?: string;

    formateur?: Person;
    formateurId?: number;

    commercial?: Person;
    commercialId?: number;

    structure?: Structure;
    structureId?: number;
  }
  
  export class ActionDTO implements IAction {
    id?: 0;
    nom?: "";

    formateur?: Person;
    formateurId?: 0;

    commercial?: Person;
    commercialId?: 0;
    
    structure?: Structure;
    structureId?: 0;
  }
  
  export default class Action extends ActionDTO {
    constructor(dto: ActionDTO) {
      super();
      Object.assign(this, dto);
      if(this.structure) {
        this.structureId = this.structure.id
      }
      if(this.commercial) {
        this.commercialId = this.commercial.id
      }
      if(this.formateur) {
        this.formateurId = this.formateur.id
      }
    }
  }
  