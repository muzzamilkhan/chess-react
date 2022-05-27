import React from 'react';
import './board.module.scss';

export function Board() {
    // const table = React.createElement('table', { style: styles}, 
    //     React.createElement('tbody', {} ,
    //         React.createElement('tr', {},
    //             React.createElement('td')    
    //         )
    //     )
    // )

    function ObjectCell(idx: number) {
        const className = `col${idx}`;
        return (
            <td className={className} style={{ border: '1px solid', width: '50px', height: '50px'}}>&nbsp;</td>
        );
    }


    const cells = [];

    for (let i=0; i < 8; i++) {
        cells.push(ObjectCell(i+1));
    }

    function ObjectRows(idx: number, cells: any) {
        const className = `row${idx}`;
        return (
            <tr className={className}>
                { cells }
            </tr>
        )
    }

    const rows = [];
    for (let i=0; i < 8; i++) {
        rows.push(ObjectRows(i+1, cells));
    }


    return (
        <table className='table' style={{ border: '1px solid', borderCollapse: 'collapse'}}>
            <tbody>
                { rows }
            </tbody>
        </table>);
}

export default Board;
