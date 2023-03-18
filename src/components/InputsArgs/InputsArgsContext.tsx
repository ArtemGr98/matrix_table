import {createContext, Dispatch, FC, useReducer} from "react"
import reducerInputsArgs, {
    inputsAgrInitValue,
    InputsAgrValuesT,
    ActionInputsAgrT
} from "../Matrix/reducers/reducerInputsArgs";
import {AppContextProviderT, DispatchInit} from "../Matrix/MatrixContext";

type InputsArgsContextT = [InputsAgrValuesT, Dispatch<ActionInputsAgrT>]

export const InputsArgsContext = createContext<InputsArgsContextT>([inputsAgrInitValue, DispatchInit])

const InputsArgsContextProvider: FC<AppContextProviderT> = ({ children }) => {

    const [inputsArg, dispatchInputsArg] = useReducer(reducerInputsArgs, inputsAgrInitValue)

    return <InputsArgsContext.Provider value={[inputsArg, dispatchInputsArg]}>
        {children}
    </InputsArgsContext.Provider>
}

export default InputsArgsContextProvider