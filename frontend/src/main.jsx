import {Provider} from "react-redux";
import App from './App.jsx'
import store from "./store.js";
import './index.css'
import ReactDOM from 'react-dom/client'
import "./index.css"
import {ThemeProvider} from "@material-tailwind/react";


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </Provider>
)
