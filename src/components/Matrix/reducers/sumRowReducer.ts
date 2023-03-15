import {Cell, RowsArrT} from "./cellsReducer"

export const SUM_ALL_ROW = "SUM_ALL_ROWS"
export const SUM_ROW = "SUM_ROW"

export type SumRowT = {
    [index: number]: number
}
type ActionSumAllRow = {
    type: typeof SUM_ALL_ROW,
    payload: {
        cells: RowsArrT
    }
}
type ActionSumRow = {
    type: typeof SUM_ROW,
    payload: {
        id: number,
        cells: Cell[]
    }
}

export type ActionSumRowT = ActionSumAllRow | ActionSumRow
export const sumRowInitState: SumRowT = {0: 1}

export const sumRowReducer = (state: SumRowT, {type, payload}: ActionSumRowT) => {
    const newSum: SumRowT = {...state}

    switch (type) {
        case SUM_ALL_ROW:
            payload.cells.forEach((arr, index) => newSum[index] = arr.reduce((sum, sell) => sum + sell.amount, 0))
            return newSum
        case SUM_ROW:
            newSum[payload.id] = payload.cells.reduce((sum, sell) => sum + sell.amount, 0)
            return newSum
        default:
            return state
    }
}