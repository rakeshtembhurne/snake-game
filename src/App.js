import React from 'react';
import './App.css';

// eslint-disable-next-line
const log = data => console.log(JSON.stringify(data, null, 2));
// eslint-disable-next-line
const lg = data => console.log(JSON.stringify(data));

class App extends React.Component {

  state = {
    tickTime: 1000,
    rows: 10,
    cols: 10,
    grid: [],
    food: {},
    snake: {
      head: {},
      tail: [],
    },
    currentDirection: 'right',
  };

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  getRandomGrid() {
    return {
      row: Math.floor((Math.random() * 10)),
      col: Math.floor((Math.random() * 10))
    }
  }

  // TODO: snake and food begins at the center
  getCenterOfGrid() {
    return {
      row: Math.floor((this.state.rows - 1) / 2),
      col: Math.floor((this.state.cols - 1) / 2),
    }
  }

  resetGrid(state = {}, sendBack = false) {

    if (!Object.keys(state).length) {
      state = this.state;
    }

    const grid = [];
    const { rows, cols, food, snake } = state;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isFood = (food.row === row && food.col === col);
        const isHead = (snake.head.row === row && snake.head.col === col);
        let isTail = false;
        snake.tail.forEach(t => {
          if (t.row === row && t.col === col) {
            isTail = true;
          }
        })

        grid.push({
          row,
          col,
          isFood,
          isHead,
          isTail,
        })
      }
    }

    if (sendBack) {
      return grid;
    } else {
      this.setState({ grid })
    }
  }

  gameTick() {

    this.setState((state) => {
      let { currentDirection, snake, food } = state;
      let { tail } = snake;

      // Snake moves head
      const { row, col } = state.snake.head;
      let head = { row, col };

      // Snake eats
      tail.unshift({
        row: head.row,
        col: head.col,
      })

      // Snake does potty, only when not eating
      if (head.row === state.food.row && head.col === state.food.col) {
        food = this.getRandomGrid();
        lg({newFood: food})
      } else {
        tail.pop();
      }

      switch (currentDirection) {
        case 'left':
          head.col--;
          break;

        case 'up':
          head.row--;
          break;

        case 'down':
          head.row++;
          break;

        case 'right':
        default:
          head.col++;
          break;
      }

      const newState = {
        ...state,
        food,
        snake: {
          head,
          tail
        }
      }
      const grid = this.resetGrid(newState, true);

      return {
        ...newState,
        grid
      }
    });

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

    const newState = {
      ...this.state,
      currentDirection,
    }
    const grid = this.resetGrid(newState, true);


    this.setState(state => {
      return {
        ...newState,
        grid
      }
    })
  }

  componentDidMount() {

    document.body.addEventListener('keydown', this.handleKeyPress);

    this.setState((state) => {
      const newState = {
        ...state,
        food: this.getRandomGrid(),
        snake: {
          head: this.getCenterOfGrid(),
          tail: state.snake.tail
        }
      };
      const grid = this.resetGrid(newState, true);
      return {
        ...newState,
        grid,
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
          grid.isHead
          ? 'gridItem is-head' : grid.isTail
          ? 'gridItem is-tail' : grid.isFood
          ? 'gridItem is-food' : 'gridItem'
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
