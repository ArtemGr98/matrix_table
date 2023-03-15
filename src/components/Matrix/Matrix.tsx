import React, {ChangeEvent, useContext, useEffect, useReducer, useState} from "react"
import {InputsAgrContext} from "../App/InputsAgrContext"
import MatrixCell from "./MatrixCell"
import './Matrix.scss'

import {sumRowInitState, sumRowReducer} from "./reducers/sumRowReducer"
import {generateCellData} from "./utils"
import {ADD_ROW, CellArrT, cellsInitState, cellsReducer, DELETE_ROW} from "./reducers/cellsReducer"
import {averageInitState, averageValReducer} from "./reducers/averageValReducer"
import InputArg from "../common/InputArg/InputArg";

const Matrix = () => {
    const [{columnCount, rowCount, closestCount}, dispatchInputsArg] = useContext(InputsAgrContext)

    const [cells, dispatchCells] = useReducer(cellsReducer, cellsInitState)
    const [sumsRow, dispatchSumRow] = useReducer(sumRowReducer, sumRowInitState)
    const [averagesValue, dispatchAveragesValue] = useReducer(averageValReducer, averageInitState)
    const [amountNearest, setAmountNearest] = useState<CellArrT>([])

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

    const handleAmountNearest = (e: React.MouseEvent<HTMLTableDataCellElement>) => {
        const id = e.currentTarget.id
        const currentCell = cells.find(row => row.find(cell => cell.id === +id))?.find(cell => cell.id === +id)
        const state = cells.flat()

        if (currentCell) {
            state.sort((a, b) => Math.abs(a.amount - currentCell.amount) - Math.abs(b.amount - currentCell.amount))
            setAmountNearest(state.slice(0, closestCount + 1))
        }
    }

    return (
        <>
            <InputArg minValue={0} maxValue={columnCount * rowCount} name="closestCount"/>
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
                    {cells.map((row, rowIndex) => <tr key={'row' + rowIndex} onMouseLeave={() => setAmountNearest([])}>
                        <th>row {rowIndex}</th>
                        {row.map(({id, amount}) => <MatrixCell
                            key={"col" + id}
                            handleAmountNearest={handleAmountNearest}
                            dataCell={{id, amount}}
                            amountNearest={amountNearest}
                            dispatches={{
                                dispatchCells,
                                dispatchSumRow,
                                dispatchAveragesValue
                            }}/>)}
                        <td key={'sum' + rowIndex}>
                            <span>
                                {sumsRow[rowIndex]}
                            </span>

                            <button onClick={() => handleDeleteRow(rowIndex)}>
                                x
                            </button>
                        </td>

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