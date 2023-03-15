import {RowsArrT} from "./cellsReducer";

export const AVERAGE_ALL_COLUMNS = "AVERAGE_ALL_COLUMNS"
export const AVERAGE_COLUMN = "AVERAGE_COLUMN"

export type AverageValuesT = {
    [index: number]: number
}

export type ActionAverageValueT = {
    type: typeof AVERAGE_ALL_COLUMNS | typeof AVERAGE_COLUMN,
    payload: {
        cells: RowsArrT,
        columnCount: number
    }
}
export const averageInitState: AverageValuesT = {0: 0}

export const averageValReducer = (state: AverageValuesT, {type, payload}: ActionAverageValueT) => {

    let newAverage: AverageValuesT = {}
    const {columnCount, cells} = payload

    switch (type) {
        case AVERAGE_ALL_COLUMNS:
            const row = cells.length

            if (row) {
                for (let i = 0; i < columnCount; i++) {
                    let sum = 0
                    for (let j = 0; j < row; j++) {
                        sum += cells[j][i].amount
                    }

                    newAverage[i] = (+(sum / row).toFixed(3))
                }
            }
            return newAverage

        case AVERAGE_COLUMN:
            newAverage = {...state}
            const newSum = cells.reduce((sum, cell) => cell[columnCount].amount + sum, 0)
            newAverage[columnCount] = +(newSum / cells.length).toFixed(3)
            return newAverage
        default:
            return state
    }
}