import React from 'react';
import './App.css';

// const log = data => console.log(JSON.stringify(data, null, 2));

class App extends React.Component {

  state = {
    tickTime: 2000,
    rows: 10,
    cols: 10,
    grid: [],
    food: {},
    snake: {
      head: {},
    },
    currentDirection: 'right'
  };
  
  getRandomGrid() {
    return {
      row: Math.floor((Math.random() * 10) + 1),
      col: Math.floor((Math.random() * 10) + 1)
    }
  }

  // TODO: snake and food begins at the center
  getCenterOfGrid() {
    return {
      row: Math.floor((this.state.rows - 1) / 2),
      col: Math.floor((this.state.cols - 1) / 2),
    }
  }

  resetGrid() {
    const grid = [];
    const { rows, cols, food, snake } = this.state;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isFood = (food.row === row && food.col === col);
        const isHead = (snake.head.row === row && snake.head.col === col);
        grid.push({
          row,
          col,
          isFood,
          isHead,
        })
      }
    }

    this.setState({ grid })
  }

  gameTick() {
    const { currentDirection } = this.state;
    
    // Snake keeps moving
    switch (currentDirection) {
      case 'right':
        this.setState((state) => {
          return {
            snake: {
              head: {
                row: state.snake.head.row,
                col: state.snake.head.col + 1,
              },
            }
          }
        });
        break;

      default:
        break;
    }
    this.resetGrid();
  }

  componentDidMount() {
    // Food 
    this.setState({ food: this.getRandomGrid() });

    this.setState({
      snake: {
        head: this.getCenterOfGrid()
      }
    });
    
    this.gameTick();

    setInterval(() => {
      this.gameTick();
    }, this.state.tickTime);
  }
  
  render () {
    const gridItems = this.state.grid.map((grid) => {
      return <div 
        key={grid.row.toString() + '-' + grid.col.toString()} 
        className={
          grid.isHead ? 'gridItem is-head' : grid.isFood ? 'gridItem is-food' : 'gridItem'
        }
      ></div>
    })
    return (
      <div className="snake-container">
        <div className="grid">{gridItems}</div>
      </div>
    )
  }
}

export default App;
