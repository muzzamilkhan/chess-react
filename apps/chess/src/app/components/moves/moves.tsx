import { useAtom } from 'jotai';
import { postionToCell } from '../../models/helpers';
import { movesAtom } from '../../state/store';
import './moves.scss';

function Moves() {
    const [moves] = useAtom(movesAtom);

    const reverse = moves.reverse();
    return (
        <div className="container">
            <table className="moves-table">
                <tbody>
                    {reverse.map((move) => (
                        <tr key={moves.indexOf(move)}>
                            <td className="moves">
                                <div
                                    className={`${move.type.toLowerCase()}-${
                                        move.color
                                    } moved-piece`}></div>
                                <span>{`${postionToCell(move.from)} =>  ${
                                    move.to.x > -1 && move.to.x > -1
                                        ? postionToCell(move.to)
                                        : 'OUT'
                                }`}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Moves;
