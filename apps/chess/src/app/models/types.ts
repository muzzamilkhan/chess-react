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
    position: Position;
}

export const initialBoardPosition: Piece[] = [
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
