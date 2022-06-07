import { useAtom } from 'jotai';
import { initialBoardPosition } from '../../models/types';
import { boardPositionAtom, colorMoveAtom } from '../../state/store';

function Controls() {
    const [boardPosition, boardPositionSet] = useAtom(boardPositionAtom);
    const [colorMove, colorMoveSet] = useAtom(colorMoveAtom);

    function restartGame() {
        boardPositionSet(initialBoardPosition);
        colorMoveSet('white');
    }

    return (
        <div>
            <span>{`${colorMove}'s turn`}</span>
            <button onClick={restartGame}>Restart</button>
        </div>
    );
}

export default Controls;
