import React from 'react';
import './board.scss';

const numToAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];


export function Board() {
    let isDark = false;

    function ObjectCell(row: number, col: number) {
        isDark = !isDark;
        const cellName = `${numToAlpha[row]}${col+1}`
        const className = `cell${cellName} ${isDark ? 'dark' : 'light'}`;

        return (
            <td className={className}>{cellName}</td>
        );
    }

    function ObjectRows(idx: number) {
        const cells = [];

        for (let i=0; i < 8; i++) {
            cells.push(ObjectCell(i, idx));
        }

        return (<tr>{ cells }</tr>);
    }

    const rows = [];
    

    for (let i=7; i >= 0; i--) {
        isDark = i % 2 === 1;
        rows.push(ObjectRows(i));
    }


    return (
        <table>
            <tbody>
                { rows }
            </tbody>
        </table>);
}

export default Board;
