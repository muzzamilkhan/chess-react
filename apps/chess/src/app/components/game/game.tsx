import Bench from '../bench/bench';
import Board from '../board/board';
import Moves from '../moves/moves';
import './game.scss';

function Game() {
    return (
        <table className="layout">
            <tbody>
                <tr>
                    <td colSpan={2}>
                        <Bench color="black" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Board />
                    </td>
                    <td>
                        <Moves />
                    </td>
                </tr>

                <tr>
                    <td colSpan={2}>
                        <Bench color="white" />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Game;
