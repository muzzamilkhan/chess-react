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
    id: string;
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
        this._piece = { id: uuid(), type, color, allowedMoves, position };

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

    get id() {
        return this._piece.id;
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
        position: { x: 1, y: 0 },
        color: 'white',
        type: PieceType.KNIGHT,
    },
    {
        id: uuid(),
        position: { x: 2, y: 0 },
        color: 'white',
        type: PieceType.BISHOP,
    },
    {
        id: uuid(),
        position: { x: 3, y: 0 },
        color: 'white',
        type: PieceType.QUEEN,
    },
    {
        id: uuid(),
        position: { x: 4, y: 0 },
        color: 'white',
        type: PieceType.KING,
    },
    {
        id: uuid(),
        position: { x: 5, y: 0 },
        color: 'white',
        type: PieceType.BISHOP,
    },
    {
        id: uuid(),
        position: { x: 6, y: 0 },
        color: 'white',
        type: PieceType.KNIGHT,
    },
    {
        id: uuid(),
        position: { x: 7, y: 0 },
        color: 'white',
        type: PieceType.ROOK,
    },
    {
        id: uuid(),
        position: { x: 0, y: 1 },
        color: 'white',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 1, y: 1 },
        color: 'white',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 2, y: 1 },
        color: 'white',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 3, y: 1 },
        color: 'white',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 4, y: 1 },
        color: 'white',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 5, y: 1 },
        color: 'white',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 6, y: 1 },
        color: 'white',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 7, y: 1 },
        color: 'white',
        type: PieceType.PAWN,
    },

    {
        id: uuid(),
        position: { x: 0, y: 6 },
        color: 'black',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 1, y: 6 },
        color: 'black',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 2, y: 6 },
        color: 'black',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 3, y: 6 },
        color: 'black',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 4, y: 6 },
        color: 'black',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 5, y: 6 },
        color: 'black',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 6, y: 6 },
        color: 'black',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 7, y: 6 },
        color: 'black',
        type: PieceType.PAWN,
    },
    {
        id: uuid(),
        position: { x: 0, y: 7 },
        color: 'black',
        type: PieceType.ROOK,
    },
    {
        id: uuid(),
        position: { x: 1, y: 7 },
        color: 'black',
        type: PieceType.KNIGHT,
    },
    {
        id: uuid(),
        position: { x: 2, y: 7 },
        color: 'black',
        type: PieceType.BISHOP,
    },
    {
        id: uuid(),
        position: { x: 3, y: 7 },
        color: 'black',
        type: PieceType.QUEEN,
    },
    {
        id: uuid(),
        position: { x: 4, y: 7 },
        color: 'black',
        type: PieceType.KING,
    },
    {
        id: uuid(),
        position: { x: 5, y: 7 },
        color: 'black',
        type: PieceType.BISHOP,
    },
    {
        id: uuid(),
        position: { x: 6, y: 7 },
        color: 'black',
        type: PieceType.KNIGHT,
    },
    {
        id: uuid(),
        position: { x: 7, y: 7 },
        color: 'black',
        type: PieceType.ROOK,
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
