import { Cell } from "../Cell";
import { Authority } from "../interfaces/Authority";
import { YhwhProgram } from "../program";

export abstract class DataType extends Authority {
    cells?: Cell[];

    isInitialized(): this is { cells: Cell[]; } {
        return this.cells !== undefined;
    }

    abstract getCellSpanSize(): number;
    abstract initialize(program: YhwhProgram, initialValue: number): void;
    abstract uninitialize(program: YhwhProgram): void;
}