import Piece from '../piece/piece';

function Cell(props: { name: string }) {
    return (
        <div className="container">
            <Piece name={props.name} />
        </div>
    );
}

export default Cell;
