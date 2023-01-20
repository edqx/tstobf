import { Cell } from "../Cell";
import { Add, Procedure, Sub } from "../instructions";
import { YhwhProgram } from "../program";
import { DataType } from "./DataType";

export class Uint8 extends DataType {
    constructor() {
        super();
    }

    getCellSpanSize() {
        return 1;
    }
    
    initialize(program: YhwhProgram, initialValue = 0) {
        this.cells = program.allocateMemory(this, 1);
        program.text.push(new Add(initialValue));
    }

    uninitialize(program: YhwhProgram) {
        if (this.isInitialized()) {
            for (const cell of this.cells) {
                program.text.push(new Procedure([ new Sub(1) ]));
                cell.relinquishOwnership(this);
            }
        }
        this.cells = undefined;
    }
}