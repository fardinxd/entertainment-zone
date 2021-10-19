import React, { Fragment } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
import FourZeroFour from "./pages/FourZeroFour/FourZeroFour";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/trending" component={Trending} />
          <Route path="/movies" component={Movies} />
          <Route path="/series" component={Series} />
          <Route path="/search" component={Search} />
          <Route path="/*" component={FourZeroFour} />
        </Switch>
        <Footer />
      </Fragment>
    </Router>
  );
};

export default App;
