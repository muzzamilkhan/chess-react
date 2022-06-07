import Board from './components/board/board';
import { Provider as JotaiProvider } from 'jotai';
import Bench from './components/bench/bench';
import Controls from './components/controls/controls';
import Moves from './components/moves/moves';
import Game from './components/game/game';

export function App() {
    return (
        <JotaiProvider>
            <Game />
            <Controls></Controls>
        </JotaiProvider>
    );
}

export default App;
