import './board.scss';
import Cell from '../cell/cell';
import { useAtom } from 'jotai';
import {
    movePieceAtom,
    positionAtom,
    selectedPieceAtom,
} from '../../state/store';

export function Board() {
    return (
        <table>
            <tbody>
                <tr>
                    <td className="white">
                        <Cell name="A8" />
                    </td>
                    <td className="dark">
                        <Cell name="B8" />
                    </td>
                    <td className="white">
                        <Cell name="C8" />
                    </td>
                    <td className="dark">
                        <Cell name="D8" />
                    </td>
                    <td className="white">
                        <Cell name="E8" />
                    </td>
                    <td className="dark">
                        <Cell name="F8" />
                    </td>
                    <td className="white">
                        <Cell name="G8" />
                    </td>
                    <td className="dark">
                        <Cell name="H8" />
                    </td>
                </tr>
                <tr>
                    <td className="dark">
                        <Cell name="A7" />
                    </td>
                    <td className="white">
                        <Cell name="B7" />
                    </td>
                    <td className="dark">
                        <Cell name="C7" />
                    </td>
                    <td className="white">
                        <Cell name="D7" />
                    </td>
                    <td className="dark">
                        <Cell name="E7" />
                    </td>
                    <td className="white">
                        <Cell name="F7" />
                    </td>
                    <td className="dark">
                        <Cell name="G7" />
                    </td>
                    <td className="white">
                        <Cell name="H7" />
                    </td>
                </tr>
                <tr>
                    <td className="white">
                        <Cell name="A6" />
                    </td>
                    <td className="dark">
                        <Cell name="B6" />
                    </td>
                    <td className="white">
                        <Cell name="C6" />
                    </td>
                    <td className="dark">
                        <Cell name="D6" />
                    </td>
                    <td className="white">
                        <Cell name="E6" />
                    </td>
                    <td className="dark">
                        <Cell name="F6" />
                    </td>
                    <td className="white">
                        <Cell name="G6" />
                    </td>
                    <td className="dark">
                        <Cell name="H6" />
                    </td>
                </tr>
                <tr>
                    <td className="dark">
                        <Cell name="A5" />
                    </td>
                    <td className="white">
                        <Cell name="B5" />
                    </td>
                    <td className="dark">
                        <Cell name="C5" />
                    </td>
                    <td className="white">
                        <Cell name="D5" />
                    </td>
                    <td className="dark">
                        <Cell name="E5" />
                    </td>
                    <td className="white">
                        <Cell name="F5" />
                    </td>
                    <td className="dark">
                        <Cell name="G5" />
                    </td>
                    <td className="white">
                        <Cell name="H5" />
                    </td>
                </tr>
                <tr>
                    <td className="white">
                        <Cell name="A4" />
                    </td>
                    <td className="dark">
                        <Cell name="B4" />
                    </td>
                    <td className="white">
                        <Cell name="C4" />
                    </td>
                    <td className="dark">
                        <Cell name="D4" />
                    </td>
                    <td className="white">
                        <Cell name="E4" />
                    </td>
                    <td className="dark">
                        <Cell name="F4" />
                    </td>
                    <td className="white">
                        <Cell name="G4" />
                    </td>
                    <td className="dark">
                        <Cell name="H4" />
                    </td>
                </tr>
                <tr>
                    <td className="dark">
                        <Cell name="A3" />
                    </td>
                    <td className="white">
                        <Cell name="B3" />
                    </td>
                    <td className="dark">
                        <Cell name="C3" />
                    </td>
                    <td className="white">
                        <Cell name="D3" />
                    </td>
                    <td className="dark">
                        <Cell name="E3" />
                    </td>
                    <td className="white">
                        <Cell name="F3" />
                    </td>
                    <td className="dark">
                        <Cell name="G3" />
                    </td>
                    <td className="white">
                        <Cell name="H3" />
                    </td>
                </tr>
                <tr>
                    <td className="white">
                        <Cell name="A2" />
                    </td>
                    <td className="dark">
                        <Cell name="B2" />
                    </td>
                    <td className="white">
                        <Cell name="C2" />
                    </td>
                    <td className="dark">
                        <Cell name="D2" />
                    </td>
                    <td className="white">
                        <Cell name="E2" />
                    </td>
                    <td className="dark">
                        <Cell name="F2" />
                    </td>
                    <td className="white">
                        <Cell name="G2" />
                    </td>
                    <td className="dark">
                        <Cell name="H2" />
                    </td>
                </tr>
                <tr>
                    <td className="dark">
                        <Cell name="A1" />
                    </td>
                    <td className="white">
                        <Cell name="B1" />
                    </td>
                    <td className="dark">
                        <Cell name="C1" />
                    </td>
                    <td className="white">
                        <Cell name="D1" />
                    </td>
                    <td className="dark">
                        <Cell name="E1" />
                    </td>
                    <td className="white">
                        <Cell name="F1" />
                    </td>
                    <td className="dark">
                        <Cell name="G1" />
                    </td>
                    <td className="white">
                        <Cell name="H1" />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Board;
