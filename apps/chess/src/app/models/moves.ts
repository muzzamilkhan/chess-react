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
    ENEMY_OR_EMPTY = 'ENEMY_OR_EMPTY',
}

export const getPossibleMoves = (piece: Piece, boardPosition: Piece[]) => {
    const direction = getDirection(piece.color);
    const possibleMoves: Position[] = [];

    switch (piece.type) {
        case PieceType.PAWN:
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                direction === Direction.UP ? 'up' : 'down',
                Checks.IS_EMPTY,
                1
            );

            if (
                (direction === Direction.UP && piece.position.y === 1) ||
                (direction === Direction.DOWN && piece.position.y === 6)
            ) {
                moveStraight(
                    piece,
                    boardPosition,
                    possibleMoves,
                    direction === Direction.UP ? 'up' : 'down',
                    Checks.IS_EMPTY,
                    2
                );
            }

            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                direction === Direction.UP,
                true,
                Checks.HAS_ENEMY,
                1
            );

            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                direction === Direction.UP,
                false,
                Checks.HAS_ENEMY,
                1
            );
            break;
        case PieceType.BISHOP:
            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                true,
                true,
                Checks.ENEMY_OR_EMPTY
            );
            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                true,
                false,
                Checks.ENEMY_OR_EMPTY
            );
            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                false,
                true,
                Checks.ENEMY_OR_EMPTY
            );
            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                false,
                false,
                Checks.ENEMY_OR_EMPTY
            );

            break;
        case PieceType.ROOK:
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                'up',
                Checks.ENEMY_OR_EMPTY
            );
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                'down',
                Checks.ENEMY_OR_EMPTY
            );
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                'right',
                Checks.ENEMY_OR_EMPTY
            );
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                'left',
                Checks.ENEMY_OR_EMPTY
            );

            break;
        case PieceType.QUEEN:
            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                true,
                true,
                Checks.ENEMY_OR_EMPTY
            );
            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                true,
                false,
                Checks.ENEMY_OR_EMPTY
            );
            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                false,
                true,
                Checks.ENEMY_OR_EMPTY
            );
            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                false,
                false,
                Checks.ENEMY_OR_EMPTY
            );
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                'up',
                Checks.ENEMY_OR_EMPTY
            );
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                'down',
                Checks.ENEMY_OR_EMPTY
            );
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                'right',
                Checks.ENEMY_OR_EMPTY
            );
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                'left',
                Checks.ENEMY_OR_EMPTY
            );

            break;
        case PieceType.KING:
            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                true,
                true,
                Checks.ENEMY_OR_EMPTY,
                1
            );
            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                true,
                false,
                Checks.ENEMY_OR_EMPTY,
                1
            );
            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                false,
                true,
                Checks.ENEMY_OR_EMPTY,
                1
            );
            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                false,
                false,
                Checks.ENEMY_OR_EMPTY,
                1
            );
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                'up',
                Checks.ENEMY_OR_EMPTY,
                1
            );
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                'down',
                Checks.ENEMY_OR_EMPTY,
                1
            );
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                'right',
                Checks.ENEMY_OR_EMPTY,
                1
            );
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                'left',
                Checks.ENEMY_OR_EMPTY,
                1
            );

            break;
    }

    return possibleMoves;
};

const moveDiagonal = (
    piece: Piece,
    boardPosition: Piece[],
    possibleMoves: Position[],
    up: boolean,
    right: boolean,
    check: Checks,
    limit?: number
) => {
    let x = right ? piece.position.x + 1 : piece.position.x - 1;
    let y = up ? piece.position.y + 1 : piece.position.y - 1;
    let counter = 0;
    let foundPlacetaken = false;

    while (
        inBounds({ x, y }) &&
        (limit ? counter < limit : true) &&
        !foundPlacetaken
    ) {
        if (hasFriendlyPiece(piece, { x, y }, boardPosition)) {
            break;
        }

        if (hasEnemyPiece(piece, { x, y }, boardPosition)) {
            foundPlacetaken = true;
        }

        checkAndPush(piece, { x, y }, boardPosition, possibleMoves, check);

        x = right ? x + 1 : x - 1;
        y = up ? y + 1 : y - 1;
        counter++;
    }
};

const moveStraight = (
    piece: Piece,
    boardPosition: Piece[],
    possibleMoves: Position[],
    direction: 'up' | 'down' | 'left' | 'right',
    check: Checks,
    limit?: number
) => {
    let x = piece.position.x;
    let y = piece.position.y;

    switch (direction) {
        case 'up':
            y++;
            break;
        case 'down':
            y--;
            break;
        case 'right':
            x++;
            break;
        case 'left':
            x--;
            break;
    }

    let counter = 0;
    let foundPlacetaken = false;

    while (
        inBounds({ x, y }) &&
        (limit ? counter < limit : true) &&
        !foundPlacetaken
    ) {
        if (hasFriendlyPiece(piece, { x, y }, boardPosition)) {
            break;
        }

        if (hasEnemyPiece(piece, { x, y }, boardPosition)) {
            foundPlacetaken = true;
        }

        checkAndPush(piece, { x, y }, boardPosition, possibleMoves, check);

        switch (direction) {
            case 'up':
                y++;
                break;
            case 'down':
                y--;
                break;
            case 'right':
                x++;
                break;
            case 'left':
                x--;
                break;
        }
        counter++;
    }
};

const inBounds = (position: Position): boolean => {
    return (
        position.x >= 0 && position.x <= 7 && position.y >= 0 && position.y <= 7
    );
};

const checkAndPush = (
    piece: Piece,
    position: Position,
    boardPosition: Piece[],
    possibleMoves: Position[],
    checks: Checks
) => {
    if (!inBounds(position))
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
        case Checks.ENEMY_OR_EMPTY:
            if (!hasFriendlyPiece(piece, position, boardPosition)) {
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
