import {ChangeEvent, FC, useContext} from "react"
import {ArgT, InputsAgrContext} from "../App/InputsAgrContext"
import './InputArg.scss'

type InputArgPropsT = {
    minValue: number,
    maxValue: number,
    name: ArgT
}

const InputArg: FC<InputArgPropsT> = ({minValue, maxValue, name}) => {
    const [args, dispatch] = useContext(InputsAgrContext)

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.target.value
        if (newValue <= maxValue && newValue >= 0) {
            dispatch({type: name, payload: newValue})
        }
        else if (newValue > maxValue) {
            dispatch({type: name, payload: maxValue})
        }
        else {
            dispatch({type: name, payload: 0})
        }
        //newValue <= maxValue ? dispatch({type: name, payload: newValue}) : dispatch({type: name, payload: maxValue})
    }

    return <div>
        <label htmlFor={name}>{name}</label>
        <br/>
        <input type="number" id={name} name={name} value={args[name] || ''} onChange={(event => handleChangeValue(event))} />
    </div>
}

export default InputArg