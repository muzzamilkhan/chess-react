import Board from './components/board/board';
import { Provider as JotaiProvider } from 'jotai';

export function App() {
    return (
        <JotaiProvider>
            <Board />
        </JotaiProvider>
    );
}

export default App;
