import { Piece, PieceType, Position } from './types';

const jumpables: PieceType[] = [PieceType.KNIGHT];

enum Direction {
    UP = 'UP',
    DOWN = 'DOWN',
}

const getDirection = (color: Piece['color']): Direction =>
    color === 'white' ? Direction.UP : Direction.DOWN;

const enum Checks {
    HAS_ENEMY = 'HAS_ENEMY',
    IS_EMPTY = 'IS_EMPTY',
}

export const getPossibleMoves = (piece: Piece, boardPosition: Piece[]) => {
    const direction = getDirection(piece.color);
    const possibleMoves: Position[] = [];

    switch (piece.type) {
        case PieceType.PAWN:
            checkAndPush(
                piece,
                {
                    x: piece.position.x,
                    y:
                        direction === Direction.UP
                            ? piece.position.y + 1
                            : piece.position.y - 1,
                },
                boardPosition,
                possibleMoves,
                Checks.IS_EMPTY
            );

            if (
                (direction === Direction.UP && piece.position.y === 1) ||
                (direction === Direction.DOWN && piece.position.y === 6)
            ) {
                checkAndPush(
                    piece,
                    {
                        x: piece.position.x,
                        y:
                            direction === Direction.UP
                                ? piece.position.y + 2
                                : piece.position.y - 2,
                    },
                    boardPosition,
                    possibleMoves,
                    Checks.IS_EMPTY
                );
            }

            checkAndPush(
                piece,
                {
                    x: piece.position.x - 1,
                    y:
                        direction === Direction.UP
                            ? piece.position.y + 1
                            : piece.position.y - 1,
                },
                boardPosition,
                possibleMoves,
                Checks.HAS_ENEMY
            );

            checkAndPush(
                piece,
                {
                    x: piece.position.x + 1,
                    y:
                        direction === Direction.UP
                            ? piece.position.y + 1
                            : piece.position.y - 1,
                },
                boardPosition,
                possibleMoves,
                Checks.HAS_ENEMY
            );

            break;
    }

    return possibleMoves;
};

const checkAndPush = (
    piece: Piece,
    position: Position,
    boardPosition: Piece[],
    possibleMoves: Position[],
    checks: Checks
) => {
    if (position.x < 0 || position.x > 7 || position.y < 0 || position.y > 7)
        // Out of bounds
        return;
    switch (checks) {
        case Checks.IS_EMPTY:
            if (!hasPiece(piece, position, boardPosition)) {
                possibleMoves.push(position);
            }
            break;
        case Checks.HAS_ENEMY:
            if (hasEnemyPiece(piece, position, boardPosition)) {
                possibleMoves.push(position);
            }
            break;
    }
};
const hasFriendlyPiece = (
    piece: Piece,
    position: Position,
    boardPositions: Piece[]
): boolean => {
    const ownPiecePositions = boardPositions
        .filter((_piece) => _piece.color === piece.color)
        .map((_piece) => _piece.position) as Position[];

    return hasPosition(position, ownPiecePositions);
};

const hasEnemyPiece = (
    piece: Piece,
    position: Position,
    boardPositions: Piece[]
): boolean => {
    const ownPiecePositions = boardPositions
        .filter((_piece) => _piece.color !== piece.color)
        .map((_piece) => _piece.position) as Position[];

    return hasPosition(position, ownPiecePositions);
};

const hasPiece = (
    piece: Piece,
    position: Position,
    boardPositions: Piece[]
): boolean => {
    const ownPiecePositions = boardPositions.map(
        (_piece) => _piece.position
    ) as Position[];

    return hasPosition(position, ownPiecePositions);
};

const hasPosition = (position: Position, positions: Position[]): boolean => {
    return !!positions.find(
        (_move) => _move.x === position.x && _move.y === position.y
    );
};
