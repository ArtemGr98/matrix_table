
export type ArgT = "columnCount" | "rowCount" | "closestValuesCount"

export type InputsAgrValuesT = {
    columnCount: number,
    rowCount: number,
    closestValuesCount: number
}

export type ActionInputsAgrT = {
    type: ArgT,
    payload: number
}

export const inputsAgrInitValue: InputsAgrValuesT = {
    columnCount: 4,
    rowCount: 4,
    closestValuesCount: 3
}

const reducerInputsArgs = (state: InputsAgrValuesT, action: ActionInputsAgrT) => {
    return {...state, [action.type]: action.payload}
}

export default reducerInputsArgs