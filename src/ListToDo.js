import ItemToDo from './ItemToDo.js';

export default function ListToDo({ $app, initialState, doneCount }) {
  // state 및 this객체 설정
  this.state = initialState;
  this.doneCount = doneCount;

  this.setState = (nextState) => {
    this.state = nextState;

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
          itemToDo.setState(toDo);
        }, 1000);

        const itemToDo = setItemToDo(countDown, toDo);
      }
    });
  };

  const setItemToDo = (countDown, toDo) => {
    const itemToDo = new ItemToDo({
      $app,
      initialState: toDo,
      onClick: (toDo) => {
        setClickDone(countDown, toDo);
      },
    });

    return itemToDo;
  };

  const setClickDone = (countDown, toDo) => {
    clearInterval(countDown);
    toDo.isFinish = true;
    this.doneCount(toDo, false);
  };

  const setAutoDone = (countDown, toDo) => {
    clearInterval(countDown);
    toDo.isFinish = true;
    this.doneCount(toDo, true);
  };

  // render
  this.$target = document.createElement('div');
  this.$target.className = 'list-to-do';

  const leftTarget = $app.querySelector('.left-container');
  leftTarget.appendChild(this.$target);

  this.render = () => {
    this.$target.innerHTML = `
      <h2 class="list-to-do-title">할 일 목록</h2>
      <div class="button-container">
        <div class="sort-button-container">
          <button>입력한 순</button>
          <button>남은 시간 순</button>
        </div>
        <div class="done-button-container">
          <button>전체 종료</button>
          <button>선택 종료</button>
        </div>
      </div>
      <div class="list-to-do-container">
        <!-- item-to-do -->
      </div>
    `;
  };

  this.render();
}
