import './App.css'
import InputArg from "../common/InputArg/InputArg"
import InputsAgrContextProvider from "./InputsAgrContext"
import Matrix from "../Matrix/Matrix";

function App() {

    return (
        <InputsAgrContextProvider>
            <div className="App">
                <div>
                    <InputArg minValue={0} maxValue={100} name="row"/>
                    <InputArg minValue={0} maxValue={100} name="column"/>
                    {/*<InputArg />*/}
                </div>

                <Matrix />
            </div>
        </InputsAgrContextProvider>
    )
}

export default App
