import { CellReference } from "../CellReference";
import { CompileContext } from "../program";
import { Instruction } from "./Instruction";

export class Move extends Instruction {
    constructor(public readonly moveTo: CellReference) {
        super();
    }

    toString(context: CompileContext) {
        const toIdx = context.program.data.indexOf(this.moveTo.cell);

        if (context.currentCell === undefined) {
            return ">".repeat(toIdx);
        }

        const fromIdx = context.program.data.indexOf(context.currentCell);
        const diff = toIdx - fromIdx;

        if (diff === 0)
            return "";

        if (diff > 0) {
            return ">".repeat(diff);
        } else {
            return "<".repeat(-diff);
        }

        return "";
    }
}