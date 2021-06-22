import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Home from "~pages/home"
import About from "~pages/about"

import Header from "~components/header"

import "./styles.scss"

export default function Pages() {
  return (
    <Router>
      <div className="page">
        <Header />
        <main className="page__content">
          <Switch>
            <Route
              exact
              path="/"
              component={Home}
            />
            <Route
              exact
              path="/about"
              component={About}
            />
          </Switch>
        </main>
      </div>
    </Router>
  )
}