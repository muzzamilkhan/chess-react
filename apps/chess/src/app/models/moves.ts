import { type } from 'os';
import { Piece, PieceType, Position } from './types';

const jumpables: PieceType[] = [PieceType.KNIGHT];

enum YDirection {
    UP = 'UP',
    DOWN = 'DOWN',
}

enum XDirection {
    RIGHT = 'RIGHT',
    LEFT = 'LEFT',
}

const getDirection = (color: Piece['color']): YDirection =>
    color === 'white' ? YDirection.UP : YDirection.DOWN;

const enum Checks {
    HAS_ENEMY = 'HAS_ENEMY',
    IS_EMPTY = 'IS_EMPTY',
    ENEMY_OR_EMPTY = 'ENEMY_OR_EMPTY',
}

const allDiagonals = [
    {
        yDirection: YDirection.UP,
        xDirection: XDirection.RIGHT,
    },
    {
        yDirection: YDirection.UP,
        xDirection: XDirection.LEFT,
    },
    {
        yDirection: YDirection.DOWN,
        xDirection: XDirection.RIGHT,
    },
    {
        yDirection: YDirection.DOWN,
        xDirection: XDirection.LEFT,
    },
] as {
    yDirection: YDirection;
    xDirection: XDirection;
}[];

const allStraights = [
    YDirection.UP,
    YDirection.DOWN,
    XDirection.RIGHT,
    XDirection.LEFT,
] as Array<YDirection | XDirection>;

export const getPossibleMoves = (piece: Piece, boardPosition: Piece[]) => {
    const direction = getDirection(piece.color);
    const possibleMoves: Position[] = [];

    switch (piece.type) {
        case PieceType.PAWN:
            // Default move
            moveStraight(
                piece,
                boardPosition,
                possibleMoves,
                direction,
                Checks.IS_EMPTY,
                1
            );

            // Initial double move
            if (
                (direction === YDirection.UP && piece.position.y === 1) ||
                (direction === YDirection.DOWN && piece.position.y === 6)
            ) {
                moveStraight(
                    piece,
                    boardPosition,
                    possibleMoves,
                    direction,
                    Checks.IS_EMPTY,
                    2
                );
            }

            // Attack
            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                direction,
                XDirection.RIGHT,
                Checks.HAS_ENEMY,
                1
            );

            moveDiagonal(
                piece,
                boardPosition,
                possibleMoves,
                direction,
                XDirection.LEFT,
                Checks.HAS_ENEMY,
                1
            );
            break;
        case PieceType.BISHOP:
            allDiagonals.forEach((_move) => {
                moveDiagonal(
                    piece,
                    boardPosition,
                    possibleMoves,
                    _move.yDirection,
                    _move.xDirection,
                    Checks.ENEMY_OR_EMPTY
                );
            });

            break;
        case PieceType.ROOK:
            allStraights.forEach((_direction) => {
                moveStraight(
                    piece,
                    boardPosition,
                    possibleMoves,
                    _direction,
                    Checks.ENEMY_OR_EMPTY
                );
            });

            break;
        case PieceType.QUEEN:
            allDiagonals.forEach((_move) => {
                moveDiagonal(
                    piece,
                    boardPosition,
                    possibleMoves,
                    _move.yDirection,
                    _move.xDirection,
                    Checks.ENEMY_OR_EMPTY
                );
            });
            allStraights.forEach((_direction) => {
                moveStraight(
                    piece,
                    boardPosition,
                    possibleMoves,
                    _direction,
                    Checks.ENEMY_OR_EMPTY
                );
            });

            break;
        case PieceType.KING:
            allDiagonals.forEach((_move) => {
                moveDiagonal(
                    piece,
                    boardPosition,
                    possibleMoves,
                    _move.yDirection,
                    _move.xDirection,
                    Checks.ENEMY_OR_EMPTY,
                    1
                );
            });
            allStraights.forEach((_direction) => {
                moveStraight(
                    piece,
                    boardPosition,
                    possibleMoves,
                    _direction,
                    Checks.ENEMY_OR_EMPTY,
                    1
                );
            });

            break;
        case PieceType.KNIGHT:
            moveKnight(piece, boardPosition, possibleMoves);
            break;
    }

    return possibleMoves;
};

type KnightMove = {
    first: { move: XDirection | YDirection; steps: 1 | 2 };
    second: { move: XDirection | YDirection; steps: 1 | 2 };
};

const moveKnight = (
    piece: Piece,
    boardPosition: Piece[],
    possibleMoves: Position[]
) => {
    const moves: KnightMove[] = [];

    allStraights.forEach((firstMove) => {
        let secondMoves: Array<XDirection | YDirection> = [];
        if (firstMove in XDirection) {
            secondMoves = allStraights.filter(
                (direction) => !(direction in XDirection)
            );
        } else {
            secondMoves = allStraights.filter(
                (direction) => !(direction in YDirection)
            );
        }

        secondMoves.forEach((secondMove) => {
            moves.push({
                first: { move: firstMove, steps: 2 },
                second: { move: secondMove, steps: 1 },
            });
            moves.push({
                first: { move: firstMove, steps: 1 },
                second: { move: secondMove, steps: 2 },
            });
        });
    });

    moves.forEach((move) => {
        let x = piece.position.x;
        let y = piece.position.y;

        for (const { move: _move, steps } of Object.values(move)) {
            if (_move in XDirection) {
                x = _move === XDirection.RIGHT ? x + steps : x - steps;
            } else {
                y = _move === YDirection.UP ? y + steps : y - steps;
            }
        }

        checkAndPush(
            piece,
            { x, y },
            boardPosition,
            possibleMoves,
            Checks.ENEMY_OR_EMPTY
        );
    });
};

const moveDiagonal = (
    piece: Piece,
    boardPosition: Piece[],
    possibleMoves: Position[],
    yDirection: YDirection,
    xDirection: XDirection,
    check: Checks,
    limit?: number
) => {
    let x = piece.position.x;
    let y = piece.position.y;
    let counter = 0;
    let foundPlacetaken = false;

    const move = () => {
        y = yDirection === YDirection.UP ? y + 1 : y - 1;
        x = xDirection === XDirection.RIGHT ? x + 1 : x - 1;
    };

    move();

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
        move();

        counter++;
    }
};

const moveStraight = (
    piece: Piece,
    boardPosition: Piece[],
    possibleMoves: Position[],
    direction: YDirection | XDirection,
    check: Checks,
    limit?: number
) => {
    let counter = 0;
    let foundPlacetaken = false;
    let x = piece.position.x;
    let y = piece.position.y;

    const move = () => {
        switch (direction) {
            case YDirection.UP:
                y++;
                break;
            case YDirection.DOWN:
                y--;
                break;
            case XDirection.RIGHT:
                x++;
                break;
            case XDirection.LEFT:
                x--;
                break;
        }
    };

    move();

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
        move();

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
