import {Dispatch} from "react"
import {ActionSumRowT, SUM_ALL_ROW, SUM_ROW} from "./sumRowReducer"
import {ActionAverageValueT, AVERAGE_ALL_COLUMNS, AVERAGE_COLUMN} from "./averageValReducer"
import {generateRow} from "../utils"

export const ADD_ROWS = "ADD_ROWS"
export const INCREMENT_CELL_AMOUNT = "INCREMENT_CELL_AMOUNT"
export const DELETE_ROW = "DELETE_ROW"
export const ADD_ROW = "ADD_ROW"

export type Cell = {
    id: number,
    amount: number
}
export type CellArrT = Cell[]
export type RowsArrT = Cell[][]

export type ActionAddRows = {
    type: typeof ADD_ROWS,
    payload: RowsArrT
}
export type ActionIncrementCellAmount = {
    type: typeof INCREMENT_CELL_AMOUNT,
    payload: {
        cell: Cell,
        dispatches: {
            dispatchSumRow: Dispatch<ActionSumRowT>,
            dispatchAveragesValue: Dispatch<ActionAverageValueT>
        }
    }
}
export type ActionDeleteRow = {
    type: typeof DELETE_ROW,
    payload: {
        rowIndex: number,
        rowCount: number,
        dispatches: {
            dispatchAveragesValue: Dispatch<ActionAverageValueT>
        }
    }
}
export type ActionAddRow = {
    type: typeof ADD_ROW,
    payload: {
        columnCount: number,
        rowCount: number,
        dispatches: {
            dispatchAveragesValue: Dispatch<ActionAverageValueT>,
            dispatchSumRow: Dispatch<ActionSumRowT>
        }
    }
}

export type ActionCellsT = ActionAddRows | ActionIncrementCellAmount | ActionDeleteRow | ActionAddRow
export const cellsInitState: RowsArrT = [[{id: 0, amount: 0}]]

const cellsReducer = (state: RowsArrT, {type, payload}: ActionCellsT) => {
    const newState = [...state]

    switch (type) {
        case ADD_ROWS:
            return payload

        case INCREMENT_CELL_AMOUNT:
            const {dispatchAveragesValue, dispatchSumRow} = payload.dispatches
            const {id, amount} = payload.cell

            const rowIndex = state.findIndex((row) => row.some((cell) => cell.id === id))
            let columnIndex = 0

            const cellIndex = state[rowIndex].findIndex(
                (cell, index) => {
                    if (cell.id === id) {
                        columnIndex = index
                        return true
                    }
                    return false
                }
            )

            newState[rowIndex] = [...state[rowIndex]]

            newState[rowIndex][cellIndex] = {
                ...newState[rowIndex][cellIndex],
                amount,
            }

            dispatchSumRow({type: SUM_ROW, payload: {id: newState[rowIndex][0].id, cells: newState[rowIndex]}})
            dispatchAveragesValue({type: AVERAGE_COLUMN, payload: {cells: newState, columnCount: columnIndex}})

            return newState

        case DELETE_ROW:
            newState.splice(payload.rowIndex, 1)

            payload.dispatches.dispatchAveragesValue({
                type: AVERAGE_ALL_COLUMNS,
                payload: {cells: newState, columnCount: newState[0]?.length}
            })
            return newState

        case ADD_ROW:
            const lastId = state.at(-1)?.at(-1)?.id || 0
            newState.push(generateRow(payload.columnCount, lastId + 1))
            payload.dispatches.dispatchAveragesValue({
                type: AVERAGE_ALL_COLUMNS,
                payload: {cells: newState, columnCount: newState[0].length}
            })
            payload.dispatches.dispatchSumRow({type: SUM_ALL_ROW, payload: {cells: newState}})
            return newState

        default:
            return newState
    }
}

export default cellsReducer