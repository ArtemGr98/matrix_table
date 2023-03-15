import {Dispatch} from "react";
import {ActionCellsT, ADD_ROWS, Cell, RowsArrT} from "./reducers/cellsReducer";
import {ActionSumRowT, SUM_ALL_ROW} from "./reducers/sumRowReducer";
import {ActionAverageValueT, AVERAGE_ALL_COLUMNS} from "./reducers/averageValReducer";

export type DispatchesT = {
    dispatchCells: Dispatch<ActionCellsT>,
    dispatchSumRow: Dispatch<ActionSumRowT>,
    dispatchAveragesValue: Dispatch<ActionAverageValueT>
}

export const generateCellData = (
    column: number, row: number,
    dispatches: DispatchesT
) => {

    const totalRowArr = Array.from({length: row}, (_, i) => i)

    const cellArr: RowsArrT = []

    totalRowArr.forEach(rowIndex => {
        cellArr.push(generateRow(column))
    })

    const {dispatchCells, dispatchAveragesValue, dispatchSumRow} = dispatches

    dispatchCells({type: ADD_ROWS, payload: cellArr})
    dispatchSumRow({type: SUM_ALL_ROW, payload: {cells: cellArr}})
    dispatchAveragesValue({type: AVERAGE_ALL_COLUMNS, payload: {cells: cellArr, columnCount: column}})
}

export function generateRow(columnCount: number) {
    const totalCellCount = Array.from({length: columnCount}, (_, i) => i)
    return  [...totalCellCount.map(id => {
        const randomNumber = Math.floor(Math.random() * 900) + 100
        const CellObj: Cell = {
            id, amount: randomNumber
        }
        return CellObj
    })]
}