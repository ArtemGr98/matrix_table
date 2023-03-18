import {ChangeEvent, FC} from "react"
import './InputsArgs.scss'
import {ArgT} from "../Matrix/reducers/reducerInputsArgs";

type InputArgPropsT = {
    maxValue: number,
    name: ArgT,
    value: number
    handleChangeValue: (event: ChangeEvent<HTMLInputElement>, maxValue: number, name: ArgT) => void,
}

const Arg: FC<InputArgPropsT> = ({maxValue, name, handleChangeValue, value}) => {
    return <div>
        <label htmlFor={name}>{name}</label>
        <br/>
        <input type="number" id={name} name={name} value={value || ""} onChange={(event => handleChangeValue(event, maxValue, name))} />
    </div>
}

export default Arg