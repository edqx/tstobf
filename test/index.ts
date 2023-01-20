import { Uint8 } from "../lib/dataTypes/Uint8";
import { AddMacro } from "../lib/macros/Add";
import { YhwhProgram } from "../lib/program";

const program = new YhwhProgram;

const a = new Uint8;
a.initialize(program, 5);
const b = new Uint8;
b.initialize(program, 13);

const add = new AddMacro(a, b);

add.initialise(program);
add.write(program);

console.log(program.toString());