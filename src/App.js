import MakeToDo from './MakeToDo.js';
import ListToDo from './ListToDo.js';
import DoneToDo from './DoneToDo.js';

export default function App($app) {
  this.state = {
    isCountDown: false,
    toDoItems: [],
    doneToDoItems: [],
  };

  const leftContainer = document.createElement('div');
  leftContainer.className = 'left-container';
  const rightContainer = document.createElement('div');
  rightContainer.className = 'right-container';
  $app.appendChild(leftContainer);
  $app.appendChild(rightContainer);

  const makeToDo = new MakeToDo({
    $app,
    initialState: this.state.toDoItems,
    onClick: (toDoItem) => {
      this.setState({
        toDoItems: [...this.state.toDoItems, toDoItem],
        doneToDoItems: [...this.state.toDoItems],
      });
      console.log(this.state);
    },
  });

  const listToDo = new ListToDo({
    $app,
    initialState: this.state.toDoItems,
  });

  const doneToDo = new DoneToDo({
    $app,
    initialState: this.state.doneToDoItems,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    makeToDo.setState(this.state.toDoItems);
    listToDo.setState(this.state.toDoItems);
  };

  // const init = () => {
  //   try {
  //     this.setState({
  //       ...this.state,
  //     });
  //     console.log('render');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // init();
}
