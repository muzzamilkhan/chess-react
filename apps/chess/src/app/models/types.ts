import { v4 as uuid } from 'uuid';

export enum PieceType {
    PAWN = 'PAWN',
    KNIGHT = 'KNIGHT',
    BISHOP = 'BISHOP',
    ROOK = 'ROOK',
    QUEEN = 'QUEEN',
    KING = 'KING',
}

export interface Move {
    up: number;
    right: number;
}

export interface Position {
    x: number;
    y: number;
}

export type blackOrWhite = 'black' | 'white';

export interface Piece {
    type: PieceType;
    color: blackOrWhite;
    allowedMoves: Move[];
    position: Position;
}

export abstract class BasePiece {
    private _piece: Piece;

    constructor(
        type: PieceType,
        color: blackOrWhite,
        allowedMoves: Move[],
        position: Position
    ) {
        this._piece = { type, color, allowedMoves, position };

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

        const newPosition = { ...this._piece.position };

        newPosition.x += move.up;
        newPosition.y += move.right;

        this.validatePosition(newPosition);

        this._piece.position = newPosition;

        return this;
    }

    private validateMove(move: Move): void {
        if (
            this._piece.allowedMoves.find(
                (m) => m.right === move.right && m.up === move.up
            )
        )
            return;

        throw new Error(
            `Invalid move ${JSON.stringify(
                move
            )}. Allowed moves include: ${JSON.stringify(
                this._piece.allowedMoves
            )}`
        );
    }

    private validatePosition(position: Position): void {
        if (
            position.x >= 0 &&
            position.x <= 8 &&
            position.y >= 0 &&
            position.y <= 8
        )
            return;

        throw new Error('Position out of bounds');
    }
}

export interface BoardPosition {
    id: string;
    position: Position;
    color: blackOrWhite;
    type: PieceType;
}

export const initialBoardPosition: BoardPosition[] = [
    {
        id: uuid(),
        position: { x: 0, y: 0 },
        color: 'white',
        type: PieceType.ROOK,
    },
    {
        id: uuid(),
        position: { x: 0, y: 1 },
        color: 'white',
        type: PieceType.BISHOP,
    },
];

export enum ActionTypes {
    MOVE_PIECE = 'MOVE_PIECE',
}
export type Action = {
    type: ActionTypes;
    payload: any;
};

export const numToAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
