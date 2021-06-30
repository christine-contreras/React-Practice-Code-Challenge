import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    sushiArray: [],
    eatenSushi: [],
    sushiIndex: 0
  }

  componentDidMount() {
    fetch(API)
    .then(response => response.json())
    .then(json => {
      this.setState({sushiArray: json})
    })
  }

  handleMoreSushi = () => {
    this.setState(previousState => {
      return {
        sushiIndex: previousState.sushiIndex + 4
      }
    })
  }

  render() {
    const currentSushi = this.state.sushiArray.slice(this.state.sushiIndex, this.state.sushiIndex + 4)

    return (
      <div className="app">
        <SushiContainer sushis={currentSushi} handleMoreSushi={this.handleMoreSushi}/>
        <Table />
      </div>
    );
  }
}

export default App;