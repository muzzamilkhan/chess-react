import { useAtom } from 'jotai';
import { boardPositionAtom } from '../../state/store';
import './piece.scss';
import { cellToPostion } from '../../models/helpers';

export function Piece(prop: { name: string }) {
    const [boardPosition] = useAtom(boardPositionAtom);

    const position = cellToPostion(prop.name);

    const piece = boardPosition.find(
        (_piece) =>
            _piece.position.x === position.x && _piece.position.y === position.y
    );

    return <div>{piece ? piece.type : ''}</div>;
}

export default Piece;
