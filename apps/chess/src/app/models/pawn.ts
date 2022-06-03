import { BasePiece, blackOrWhite, Move, PieceType, Position } from './types';

const allowedMoves: Move[] = [
    { up: 1, right: -1 },
    { up: 1, right: 1 },
];

export class Pawn extends BasePiece {
    constructor(color: blackOrWhite, position: Position) {
        super(PieceType.PAWN, color, allowedMoves, position);
    }
}
