import { atom } from 'jotai';
import {
    Position,
    initialBoardPosition,
    Piece,
    blackOrWhite,
} from '../models/types';

const movePiece = (
    boardPositions: Piece[],
    piece?: Piece,
    position?: Position
): Piece[] => {
    if (!piece || !position) {
        return boardPositions;
    }

    return boardPositions.map((boardPosition) => {
        return {
            ...boardPosition,
            position:
                boardPosition.id === piece.id
                    ? position
                    : boardPosition.position,
        };
    });
};

export const selectedPieceAtom = atom<Piece | undefined>(undefined);
export const positionAtom = atom<Position | undefined>(undefined);
export const possibleMovesAtom = atom<Position[]>([]);
export const boardPositionAtom = atom<Piece[]>(initialBoardPosition);
export const colorMoveAtom = atom<blackOrWhite>('white');
export const movePieceAtom = atom(
    () => '',
    (get, set) => {
        set(
            boardPositionAtom,
            movePiece(
                get(boardPositionAtom),
                get(selectedPieceAtom),
                get(positionAtom)
            )
        );

        set(colorMoveAtom, get(colorMoveAtom) === 'white' ? 'black' : 'white');
    }
);
