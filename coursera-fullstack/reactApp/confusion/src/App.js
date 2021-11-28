import './App.css';
import {DISHES} from "./shared/dishes";
import { Component } from 'react';
import Main from "./components/MainComponent";

class App extends Component{

  render(){
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
