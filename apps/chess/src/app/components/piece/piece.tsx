import { useAtom } from 'jotai';
import {
    boardPositionAtom,
    movePieceAtom,
    positionAtom,
    selectedPieceAtom,
} from '../../state/store';
import './piece.scss';
import { cellToPostion } from '../../models/helpers';
import { Piece as BoardPiece } from '../../models/types';

export function Piece(prop: { name: string }) {
    const [boardPosition] = useAtom(boardPositionAtom);
    const [, movePieceSet] = useAtom(movePieceAtom);
    const [selectedPiece, selectedPieceSet] = useAtom(selectedPieceAtom);
    const [, positionSet] = useAtom(positionAtom);

    const position = cellToPostion(prop.name);

    const piece = boardPosition.find(
        (_piece) =>
            _piece.position.x === position.x && _piece.position.y === position.y
    ) as BoardPiece;

    const isSelected = () => {
        if (!piece || !selectedPiece) return false;
        return selectedPiece.id === piece.id;
    };

    const move = () => {
        if (selectedPiece) {
            positionSet(position);
            movePieceSet();
            selectedPieceSet();
            return;
        }
        if (!piece) return;

        selectedPieceSet(piece);
    };

    return (
        <div
            onClick={() => move()}
            className={
                piece
                    ? `piece ${piece.type.toLowerCase()}-${piece.color} ${
                          isSelected() ? 'selected' : ''
                      }`
                    : 'piece'
            }></div>
    );
}

export default Piece;
