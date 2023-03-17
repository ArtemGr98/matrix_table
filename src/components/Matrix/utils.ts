import {Dispatch} from "react";
import {ActionCellsT, ADD_ROWS, CellArrT, RowsArrT} from "./reducers/cellsReducer";
import {ActionSumRowT, SUM_ALL_ROW} from "./reducers/sumRowReducer";
import {ActionAverageValueT, AVERAGE_ALL_COLUMNS} from "./reducers/averageValReducer";

export type DispatchesT = {
    dispatchCells: Dispatch<ActionCellsT>,
    dispatchSumRow: Dispatch<ActionSumRowT>,
    dispatchAveragesValue: Dispatch<ActionAverageValueT>
}

export const generateCellData = (
    columnCount: number, rowCount: number,
    dispatches: DispatchesT
) => {

    const totalRowArr = Array.from({length: columnCount && rowCount ? rowCount : 0}, (_, i) => i)
    const cellArr: RowsArrT = []

    totalRowArr.forEach(rowIndex => {
        const lastId = rowIndex * columnCount
        cellArr.push(generateRow(columnCount, lastId))
    })

    const {dispatchCells, dispatchAveragesValue, dispatchSumRow} = dispatches

    dispatchCells({type: ADD_ROWS, payload: cellArr})
    dispatchSumRow({type: SUM_ALL_ROW, payload: {cells: cellArr}})
    dispatchAveragesValue({type: AVERAGE_ALL_COLUMNS, payload: {cells: cellArr, columnCount: columnCount}})

}

export function generateRow(columnCount: number, lastId: number): CellArrT {
    const totalCellCount = Array.from({length: columnCount}, (_, i) => i + lastId)
    return  [...totalCellCount.map(id => ({
        id, amount: Math.floor(Math.random() * 900) + 100
    }))]
}