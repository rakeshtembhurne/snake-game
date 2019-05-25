import React from 'react';
import './App.css';

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      rows: 10,
      cols: 10,
      grid: [],
      food: {row: 5, col: 4}
    };
  }

  getRandomGrid() {
    return {
      row: Math.floor((Math.random() * 10) + 1),
      col: Math.floor((Math.random() * 10) + 1)
    }
  }

  componentDidMount() {
    // Food 
    const food = this.getRandomGrid();
    
    // Grid System
    const grid = [];
    
    for (let row = 0; row < this.state.rows; row++) {
      for (let col = 0; col < this.state.cols; col++) {
        const isFood = (food.row === row && food.col === col);
        grid.push({
          row,
          col,
          isFood,
        })
      }
    }
    this.setState({ grid: grid })

  }
  
  render () {
    const gridItems = this.state.grid.map((grid) => {
      return <div 
        key={grid.row.toString() + '-' + grid.col.toString()} 
        className={grid.isFood ? 'gridItem is-food' : 'gridItem'} ></div>
    })
    return (
      <div className="snake-container">
        <div className="grid">{gridItems}</div>
      </div>
    )
  }
}

export default App;
