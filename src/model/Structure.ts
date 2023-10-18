export interface IStructure {
    id?: number;
    nom: string;
  }
  
  export class StructureDTO implements IStructure {
    id?: number;
    nom: string = "";
  }
  
  export default class Structure extends StructureDTO {
    constructor(dto: StructureDTO) {
      super();
      Object.assign(this, dto);
    }
  }
  