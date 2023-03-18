import React, {ChangeEvent, useContext} from 'react';
import Arg from "./Arg";
import {ArgT} from "./reducerInputsArgs";
import {InputsArgsContext} from "./InputsArgsContext";

const InputsArgs = () => {
    const [{columnCount, rowCount, closestValuesCount}, dispatch] = useContext(InputsArgsContext)

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>, maxValue: number, name: ArgT) => {
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
    }

    return (
        <div style={{display: "flex"}}>
            <Arg maxValue={100} name="rowCount" value={rowCount} handleChangeValue={handleChangeValue}/>
            <Arg maxValue={100} name="columnCount" value={columnCount} handleChangeValue={handleChangeValue}/>
            <Arg maxValue={columnCount * rowCount} value={closestValuesCount} name="closestValuesCount" handleChangeValue={handleChangeValue}/>
        </div>
    );
};

export default InputsArgs