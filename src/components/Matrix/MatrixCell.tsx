import './Matrix.scss'
import React, {ChangeEvent, FC, memo} from "react"
import {Cell, CellArrT, INCREMENT_CELL_AMOUNT} from "./reducers/cellsReducer"
import {DispatchesT} from "./utils";

type MatrixCellPropsT = {
    dataCell: Cell,
    amountNearest: CellArrT,
    dispatches: DispatchesT,
    handleAmountNearest: (e: React.MouseEvent<HTMLTableDataCellElement>) => void
}

const areEqual = (prevProps: MatrixCellPropsT, nextProps: MatrixCellPropsT) => {
    return prevProps.dataCell.amount === nextProps.dataCell.amount
}

const MatrixCell: FC<MatrixCellPropsT> = ({dataCell, dispatches, handleAmountNearest, amountNearest}) => {

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

    return <td onClick={handleIncrementValue} id={id.toString()}
               style={{backgroundColor: `${amountNearest.find(cell => cell.id === id) ? 'lightblue': ''}`}}
               onMouseEnter={(e) =>
                   handleAmountNearest(e)}>{amount}</td>

}

export default memo(MatrixCell)
