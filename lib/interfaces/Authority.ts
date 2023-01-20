export abstract class Authority {
    borrowedBy: Authority[];

    constructor() {
        this.borrowedBy = [];
    }

    getOwner() {
        return this.borrowedBy[0];
    }

    isOwned() {
        return this.borrowedBy.length > 0;
    }

    takeOwnership(authority: Authority) {
        if (this.borrowedBy.length === 0 || this.borrowedBy[0].getOwner() === authority.getOwner()) {
            this.borrowedBy.unshift(authority);
        }

        throw new Error("Invalid authority");
    }

    relinquishOwnership(authority: Authority) {
        if (this.borrowedBy.length === 0 || this.borrowedBy[0].getOwner() !== authority.getOwner()) {
            throw new Error("Invalid authority, cell is not owned by relinquishing authority");
        }

        this.borrowedBy.shift();
    }
}