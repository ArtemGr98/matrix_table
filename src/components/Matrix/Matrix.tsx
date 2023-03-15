import {useContext, useEffect, useReducer} from "react"
import {InputsAgrContext} from "../App/InputsAgrContext"
import MatrixCell from "./MatrixCell"
import './Matrix.scss'

import {sumRowInitState, sumRowReducer} from "./reducers/sumRowReducer"
import {generateCellData} from "./utils"
import {ADD_ROW, cellsInitState, cellsReducer, DELETE_ROW} from "./reducers/cellsReducer"
import {averageInitState, averageValReducer} from "./reducers/averageValReducer";

const Matrix = () => {
    const [{columnCount, rowCount, closestValues}, dispatchInputsArg] = useContext(InputsAgrContext)

    const [cells, dispatchCells] = useReducer(cellsReducer, cellsInitState)
    const [sumsRow, dispatchSumRow] = useReducer(sumRowReducer, sumRowInitState)
    const [averagesValue, dispatchAveragesValue] = useReducer(averageValReducer, averageInitState)

    useEffect(() => {
        generateCellData(columnCount, rowCount, {dispatchCells, dispatchSumRow: dispatchSumRow, dispatchAveragesValue})
    }, [columnCount, rowCount])

    // useEffect(() => {
    //     dispatchSumRows({type: "SUM_ROWS", payload: {cells}})
    // }, [cells])


    return (
        <div className="matrix">
            <table>
                <tbody>
                {cells.map((row, rowIndex) => <tr className="matrix__column" key={'row' + rowIndex}>
                    {row.map(({id, amount}, index) => {
                        return index !== columnCount - 1 ?
                            <td key={'col' + id}>
                                <MatrixCell
                                    dataCell={{id, amount}}
                                    dispatches={{dispatchCells, dispatchSumRow, dispatchAveragesValue}}/>
                            </td> :
                            <td key={'col' + id} style={{display: "flex"}}>
                                <MatrixCell
                                    key={'col' + id} dataCell={{id, amount}}
                                    dispatches={{dispatchCells, dispatchSumRow, dispatchAveragesValue}}/>
                                <input type="number" className="matrix__cell" readOnly value={sumsRow[rowIndex]}/>
                                <button onClick={() => dispatchCells(
                                    {
                                        type: DELETE_ROW,
                                        payload: {
                                            rowIndex,
                                            dispatches: {dispatchAveragesValue}
                                        }
                                    })}>x
                                </button>
                            </td>
                    })}
                </tr>)}
                <tr style={{textAlign: "start"}}>
                    {Object.entries(averagesValue).map(([key, value], index) => <td key={"average" + index}>
                        <input type="number"
                               className="matrix__cell"
                               readOnly value={value}/>
                    </td>)}
                </tr>
                </tbody>
            </table>
            <button disabled={!(rowCount && columnCount)} onClick={() =>
                dispatchCells({
                    type: ADD_ROW,
                    payload: {
                        columnCount: columnCount,
                        dispatches: {
                            dispatchSumRow,
                            dispatchAveragesValue
                        }
                    }
                })}>add row
            </button>

        </div>
    )
}

export default Matrix