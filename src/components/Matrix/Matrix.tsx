import {memo, useContext, useEffect, useReducer} from "react"
import {InputsAgrContext} from "../App/InputsAgrContext"
import MatrixCell from "./MatrixCell"
import './Matrix.scss'

import {sumRowInitState, sumRowReducer} from "./reducers/sumRowReducer"
import {generateCellData} from "./utils"
import {ADD_ROW, cellsInitState, cellsReducer, DELETE_ROW} from "./reducers/cellsReducer"
import {averageInitState, averageValReducer} from "./reducers/averageValReducer"

const Matrix = () => {
    const [{columnCount, rowCount, closestValues}, dispatchInputsArg] = useContext(InputsAgrContext)

    const [cells, dispatchCells] = useReducer(cellsReducer, cellsInitState)
    const [sumsRow, dispatchSumRow] = useReducer(sumRowReducer, sumRowInitState)
    const [averagesValue, dispatchAveragesValue] = useReducer(averageValReducer, averageInitState)

    useEffect(() => {
        generateCellData(columnCount, rowCount, {dispatchCells, dispatchSumRow, dispatchAveragesValue})
    }, [columnCount, rowCount])

    const handleAddRow = () => {
        dispatchCells({
            type: ADD_ROW,
            payload: {
                columnCount,
                rowCount,
                dispatches: {dispatchSumRow, dispatchAveragesValue}
            }
        })
    }

    const handleDeleteRow = (rowIndex: number) => {
        dispatchCells({
            type: DELETE_ROW,
            payload: {
                rowIndex,
                rowCount,
                dispatches: {dispatchAveragesValue}
            }
        })
    }

    return (
        <>
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
                                    <button onClick={() => handleDeleteRow(rowIndex)}>x
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
            </div>
            <button disabled={!(rowCount && columnCount)} onClick={handleAddRow}>
                add row
            </button>
        </>
    )
}

export default memo(Matrix)