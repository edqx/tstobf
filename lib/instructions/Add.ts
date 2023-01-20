import { CompileContext } from "../program";
import { Instruction } from "./Instruction";

export class Add extends Instruction {
    constructor(public readonly num: number) {
        super();
    }

    toString(context: CompileContext) {
        return "+".repeat(this.num);
    }
}