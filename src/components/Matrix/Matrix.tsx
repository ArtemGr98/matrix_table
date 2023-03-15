import {useContext, useEffect, useReducer} from "react"
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
                    <thead>
                    <tr>
                        <th></th>
                        {Array.from({length: columnCount}, (_, i) => i).map(item =>
                            <th key={"col" + item}>col {item}</th>)
                        }
                        <th>sum</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cells.map((row, rowIndex) => <tr key={'row' + rowIndex}>
                        <th>row {rowIndex}</th>
                        {row.map(({id, amount}) => <MatrixCell key={"col" + id}
                            dataCell={{id, amount}}
                            dispatches={{dispatchCells, dispatchSumRow, dispatchAveragesValue}}/>)}
                        <td key={'sum' + rowIndex}>
                            {sumsRow[rowIndex]}
                        </td>
                        <button onClick={() => handleDeleteRow(rowIndex)}>
                            x
                        </button>
                    </tr>)}
                    <tr>
                        <th>Average values</th>
                        {Object.entries(averagesValue).map(([key, value], index) => <td key={"average" + index}>
                            {value}
                        </td>)}
                        <th></th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <button disabled={!(rowCount && columnCount) || cells.length === 100} onClick={handleAddRow}>
                add row
            </button>
        </>
    )
}

export default Matrix