import { useAtom } from 'jotai';
import {
    boardPositionAtom,
    movePieceAtom,
    positionAtom,
    selectedPieceAtom,
    possibleMovesAtom,
} from '../../state/store';
import './cell.scss';
import { cellToPostion } from '../../models/helpers';
import { Piece } from '../../models/types';
import { getPossibleMoves } from '../../models/moves';

export function Cell(prop: { name: string }) {
    const [boardPosition] = useAtom(boardPositionAtom);
    const [, movePieceSet] = useAtom(movePieceAtom);
    const [selectedPiece, selectedPieceSet] = useAtom(selectedPieceAtom);
    const [, positionSet] = useAtom(positionAtom);
    const [possibleMoves, possibleMovesSet] = useAtom(possibleMovesAtom);

    const position = cellToPostion(prop.name);

    const piece = boardPosition.find(
        (_piece) =>
            _piece.position.x === position.x && _piece.position.y === position.y
    ) as Piece;

    const selected = (): string => {
        if (!piece || !selectedPiece) return '';
        return selectedPiece.id === piece.id ? 'selected' : '';
    };

    const possibleMove = (): string => {
        if (possibleMoves.length === 0) return '';

        return possibleMoves.find(
            (_move) => _move.x === position.x && _move.y === position.y
        )
            ? 'possibleMove'
            : '';
    };

    const move = () => {
        if (selectedPiece) {
            if (
                possibleMoves.find(
                    (_move) => _move.x === position.x && _move.y === position.y
                )
            ) {
                positionSet(position);
                movePieceSet();
            }

            possibleMovesSet([]);
            positionSet();
            selectedPieceSet();
            return;
        }
        if (!piece) return;

        selectedPieceSet(piece);
        possibleMovesSet(getPossibleMoves(piece, boardPosition));
    };

    return (
        <div
            onClick={() => move()}
            className={
                (piece
                    ? `piece ${piece.type.toLowerCase()}-${
                          piece.color
                      } ${selected()}`
                    : 'piece') +
                ` ${possibleMove()} ${JSON.stringify(position)}`
            }></div>
    );
}

export default Cell;
