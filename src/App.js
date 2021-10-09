import MakeToDo from './MakeToDo.js';
import ListToDo from './ListToDo.js';
import DoneToDo from './DoneToDo.js';

export default function App($app) {
  this.state = {
    toDoItems: [],
    doneToDoItems: [],
  };

  const leftContainer = document.createElement('div');
  const rightContainer = document.createElement('div');
  leftContainer.className = 'left-container';
  rightContainer.className = 'right-container';
  $app.appendChild(leftContainer);
  $app.appendChild(rightContainer);

  const makeToDo = new MakeToDo({
    $app,
    initialState: this.state.toDoItems,
    onClick: (toDoItem) => {
      this.setState({
        toDoItems: [...this.state.toDoItems, toDoItem],
        doneToDoItems: [...this.state.doneToDoItems],
      });
      console.log(this.state);
    },
  });

  const listToDo = new ListToDo({
    $app,
    initialState: this.state.toDoItems,
    doneCount: (toDo) => {
      // const deleteToDoItems = this.state.toDoItems.filter((item) => item.id !== toDo.id);
      this.setState({
        toDoItems: [...this.state.toDoItems],
        doneToDoItems: [...this.state.doneToDoItems, toDo],
      });
      console.log(this.state);
    },
  });

  const doneToDo = new DoneToDo({
    $app,
    initialState: this.state.doneToDoItems,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    makeToDo.setState(this.state.toDoItems);
    listToDo.setState(this.state.toDoItems);
    doneToDo.setState(this.state.doneToDoItems);
  };
}
