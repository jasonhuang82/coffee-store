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

// 
import Header from "./containers/Header";
import Home from "./containers/Home";
import Proportion from "./containers/Proportion";
import Complete from "./containers/Complete";

class App extends Component {
  baseName = (() => {
    if (process.env.NODE_ENV === 'development') return  '/';
    if (process.env.NODE_ENV === 'production') return '/coffee-store';
    
  })()
  componentDidMount() {
    // console.log('process.env', process.env.NODE_ENV);
  }
  render() {
    return (
      <Router basename={this.baseName}>
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
