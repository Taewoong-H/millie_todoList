import ItemToDo from './ItemToDo.js';
import ListToDoHeader from './ListToDoHeader.js';

export default function ListToDo({ $app, initialState, doneCount, onClick }) {
  // state 및 this객체 설정
  this.state = initialState;
  this.doneCount = doneCount;
  this.onClick = onClick;
  this.selectedToDo = [];

  this.setState = (nextState) => {
    this.state = nextState;

    listToDoHeader.setState({
      toDoItems: nextState,
      selectedToDo: this.selectedToDo,
    });
    setCountDown();
  };

  // methods
  const setCountDown = () => {
    this.state.map((toDo) => {
      if (!toDo.isCount) {
        toDo.isCount = true;

        const countDown = setInterval(() => {
          toDo.time.count--;
          // 시간이 0이 될 시 종료
          if (toDo.time.count < 0) {
            setAutoDone(countDown, toDo);
          }
          // count가 종료 될 시 함수 종료
          if (!toDo.isCount) {
            clearInterval(countDown);
          }
          itemToDo.setState(toDo);
        }, 1000);

        const itemToDo = setItemToDo(countDown, toDo);
      }
    });
  };

  const setItemToDo = (countDown, toDo) => {
    const itemToDo = new ItemToDo({
      $app: this.$target,
      initialState: toDo,
      onClick: (toDo) => {
        setClickDone(countDown, toDo);
      },
      onCheck: (toDo, isChecked) => {
        if (isChecked) {
          this.selectedToDo.push(toDo);
        } else {
          this.selectedToDo = this.selectedToDo.filter((selected) => selected !== toDo);
        }
        listToDoHeader.setState({
          toDoItems: this.state,
          selectedToDo: this.selectedToDo,
        });
      },
    });

    return itemToDo;
  };

  const setClickDone = (countDown, toDo) => {
    clearInterval(countDown);
    toDo.isFinish = true;
    toDo.isCount = false;
    this.doneCount(toDo, false);
  };

  const setAutoDone = (countDown, toDo) => {
    clearInterval(countDown);
    toDo.isFinish = true;
    toDo.isCount = false;
    this.doneCount(toDo, true);
  };

  // render
  const listToDoHeader = new ListToDoHeader({
    $app,
    initialState: {
      toDoItems: this.state,
      selectedToDo: this.selectedToDo,
    },
    onClick: (toDos) => {
      this.onClick(toDos);
      this.selectedToDo = [];
    },
  });

  this.$target = document.createElement('div');
  this.$target.className = 'list-to-do-container';

  const leftTarget = $app.querySelector('.left-container');
  leftTarget.appendChild(this.$target);

  // this.render = () => {
  //   this.$target.innerHTML = `
  //     <div class="list-to-do-container">
  //       <!-- item-to-do -->
  //     </div>
  //   `;
  // };

  // this.render();
}
