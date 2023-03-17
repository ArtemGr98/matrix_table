import './Matrix.scss'
import React, {FC, memo} from "react"
import {Cell, INCREMENT_CELL_AMOUNT} from "./reducers/cellsReducer"
import {DispatchesT} from "./utils";

type MatrixCellPropsT = {
    dataCell: Cell,
    cellPercent: number | null,
    amountNearest: boolean,
    dispatches: DispatchesT,
    closestValuesCount: number
    handleAmountNearest: (e: React.MouseEvent<HTMLTableDataCellElement>, count: number) => void
}

const areEqual = (prevProps: MatrixCellPropsT, nextProps: MatrixCellPropsT) => {
    return prevProps.dataCell.amount === nextProps.dataCell.amount
        && prevProps.cellPercent === nextProps.cellPercent
        && prevProps.amountNearest === nextProps.amountNearest
        && prevProps.closestValuesCount === nextProps.closestValuesCount
}

const MatrixCell: FC<MatrixCellPropsT> = ({dataCell, dispatches, handleAmountNearest, amountNearest, cellPercent, closestValuesCount}) => {

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
               style={{backgroundColor: `${amountNearest ? 'lightblue' : ''}`}}
               onMouseEnter={(e) =>
                   handleAmountNearest(e, closestValuesCount)}>

        {cellPercent ? cellPercent + "%" : amount}
    </td>

}

export default memo(MatrixCell, areEqual)
