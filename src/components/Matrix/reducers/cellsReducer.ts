import {Dispatch} from "react";
import {ActionSumRowsT, SUM_ROW} from "./sumRowsReducer";
import {ActionAverageValueT, AVERAGE_ALL_COLUMNS, AVERAGE_COLUMN} from "./averageValReducer";
import {ActionInputsAgrT} from "../../App/InputsAgrContext";
import {generateRow} from "../utils";

export const ADD_CELLS = "ADD_CELLS"
export const INCREMENT_CELL_AMOUNT = "INCREMENT_CELL_AMOUNT"
export const DELETE_ROW = "DELETE_ROW"
export const ADD_ROW = "ADD_ROW"

export type Cell = {
    id: number,
    amount: number
}

export type CellsArr = Cell[][]

export type ActionAddCells = {
    type: typeof ADD_CELLS,
    payload: CellsArr
}
export type ActionChangeCells = {
    type: typeof INCREMENT_CELL_AMOUNT,
    payload: {
        cell: Cell,
        dispatches: {
            dispatchSumRows: Dispatch<ActionSumRowsT>,
            dispatchAveragesValue: Dispatch<ActionAverageValueT>
        }
    }
}
export type ActionDeleteRow = {
    type: typeof DELETE_ROW,
    payload: {
        indexRow: number,
        dispatches: {
            dispatchAveragesValue: Dispatch<ActionAverageValueT>,
            dispatchInputsArg: Dispatch<ActionInputsAgrT>
        }
    }
}
export type ActionAddRow = {
    type: typeof ADD_ROW,
    payload: {
        columnCount: number
        dispatches: {
            dispatchAveragesValue: Dispatch<ActionAverageValueT>,
            dispatchSumRows: Dispatch<ActionSumRowsT>
        }
    }
}
export type ActionCellsT = ActionAddCells | ActionChangeCells | ActionDeleteRow | ActionAddRow


export const cellsInitState: CellsArr = [[{id: 0, amount: 0}]]

export const cellsReducer = (state: CellsArr, {type, payload}: ActionCellsT) => {
    const newState = [...state]


    switch (type) {
        case ADD_CELLS:
            return payload

        case INCREMENT_CELL_AMOUNT:

            const {dispatchAveragesValue, dispatchSumRows} = payload.dispatches
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

            dispatchSumRows({type: SUM_ROW, payload: {id: rowIndex, cells: newState[rowIndex]}})
            dispatchAveragesValue({type: AVERAGE_COLUMN, payload: {cells: newState, column: columnIndex}})

            return newState

        case DELETE_ROW:
            const {indexRow, dispatches} = payload
            newState.splice(indexRow, 1)
            dispatches.dispatchAveragesValue({type: AVERAGE_ALL_COLUMNS, payload: {cells: newState, column: newState[0].length}})
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