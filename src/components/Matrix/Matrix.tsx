import React, {useCallback, useContext, useEffect, useMemo, useReducer, useState} from "react"
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
    const [cellPercent, setCellPercent] = useState<{[index: number]: number[]}>({})

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
        const state = cells.flat()
        const id = e.currentTarget.id
        const currentCell = state.find(cell => cell.id === +id)
        const indexCell = state.findIndex(cell => cell.id === +id)
        state.splice(indexCell, 1)

        if (currentCell) {
            state.sort((a, b) => Math.abs(a.amount - currentCell.amount) - Math.abs(b.amount - currentCell.amount))
            setAmountNearest(state.slice(0, closestCount))
        }
    }

    const handleCellPercent = (e: React.MouseEvent<HTMLTableDataCellElement>) => {

        const rowIndex = +e.currentTarget.id
        const sum = e.currentTarget.dataset.sum
        const currentRow = [...cells][rowIndex]

        const percentArr: number[] = []
        if (sum) {
            currentRow.forEach(cell => {
                const percent = +(cell.amount / +sum * 100).toFixed(2)
                percentArr.push(percent)
            })
        }

        setCellPercent({[rowIndex]: percentArr})
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
                        {row.map(({id, amount}, cellIndex) => <MatrixCell
                            key={"col" + id}
                            handleAmountNearest={handleAmountNearest}
                            dataCell={{id, amount}}
                            amountNearest={amountNearest.find(cell => cell.id === id) ? true : false }
                            cellPercent={cellPercent[rowIndex] ? cellPercent[rowIndex][cellIndex] : null}
                            dispatches={{
                                dispatchCells,
                                dispatchSumRow,
                                dispatchAveragesValue
                            }}/>)}
                        <td key={'sum' + rowIndex} id={rowIndex.toString()} data-sum={sumsRow[rowIndex]}
                            className="matrix__sum"
                            onMouseEnter={handleCellPercent}
                            onMouseLeave={() => setCellPercent({})}>
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