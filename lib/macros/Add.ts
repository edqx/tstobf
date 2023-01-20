import { Cell } from "../Cell";
import { DataType } from "../dataTypes/DataType";
import { Uint8 } from "../dataTypes/Uint8";
import { Add, Move, Procedure, Sub } from "../instructions";
import { Authority } from "../interfaces/Authority";
import { YhwhProgram } from "../program";

export class AddMacro extends Authority {
    tmp?: DataType;
    out?: DataType;

    constructor(public readonly a: DataType, public readonly b: DataType) {
        super();
    }

    isInitialised(): this is { tmp: DataType & { cells: Cell[] }; out: DataType & { cells: Cell[] }; a: DataType & { cells: Cell[] }; b: DataType & { cells: Cell[] } } {
        return this.tmp !== undefined && this.tmp.isInitialized() && this.out !== undefined && this.out.isInitialized() && this.a.isInitialized() && this.b.isInitialized();
    }


    initialise(program: YhwhProgram) {
        this.tmp = new Uint8;
        this.tmp.initialize(program, 0);
        this.tmp.takeOwnership(this);

        this.out = new Uint8;
        this.out.initialize(program, 0);
        this.out.takeOwnership(this);
    }

    write(program: YhwhProgram) {
        if (!this.isInitialised()) {
            throw new Error("Cannot write add instruction; not initialized");
        }

        this.a.takeOwnership(this);
        this.b.takeOwnership(this);

        if (this.a.getCellSpanSize() === 1 && this.b.getCellSpanSize() === 1) {
            const cellA = this.a.cells[0].take(this);
            const cellB = this.b.cells[0].take(this);

            const cellTmp = this.tmp.cells[0].take(this);
            const cellOut = this.out.cells[0].take(this);

            program.text.push(
                new Move(cellB),
                new Procedure([
                    new Move(cellTmp),
                    new Add(1),
                    new Move(cellOut),
                    new Add(1),
                    new Move(cellB),
                    new Sub(1)
                ]),
                new Move(cellTmp),
                new Procedure([
                    new Move(cellB),
                    new Add(1),
                    new Move(cellTmp),
                    new Sub(1)
                ]),
                new Move(cellA),
                new Procedure([
                    new Move(cellTmp),
                    new Add(1),
                    new Move(cellOut),
                    new Add(1),
                    new Move(cellA),
                    new Sub(1)
                ])
            );
            this.tmp.relinquishOwnership(this);
        }

        this.a.relinquishOwnership(this);
        this.b.relinquishOwnership(this);
    }
}