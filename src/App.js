import React from 'react';
import './App.css';

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      rows: 10,
      cols: 10,
      grid: [],
    };
  }

  componentDidMount() {
    const grid = [];
    for (let row = 0; row < this.state.rows; row++) {
      for (let col = 0; col < this.state.cols; col++) {
        grid.push({
          row,
          col,
          isFood: false,
        })
      }
    }
    this.setState({ grid: grid })
  }
  
  render () {
    const gridItems = this.state.grid.map((grid) => {
      return <div 
        key={grid.row.toString() + '-' + grid.col.toString()} 
        className="gridItem" ></div>
    })
    return (
      <div className="snake-container">
        <div className="grid">{gridItems}</div>
      </div>
    )
  }
}

export default App;
