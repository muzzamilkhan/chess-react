import { useAtom } from 'jotai';
import { boardPositionAtom } from '../../state/store';
import { blackOrWhite } from '../../models/types';
import './bench.scss';

function Bench(props: any) {
    const [boardPosition] = useAtom(boardPositionAtom);

    const benchedPieces = boardPosition.filter(
        (_piece) =>
            _piece.color === props.color &&
            _piece.position.x === -1 &&
            _piece.position.y === -1
    );

    return (
        <div className="bench">
            {benchedPieces.map((_piece) => (
                <div
                    key={_piece.id}
                    className={`${_piece.type.toLowerCase()}-${
                        _piece.color
                    } benched-piece`}></div>
            ))}
        </div>
    );
}

export default Bench;
