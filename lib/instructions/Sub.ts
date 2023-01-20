import { CompileContext } from "../program";
import { Instruction } from "./Instruction";

export class Sub extends Instruction {
    constructor(public readonly num: number) {
        super();
    }

    toString(context: CompileContext) {
        return "-".repeat(this.num);
    }
}