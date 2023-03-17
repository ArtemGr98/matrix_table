import React, {useContext, useEffect, useReducer, useState} from "react"
import {InputsAgrContext} from "../App/InputsAgrContext"
import MatrixCell from "./MatrixCell"
import './Matrix.scss'

import {sumRowInitState, sumRowReducer} from "./reducers/sumRowReducer"
import {generateCellData} from "./utils"
import {ADD_ROW, CellArrT, cellsInitState, cellsReducer, DELETE_ROW} from "./reducers/cellsReducer"
import {averageInitState, averageValReducer} from "./reducers/averageValReducer"
import InputArg from "../InputArg/InputArg"

const Matrix = () => {
    const [{columnCount, rowCount, closestValuesCount}] = useContext(InputsAgrContext)

    const [cells, dispatchCells] = useReducer(cellsReducer, cellsInitState)
    const [sumsRow, dispatchSumRow] = useReducer(sumRowReducer, sumRowInitState)
    const [averagesValue, dispatchAveragesValue] = useReducer(averageValReducer, averageInitState)

    const [closestValues, setClosestValues] = useState<CellArrT>([])
    const [cellPercent, setCellPercent] = useState<{ [index: number]: number[] }>({})
    const [showPercent, setShowPercent] = useState<number | null>(null)

    useEffect(() => {
        generateCellData(columnCount, rowCount, {dispatchCells, dispatchSumRow, dispatchAveragesValue})
        setCellPercent({})
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

    const handleSetClosestValues = (e: React.MouseEvent<HTMLTableDataCellElement>, closestValuesCount: number) => {
        const state = cells.flat()
        const id = e.currentTarget.id
        const currentCell = state.find(cell => cell.id === +id)
        const indexCell = state.findIndex(cell => cell.id === +id)
        state.splice(indexCell, 1)

        if (currentCell) {
            state.sort((a, b) => Math.abs(a.amount - currentCell.amount) - Math.abs(b.amount - currentCell.amount))
            setClosestValues(state.slice(0, closestValuesCount))
        }
    }

    const handleSetCellPercent = (e: React.MouseEvent<HTMLTableDataCellElement>) => {
        const id = +e.currentTarget.id

        if (!cellPercent[id]) {
            const rowIndex = e.currentTarget.dataset.rowIndex
            const sum = e.currentTarget.dataset.sum

            const percentArr: number[] = []
            if (sum && rowIndex) {
                const currentRow = [...cells][+rowIndex]
                currentRow.forEach(cell => {
                    const percent = +(cell.amount / +sum * 100).toFixed(2)
                    percentArr.push(percent)
                })

                setCellPercent({...cellPercent, [id]: percentArr})
            }
        }
        setShowPercent(id)
    }

    return (
        <>
            <InputArg minValue={0} maxValue={columnCount * rowCount} name="closestValuesCount"/>
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
                    {cells.map((row, rowIndex) => <tr key={'row' + row[0].id} onMouseLeave={() => setClosestValues([])}>
                        <th>row {rowIndex}</th>
                        {row.map(({id, amount}, cellIndex) => <MatrixCell
                            key={"cell" + id}
                            handleAmountNearest={handleSetClosestValues}
                            dataCell={{id, amount}}
                            closestValuesCount={closestValuesCount}
                            amountNearest={!!closestValues.find(cell => cell.id === id)}
                            cellPercent={showPercent === row[0].id ? cellPercent[row[0].id][cellIndex] : null}
                            dispatches={{
                                dispatchCells,
                                dispatchSumRow,
                                dispatchAveragesValue
                            }}/>)}
                        <td key={'sum' + row[0].id}
                            className="matrix__sum">
                            <div id={row[0].id.toString()} data-row-index={rowIndex} data-sum={sumsRow[row[0].id]}
                                 style={{width: "100%"}}
                                 onMouseEnter={handleSetCellPercent}
                                 onMouseLeave={() => setShowPercent(null)}>
                                {sumsRow[row[0].id]}
                            </div>

                            <button onClick={() => handleDeleteRow(rowIndex)}>
                                x
                            </button>
                        </td>

                    </tr>)}
                    <tr>
                        <th>Average values</th>
                        {Object.entries(averagesValue).map(([key, value]) => <td key={"average" + key}>
                            {value}
                        </td>)}
                        <th style={{padding: "0"}}>
                            <button
                                style={{width: "100%", height: "100%", border: "none", cursor: "pointer"}}
                                disabled={!(rowCount && columnCount) || cells.length === 100}
                                    onClick={handleAddRow}>
                              ADD ROW
                            </button>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Matrix