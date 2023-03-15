import {Dispatch} from "react";
import {ActionSumRowT, SUM_ROW} from "./sumRowReducer";
import {ActionAverageValueT, AVERAGE_ALL_COLUMNS, AVERAGE_COLUMN} from "./averageValReducer";
import {generateRow} from "../utils";

export const ADD_ROWS = "ADD_ROWS"
export const INCREMENT_CELL_AMOUNT = "INCREMENT_CELL_AMOUNT"
export const DELETE_ROW = "DELETE_ROW"
export const ADD_ROW = "ADD_ROW"

export type Cell = {
    id: number,
    amount: number
}

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
        dispatches: {
            dispatchAveragesValue: Dispatch<ActionAverageValueT>
        }
    }
}
export type ActionAddRow = {
    type: typeof ADD_ROW,
    payload: {
        columnCount: number
        dispatches: {
            dispatchAveragesValue: Dispatch<ActionAverageValueT>,
            dispatchSumRow: Dispatch<ActionSumRowT>
        }
    }
}
export type ActionCellsT = ActionAddRows | ActionIncrementCellAmount | ActionDeleteRow | ActionAddRow


export const cellsInitState: RowsArrT = [[{id: 0, amount: 0}]]

export const cellsReducer = (state: RowsArrT, {type, payload}: ActionCellsT) => {
    const newState = [...state]


    switch (type) {
        case ADD_ROWS:
            return payload

        case INCREMENT_CELL_AMOUNT: {
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

            dispatchSumRow({type: SUM_ROW, payload: {id: rowIndex, cells: newState[rowIndex]}})
            dispatchAveragesValue({type: AVERAGE_COLUMN, payload: {cells: newState, columnCount: columnIndex}})
        }
            return newState

        case DELETE_ROW:
            const {rowIndex, dispatches} = payload
            newState.splice(rowIndex, 1)
            dispatches.dispatchAveragesValue({type: AVERAGE_ALL_COLUMNS, payload: {cells: newState, columnCount: newState[0].length}})
            // dispatches.dispatchInputsArg({})
            return newState

        case ADD_ROW:
            newState.push(generateRow(payload.columnCount))
            // dispatchAveragesValue({type: })
            return newState

        default:
            return state
    }
}