import React, {createContext, Dispatch, FC, ReactNode, useReducer} from "react"
import reducerInputsArgs, {
    inputsAgrInitValue,
    InputsAgrValuesT,
    ActionInputsAgrT
} from "./reducerInputsArgs";

type InputsArgsContextProviderT = {
    children: ReactNode
}
type InputsArgsContextT = [InputsAgrValuesT, Dispatch<ActionInputsAgrT>]

export const InputsArgsContext = createContext<InputsArgsContextT>([inputsAgrInitValue, () => {}])

const InputsArgsContextProvider: FC<InputsArgsContextProviderT> = ({ children }) => {

    const [inputsArg, dispatchInputsArg] = useReducer(reducerInputsArgs, inputsAgrInitValue)

    return <InputsArgsContext.Provider value={[inputsArg, dispatchInputsArg]}>
        {children}
    </InputsArgsContext.Provider>
}

export default InputsArgsContextProvider