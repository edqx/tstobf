import { CompileContext } from "../program";

export abstract class Instruction {
    abstract toString(context: CompileContext): string;
}