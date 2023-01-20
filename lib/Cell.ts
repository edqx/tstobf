import { CellReference } from "./CellReference";
import { Authority } from "./interfaces/Authority";

export class Cell extends Authority {
    take(authority: Authority): CellReference {
        if (this.borrowedBy.length === 0 || authority.getOwner() !== this.borrowedBy[0]) {
            throw new Error("Unauthorized to take cell");
        }

        return new CellReference(this);
    }
}