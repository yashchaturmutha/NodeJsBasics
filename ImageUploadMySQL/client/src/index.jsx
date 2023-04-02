import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App2';

import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <div>
    <ul >
        <li>
        <Link to="/upload">Images</Link>
        </li>
        <li>
        <Link to="/uploadVideo">Videos</Link>
        </li>
    </ul>

    <Routes>
            <Route exact path='/upload' element={< App />}></Route>
            <Route exact path='/uploadVideo' element={< App2 />}></Route>
    </Routes>
    </div>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
