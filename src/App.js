import MakeToDo from './MakeToDo.js';
import ToDo from './ToDo.js';
import ListToDoHeader from './ListToDoHeader.js';
import ListToDo from './ListToDo.js';
import DoneToDo from './DoneToDo.js';
import DonePopUp from './DonePopUp.js';

export default function App($app) {
  // state
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

  // 할일 만들기 component
  new MakeToDo({
    $app,
    onClick: (toDoText, toDoTime) => {
      this.state.idCount += 1;
      // ToDoItem Object
      const toDoItem = new ToDo({
        id: this.state.idCount,
        text: toDoText,
        time: { origin: toDoTime, count: toDoTime },
        setRender: (toDo) => {
          const renderToDo = document.querySelector(`.to-do-${toDo.id}`);

          if (renderToDo) {
            toDo.render(renderToDo);
          }
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

  // 할일 목록 버튼 component
  const listToDoHeader = new ListToDoHeader({
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

  // 할일 목록 component
  const listToDo = new ListToDo({
    $app,
    initialState: this.state.toDoItems,
    onClick: (toDo) => {
      const newToDoItems = this.state.toDoItems.filter((e) => e !== toDo);

      this.setState({
        ...this.state,
        toDoItems: [...newToDoItems],
        doneToDoItems: [...this.state.doneToDoItems, toDo],
        isPopUp: false,
      });
    },
    onCheckClick: () => {
      this.setState({
        ...this.state,
      });
    },
  });

  // 완료 목록 component
  const doneToDo = new DoneToDo({
    $app,
    initialState: this.state.doneToDoItems,
  });

  // 완료 팝업 component
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
    listToDoHeader.setState({
      toDoItems: this.state.toDoItems,
      sortType: this.state.sortType,
    });
    listToDo.setState(this.state.toDoItems);
    doneToDo.setState(this.state.doneToDoItems);
    donePopUp.setState({
      doneToDoItem: this.state.doneToDoItem,
      isPopUp: this.state.isPopUp,
    });
  };
}
