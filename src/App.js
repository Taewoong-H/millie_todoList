import MakeToDo from './MakeToDo.js';
import ToDo from './ToDo.js';
import ListToDo from './ListToDo.js';
import DoneToDo from './DoneToDo.js';
import DonePopUp from './DonePopUp.js';

export default function App($app) {
  this.state = {
    idCount: 0,
    toDoItems: [],
    doneToDoItems: [],
    doneToDoItem: {},
    isPopUp: false,
    sortType: 'input',
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
    onClick: (toDoText, toDoTime) => {
      // ToDoItem Object
      this.state.idCount += 1;
      const toDoItem = new ToDo({
        id: this.state.idCount,
        text: toDoText,
        time: { origin: toDoTime, count: toDoTime },
        isCount: true,
        isFinish: false,
        isChecked: false,
        setRender: () => {
          listToDo.render();
        },
        doneCount: (toDo, isPopUp) => {
          const newToDoItems = this.state.toDoItems.filter((e) => e !== toDo);

          this.setState({
            ...this.state,
            toDoItems: [...newToDoItems],
            doneToDoItems: [...this.state.doneToDoItems, toDo],
            doneToDoItem: toDo,
            isPopUp: isPopUp ? true : false,
          });
        },
      });
      this.setState({
        ...this.state,
        toDoItems: [...this.state.toDoItems, toDoItem],
      });
    },
  });

  const listToDo = new ListToDo({
    $app,
    initialState: {
      toDoItems: this.state.toDoItems,
      sortType: this.state.sortType,
    },
    onClick: (toDos) => {
      const newToDoItems = this.state.toDoItems.filter((e) => !toDos.includes(e));

      this.setState({
        ...this.state,
        toDoItems: [...newToDoItems],
        doneToDoItems: [...this.state.doneToDoItems, ...toDos],
        isPopUp: false,
      });
    },
    onSortClick: (value) => {
      if (value === 'input') {
        this.state.sortType = 'input';
        this.state.toDoItems.sort((a, b) => {
          return a.id - b.id;
        });

        this.setState({
          ...this.state,
        });
      } else {
        this.state.sortType = 'time';
        this.state.toDoItems.sort((a, b) => {
          return a.time.count - b.time.count;
        });

        this.setState({
          ...this.state,
        });
      }
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
    onClick: () => {
      this.state.isPopUp = false;
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    makeToDo.setState(this.state.toDoItems);
    listToDo.setState({
      toDoItems: this.state.toDoItems,
      sortType: this.state.sortType,
    });
    doneToDo.setState(this.state.doneToDoItems);
    donePopUp.setState({
      doneToDoItem: this.state.doneToDoItem,
      isPopUp: this.state.isPopUp,
    });
  };
}
