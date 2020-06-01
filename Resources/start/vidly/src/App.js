import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import MovieForms from "./components/movieforms";
import NotFound from "./components/notfound";
import NavBar from "./components/navBar";
import Invoice from "./components/invoice";
import HomePage from "./components/home";
import InvoiceDetails from "./components/invoiceDetails";
import Rules from "./components/rules";
import BaseTransaction from "./components/baseTransactions";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container-fluid">
          <Switch>
            <Route path="/movies/:id" component={MovieForms} />
            <Route path="/home" component={HomePage} />
            <Route
              path="/invoiceDetails/:id"
              exact
              component={InvoiceDetails}
            />
            <Route path="/invoice" component={Invoice} />
            <Route path="/baseTransactions" component={BaseTransaction} />
            <Route path="/rules" component={Rules} />
            <Route path="/notfound" component={NotFound} />
            <Redirect from="/" exact to="/home" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
