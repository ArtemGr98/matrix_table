import './App.css'
import InputArg from "../InputArg/InputArg"
import InputsAgrContextProvider from "./InputsAgrContext"
import Matrix from "../Matrix/Matrix";

function App() {

    return (
        <InputsAgrContextProvider>
            <div className="App">
                <div style={{display: "flex"}}>
                    <InputArg minValue={0} maxValue={100} name="rowCount"/>
                    <InputArg minValue={0} maxValue={100} name="columnCount"/>

                </div>
                <Matrix />
            </div>
        </InputsAgrContextProvider>
    )
}

export default App
