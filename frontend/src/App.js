import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from 'react'

import Header from "./header/Header";
import Articles from "./articles/Articles";
import Article from "./article/Article";
import About from "./info/About";
import Contact from "./info/Contact";
import Login from "./authentification/Login";
import Signup from "./authentification/Signup";
import Index from "./info/Index";

function App() {
    return (
    <div>
        <Router>
            <Header/>
            <Switch>
                <Route path='/' component={Index} exact/>
                <Route path='/login' component={Login}/>
                <Route path='/signup' component={Signup}/>
                <Route path='/about' component={About}/>
                <Route path='/contact' component={Contact}/>
                <Route path='/articles' component={Articles} exact/>
                <Route path='/articles/:id' component={Article}/>
                {/*<Router>*/}
                {/*    <Article path='/articles/:id' />*/}
                {/*</Router>*/}

            </Switch>
        </Router>
    </div>);
}

export default App;
