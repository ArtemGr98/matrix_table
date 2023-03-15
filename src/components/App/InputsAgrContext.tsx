import {createContext, Dispatch, FC, ReactNode, useReducer} from "react"

type InputsAgrT = {
    columnCount: number,
    rowCount: number,
    closestCount: number
}

export type ArgT = "columnCount" | "rowCount" | "closestCount"

export type ActionInputsAgrT = {
    type: ArgT,
    payload: number
}

const inputsAgrInitValue: InputsAgrT = {
    columnCount: 0,
    rowCount: 0,
    closestCount: 0
}
type InputsAgrContextProviderT = {
    children: ReactNode
}
type InputsAgrContextT = [InputsAgrT, Dispatch<ActionInputsAgrT>]

export const InputsAgrContext = createContext<InputsAgrContextT>([inputsAgrInitValue, () => {}])

const InputsAgrContextProvider: FC<InputsAgrContextProviderT> = ({ children }) => {
    const reducerInputsArg = (state: InputsAgrT, action: ActionInputsAgrT) => {
        return {...state, [action.type]: action.payload}
    }
    const [args, dispatch] = useReducer(reducerInputsArg, inputsAgrInitValue)

    return <InputsAgrContext.Provider value={[args, dispatch]}>
        {children}
    </InputsAgrContext.Provider>
}

export default InputsAgrContextProvider