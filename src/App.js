import MakeToDo from './MakeToDo.js';
import ListToDo from './ListToDo.js';
import DoneToDo from './DoneToDo.js';
import DonePopUp from './DonePopUp.js';

export default function App($app) {
  this.state = {
    toDoItems: [],
    doneToDoItems: [],
    doneToDoItem: {},
    isPopUp: false,
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
        doneToDoItem: {},
        isPopUp: false,
      });
    },
  });

  const listToDo = new ListToDo({
    $app,
    initialState: this.state.toDoItems,
    doneCount: (toDo, isPopUp) => {
      this.setState({
        toDoItems: [...this.state.toDoItems],
        doneToDoItems: [...this.state.doneToDoItems, toDo],
        doneToDoItem: toDo,
        isPopUp: isPopUp ? true : false,
      });
    },
  });

  const doneToDo = new DoneToDo({
    $app,
    initialState: this.state.doneToDoItems,
  });

  const donePopUp = new DonePopUp({
    $app,
    initialState: {
      doneToDoItem: this.state.doneToDoItem,
      isPopUp: this.state.isPopUp,
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    makeToDo.setState(this.state.toDoItems);
    listToDo.setState(this.state.toDoItems);
    doneToDo.setState(this.state.doneToDoItems);
    donePopUp.setState({
      doneToDoItem: this.state.doneToDoItem,
      isPopUp: this.state.isPopUp,
    });
  };
}
