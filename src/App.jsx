import React from 'react'

import { BrowserRouter, Route, Switch } from "react-router-dom"
import Header from "./components/Header";
import './App.css'


import GameConsole from "./pages/GameConsolePage";
import HomePage from './pages/HomePage';
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/game" component={GameConsole}/>
          <Route path="/" component={HomePage} exact/>
          <Route path="/*" component={ErrorPage} exact/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
