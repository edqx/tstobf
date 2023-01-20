import t from "typescript";
import { Cell } from "./Cell";
import { Instruction } from "./instructions";
import { Authority } from "./interfaces/Authority";

export interface CompileContext {
    program: YhwhProgram;
    currentCell: Cell|undefined;
}

export class YhwhProgram {
    data: Cell[];
    text: Instruction[];

    constructor() {
        this.data = [];
        this.text = [];
    }

    allocateMemory(authority: Authority, numBytes: number) {
        for (let i = 0; i < this.data.length; i++) {
            let isFree = true;

            for (let j = 0; j < numBytes; j++) {
                if (this.data[i + j].isOwned()) {
                    isFree = false;
                    break;
                }
            }

            if (isFree) {
                const cells = this.data.slice(i, i + numBytes);
                for (let j = 0; j < cells.length; j++) {
                    cells[j].takeOwnership(authority);
                }
                return cells;
            }
        }
    }

    toString() {
        const compileContext: CompileContext = {
            currentCell: undefined,
            program: this
        };

        return this.text.map(t => t.toString(compileContext)).join("");
    }
}