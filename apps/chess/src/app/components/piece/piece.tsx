import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { Piece as BoardPiece, numToAlpha, Position } from '../../models/types';
import { boardPositionAtom } from '../../state/store';
import './piece.scss';

export function Piece(prop: { name: string }) {
    const [boardPosition] = useAtom(boardPositionAtom);

    const position: Position = {
        x: numToAlpha.indexOf(prop.name.substring(0, 1)),
        y: parseInt(prop.name.substring(1, 2)) - 1,
    };

    const piece = boardPosition.find(
        (_piece) =>
            _piece.position.x === position.x && _piece.position.y === position.y
    );

    return <div>{piece ? piece.type : ''}</div>;
}

export default Piece;
