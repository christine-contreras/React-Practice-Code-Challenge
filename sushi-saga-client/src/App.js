import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    sushiArray: [],
    eatenSushi: [],
    sushiIndex: 0,
    budget: 80
  }

  componentDidMount() {
    fetch(API)
    .then(response => response.json())
    .then(json => {
      this.setState({sushiArray: json})
    })
  }

  handleMoreSushi = () => {
    const newIndex = this.state.sushiIndex + 4
    let startOver = false

    if(newIndex >= this.state.sushiArray.length) {
      startOver = true
    }
    
    this.setState(previousState => {
      return {
        sushiIndex: startOver ? 0 : previousState.sushiIndex + 4
        
      }
    })
  }

  handleEatenSushi = (sushi) => {

    if(this.state.budget - sushi.price >= 0 ){
      this.setState(previousState => {
        return {
          eatenSushi: [...previousState.eatenSushi, sushi],
          budget: previousState.budget - sushi.price
        }
      })
    } else {
      alert("you don't have the budget for more sushi!")
    }

  }

  render() {
    const currentSushi = this.state.sushiArray.slice(this.state.sushiIndex, this.state.sushiIndex + 4)

    return (
      <div className="app">
        <SushiContainer
        sushis={currentSushi}
        eatenSushi={this.state.eatenSushi}
        handleMoreSushi={this.handleMoreSushi}
        handleEatenSushi={this.handleEatenSushi}
        />
        <Table
        budgetLeft={this.state.budget}
        eatenSushi={this.state.eatenSushi}/>
      </div>
    );
  }
}

export default App;