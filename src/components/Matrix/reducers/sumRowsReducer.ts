import {Cell, CellsArr} from "./cellsReducer"

export const SUM_ALL_ROWS = "SUM_ALL_ROWS"
export const SUM_ROW = "SUM_ROW"

export type SumRowsT = {
    [index: number]: number
}
type ActionSumAllRows = {
    type: typeof SUM_ALL_ROWS,
    payload: {
        cells: CellsArr
    }
}
type ActionSumRow = {
    type: typeof SUM_ROW,
    payload: {
        id: number,
        cells: Cell[]
    }
}
export type ActionSumRowsT = ActionSumAllRows | ActionSumRow
export const sumRowInitState: SumRowsT = {0: 1}

export const sumRowsReducer = (state: SumRowsT, {type, payload}: ActionSumRowsT) => {
    const newSum: SumRowsT = {...state}
    // console.log(payload.cells)
    switch (type) {
        case SUM_ALL_ROWS:
            payload.cells.forEach((arr, index) => newSum[index] = arr.reduce((sum, sell) => sum + sell.amount, 0))
            return newSum
        case SUM_ROW:
            newSum[payload.id] = payload.cells.reduce((sum, sell) => sum + sell.amount, 0)
            return newSum
        default:
            return state
    }
}