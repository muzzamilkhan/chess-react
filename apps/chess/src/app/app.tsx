import Board from './components/board/board';
import { Provider as JotaiProvider } from 'jotai';
import Bench from './components/bench/bench';
import Controls from './components/controls/controls';

export function App() {
    return (
        <JotaiProvider>
            <Bench color="black" />
            <Board />
            <Bench color="white" />
            <Controls></Controls>
        </JotaiProvider>
    );
}

export default App;
