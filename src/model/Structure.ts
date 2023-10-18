import Person from "./Person";

export interface IStructure {
    id?: number;
    nom?: string;
    employee?: Person[];
    type: string;
  }
  
  export class StructureDTO implements IStructure {
    id?: 0;
    nom?: "";
    employee?: Person[];
    type="CLIENT";
  }
  
  export default class Structure extends StructureDTO {
    constructor(dto: StructureDTO) {
      super();
      Object.assign(this, dto);
    }
  }
  
  export class StructureType {
    static ORGANISME = new StructureType("ORGANISME")
    static CLIENT = new StructureType("CLIENT")
    static INDEPENDANT = new StructureType("INDEPENDANT")

    name: String;

    constructor(name: String) {
      this.name = name
    }

    static asArray() {
      return Object.keys(StructureType);
    }

    // Object.keys(StructureType).forEach(type => console.log("type:", type))
  }