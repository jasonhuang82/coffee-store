import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style/global.scss";

// router
import ScrollToTop from "./components/ScrollToTop";

import Header from "./containers/Header";
import Home from "./containers/Home";
import Proportion from "./containers/Proportion";
import Complete from "./containers/Complete";
/*
<ul>
  <li>
    <Link to="/">Home</Link>
    <Link to="/proportion">persons</Link>
    <Link to="/complete">complete</Link>
  </li>
</ul>
*/
class App extends Component {
  
  render() {
    return (
      <Router basename="/">
        <ScrollToTop>
          <div className="App">
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/proportion" component={Proportion} />
              <Route path="/complete" component={Complete} />
            </Switch>
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
