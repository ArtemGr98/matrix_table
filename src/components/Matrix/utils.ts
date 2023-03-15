import {Dispatch} from "react";
import {ActionCellsT, ADD_CELLS, Cell, CellsArr} from "./reducers/cellsReducer";
import {ActionSumRowsT, SUM_ALL_ROWS} from "./reducers/sumRowsReducer";
import {ActionAverageValueT, AVERAGE_ALL_COLUMNS} from "./reducers/averageValReducer";

export type DispatchesT = {
    dispatchCells: Dispatch<ActionCellsT>,
    dispatchSumRows: Dispatch<ActionSumRowsT>,
    dispatchAveragesValue: Dispatch<ActionAverageValueT>
}

export const generateCellData = (
    column: number, row: number,
    dispatches: DispatchesT
) => {

    const totalRowArr = Array.from({length: row}, (_, i) => i)

    const cellArr: CellsArr = []

    totalRowArr.forEach(rowIndex => {
        cellArr.push(generateRow(column))
    })

    const {dispatchCells, dispatchAveragesValue, dispatchSumRows} = dispatches

    dispatchCells({type: ADD_CELLS, payload: cellArr})
    dispatchSumRows({type: SUM_ALL_ROWS, payload: {cells: cellArr}})
    dispatchAveragesValue({type: AVERAGE_ALL_COLUMNS, payload: {cells: cellArr, column}})
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