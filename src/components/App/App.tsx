import './App.css'
import InputsAgrContextProvider from "./InputsAgrContext"
import Matrix from "../Matrix/Matrix";

function App() {

    return (
        <InputsAgrContextProvider>
            <div className="App">
                <Matrix />
            </div>
        </InputsAgrContextProvider>
    )
}

export default App
