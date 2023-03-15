import './Matrix.scss'
import {FC, memo} from "react"
import {Cell, INCREMENT_CELL_AMOUNT} from "./reducers/cellsReducer"
import {DispatchesT} from "./utils";

type MatrixCellPropsT = {
    dataCell: Cell,
    dispatches: DispatchesT
}

const areEqual = (prevProps: MatrixCellPropsT, nextProps: MatrixCellPropsT) => {
    return prevProps.dataCell.amount === nextProps.dataCell.amount
}

const MatrixCell: FC<MatrixCellPropsT> = memo(({dataCell, dispatches}) => {

    const {id, amount} = dataCell

    const handleIncrementValue = () => {
        const {dispatchAveragesValue, dispatchSumRow, dispatchCells} = dispatches
        dispatchCells({
            type: INCREMENT_CELL_AMOUNT,
            payload: {
                cell: {id, amount: amount + 1},
                dispatches: {dispatchSumRow, dispatchAveragesValue}
            }
        })
    }

    return <input type="text" readOnly className="matrix__cell" value={amount} onClick={handleIncrementValue}/>

}, areEqual)

export default MatrixCell
