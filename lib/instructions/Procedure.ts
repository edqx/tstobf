import { CompileContext } from "../program";
import { Instruction } from "./Instruction";

export class Procedure extends Instruction {
    constructor(public readonly instructionSet: Instruction[]) {
        super();
    }

    toString(context: CompileContext) {
        return "[" + this.instructionSet.map(set => set.toString(context)).join("") + "]";
    }
}