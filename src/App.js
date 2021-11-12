import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Style \\
import "./App.scss";

// Components \\
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages \\
import Home from "./pages/Home/Home";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
import FourZeroFour from "./pages/FourZeroFour/FourZeroFour";

// JSX \\
const App = () => {
  return (
    <Router>
      <Fragment>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/trending" component={Trending} exact />
          <Route path="/movies" component={Movies} exact />
          <Route path="/series" component={Series} exact />
          <Route path="/search" component={Search} exact />
          <Route path="/*" component={FourZeroFour} />
        </Switch>
        <Footer />
      </Fragment>
    </Router>
  );
};

export default App;
