import { useAtom } from 'jotai';
import {
    boardPositionAtom,
    movePieceAtom,
    positionAtom,
    selectedPieceAtom,
    possibleMovesAtom,
    colorMoveAtom,
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
    const [colorMove, colorMoveSet] = useAtom(colorMoveAtom);

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
            ? 'possible-move'
            : '';
    };

    const move = () => {
        if (selectedPiece) {
            if (
                possibleMoves.find(
                    (_move) => _move.x === position.x && _move.y === position.y
                )
            ) {
                const isAttack = piece?.id;

                positionSet(position);
                movePieceSet();

                if (isAttack) {
                    const attackedPiece = boardPosition.find(
                        (_piece) => _piece.id === isAttack
                    );
                    selectedPieceSet(attackedPiece);
                    positionSet({ x: -1, y: -1 });
                    movePieceSet();
                    colorMoveSet(colorMove === 'white' ? 'black' : 'white');
                }
            }

            possibleMovesSet([]);
            positionSet();
            selectedPieceSet();
            return;
        }
        if (!piece) return;
        if (piece.color !== colorMove) return;

        selectedPieceSet(piece);
        possibleMovesSet(getPossibleMoves(piece, boardPosition));
    };

    return (
        <div
            onClick={() => move()}
            className={
                (piece
                    ? `piece occupied ${piece.type.toLowerCase()}-${
                          piece.color
                      } piece-icon ${selected()}`
                    : 'piece') + ` ${possibleMove()}`
            }></div>
    );
}

export default Cell;
