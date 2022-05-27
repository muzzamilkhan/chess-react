
export enum PieceType {
    PAWN= 'PAWN',
    KNIGHT= 'KNIGHT',
    BISHOP= 'BISHOP',
    ROOK= 'ROOK',
    QUEEN= 'QUEEN',
    KING= 'KING',
}

export interface Move {
    up: number,
    right: number,
}

export interface Postion {
    x: number,
    y: number,
}

export type blackOrWhite = 'black' | 'white';

export interface Piece {
    type: PieceType,
    color: blackOrWhite,
    allowedMoves: Move[],
    position: Postion,
}

export abstract class BasePiece {
    private _piece: Piece;

    constructor(type: PieceType, color: blackOrWhite, allowedMoves: Move[], position: Postion) {
        this._piece = {type, color, allowedMoves, position};

        return this;
    }

    get allowedMoves() {
        return this._piece.allowedMoves;
    }

    get color() {
        return this._piece.color;
    }

    get type() {
        return this._piece.type;
    }

    get position() {
        return this._piece.position;
    }

    move(move: Move) {
        this.validateMove(move);

        const newPosition = {...this._piece.position};

        newPosition.x += move.up;
        newPosition.y += move.right;

        this.validatePostion(newPosition);

        this._piece.position = newPosition;

        return this;
    }

    private validateMove(move: Move): void {
        if (this._piece.allowedMoves.find(m => m.right === move.right && m.up === move.up)) return;

        throw new Error(`Invalid move ${JSON.stringify(move)}. Allowed moves include: ${JSON.stringify(this._piece.allowedMoves)}`);
    }

    private validatePostion(position: Postion): void {
        if (position.x >= 0 && position.x <= 8 && position.y >= 0 && position.y <= 8) return;

        throw new Error('Position out of bounds');
    }
}