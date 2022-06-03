import { atom } from 'jotai';
import {
    Position,
    BoardPosition,
    initialBoardPosition,
    Piece,
} from '../models/types';

const movePiece = (
    boardPositions: BoardPosition[],
    piece?: Piece,
    position?: Position
): BoardPosition[] => {
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

export const pieceAtom = atom<Piece | undefined>(undefined);
export const positionAtom = atom<Position | undefined>(undefined);
export const boardPositionAtom = atom<BoardPosition[]>(initialBoardPosition);
export const movePieceAtom = atom(
    () => '',
    (get, set) => {
        console.log('BP', get(boardPositionAtom));
        console.log('P', get(pieceAtom));
        console.log('pos', get(positionAtom));
        console.log(
            'moved',
            movePiece(get(boardPositionAtom), get(pieceAtom), get(positionAtom))
        );
        set(
            boardPositionAtom,
            movePiece(get(boardPositionAtom), get(pieceAtom), get(positionAtom))
        );
    }
);
