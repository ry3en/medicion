import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
//IMPORT COMPONENTS
import CONTROLLER from "./components/controller";
import HOME from "./components/home";
import ERROR from "./components/error";
import "./styles/index.css";

const router = createBrowserRouter([
    {
        path: '/',
        element:<HOME/> ,
        errorElement:<ERROR/>,

    },
    {
        path: '/controller',
        element:<CONTROLLER/> ,
        errorElement:<ERROR/>,

    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        <RouterProvider router={router}/>
    </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
