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
    currentDirection: 'right',
  };

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

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
          const { row, col } = state.snake.head;
          return {
            ...state,
            snake: {
              head: {
                row: row,
                col: col + 1,
              },
            }
          }
        });
        break;

      case 'left':
        this.setState((state) => {
          const { row, col } = state.snake.head;
          return {
            ...state,
            snake: {
              head: {
                row: row,
                col: col - 1,
              },
            }
          }
        });
        break;

        case 'up':
          this.setState((state) => {
            const { row, col } = state.snake.head;
            return {
              ...state,
              snake: {
                head: {
                  row: row - 1,
                  col: col,
                },
              }
            }
          });
          break;

        case 'down':
          this.setState((state) => {
            const { row, col } = state.snake.head;
            return {
              ...state,
              snake: {
                head: {
                  row: row + 1,
                  col: col,
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

  handleKeyPress(e) {
    let { currentDirection } = this.state;

    switch (e.keyCode) {
      case 37:
        currentDirection = 'left';
        break;

      case 38:
          currentDirection = 'up';
        break;

      case 39:
          currentDirection = 'right';
        break;

      case 40:
          currentDirection = 'down';
        break;

      default:
        break;
    }

    this.resetGrid();

    this.setState(state => {
      return {
        ...state,
        currentDirection
      }
    })
  }

  componentDidMount() {

    document.body.addEventListener('keydown', this.handleKeyPress);

    this.setState({
      food: this.getRandomGrid(),
      snake: {
        head: this.getCenterOfGrid()
      }
    });

    this.resetGrid();

    // Set tick
    window.fnInterval = setInterval(() => {
      this.gameTick();
    }, this.state.tickTime);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyPress);
    clearInterval(window.fnInterval);
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
