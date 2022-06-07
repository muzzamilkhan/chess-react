import { useAtom } from 'jotai';
import { capitalize } from '../../models/helpers';
import { initialBoardPosition } from '../../models/types';
import { boardPositionAtom, colorMoveAtom, movesAtom } from '../../state/store';
import './controls.scss';

function Controls() {
    const [, boardPositionSet] = useAtom(boardPositionAtom);
    const [colorMove, colorMoveSet] = useAtom(colorMoveAtom);
    const [, movesSet] = useAtom(movesAtom);

    function restartGame() {
        boardPositionSet(initialBoardPosition);
        colorMoveSet('white');
        movesSet([]);
    }

    return (
        <div className="controls">
            <span className="color-move">
                {`${capitalize(colorMove)}'s turn`}
            </span>
            <button
                className="restart"
                onClick={restartGame}>
                Restart
            </button>
        </div>
    );
}

export default Controls;
