import React from "react";
import { Route, Switch } from 'react-router-dom';
import HomeScreen from "./HomeScreen/HomeScreen";
import Map from "./Map/Map";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route exact path="/map">
          <Map/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
