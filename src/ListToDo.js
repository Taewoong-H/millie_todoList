import ItemToDo from './ItemToDo.js';

export default function ListToDo({ $app, initialState, doneCount, onClick }) {
  // state 및 this객체 설정
  this.state = initialState;
  this.doneCount = doneCount;
  this.onClick = onClick;
  this.selectedToDo = [];

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
      $app,
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
          <button class="all-done-to-do-button">전체 종료</button>
          <button class="select-done-to-do-button">선택 종료</button>
        </div>
      </div>
      <div class="list-to-do-container">
        <!-- item-to-do -->
      </div>
    `;
  };

  // event handler
  this.$target.addEventListener('click', (e) => {
    const $allButton = e.target.closest('.all-done-to-do-button');
    const $selectButton = e.target.closest('.select-done-to-do-button');

    if ($allButton) {
      this.state.forEach((toDo) => {
        toDo.isFinish = true;
        toDo.isCount = false;
      });
      this.onClick(this.state);
    }

    if ($selectButton) {
      this.selectedToDo.forEach((toDo) => {
        toDo.isFinish = true;
        toDo.isCount = false;
      });
      this.onClick(this.selectedToDo);
    }
  });

  this.render();
}
