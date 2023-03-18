import './App.css'

import Matrix from "../Matrix/Matrix";
import InputsArgs from "../InputsArgs/InputsArgs";
import InputsArgsContextProvider from "../InputsArgs/InputsArgsContext";

function App() {

    return (
        <InputsArgsContextProvider>
            <div className="App">
                <InputsArgs />
                <Matrix />
            </div>
        </ InputsArgsContextProvider>
    )
}

export default App
