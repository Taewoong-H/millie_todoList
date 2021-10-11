export default function ListToDoHeader({ $app, initialState, onClick, onSortClick }) {
  // state 및 this객체 설정
  this.state = initialState;
  this.onClick = onClick;
  this.onSortClick = onSortClick;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  // render
  this.$target = document.createElement('div');
  this.$target.className = 'list-to-do-header';

  const leftTarget = $app.querySelector('.left-container');
  leftTarget.appendChild(this.$target);

  this.render = () => {
    const selectedToDo = this.state.toDoItems.filter((toDo) => toDo.isChecked);
    this.$target.innerHTML = `
      <h2 class="list-to-do-title">할 일 목록</h2>
      <div class="button-container">
        <div class="sort-button-container">
          <button class="input-sort-button ${this.state.sortType === 'input' ? 'active' : ''}">입력한 순</button>
          <button class="time-sort-button ${this.state.sortType === 'time' ? 'active' : ''}">남은 시간 순</button>
        </div>
        <div class="done-button-container">
          <button class="all-done-to-do-button">전체 종료</button>
          <button class="select-done-to-do-button" ${selectedToDo.length > 0 ? '' : 'disabled'}>선택 종료</button>
        </div>
      </div>
    `;
  };

  // event handler
  this.$target.addEventListener('click', (e) => {
    const $inputSortButton = e.target.closest('.input-sort-button');
    const $timeSortButton = e.target.closest('.time-sort-button');
    const $allButton = e.target.closest('.all-done-to-do-button');
    const $selectButton = e.target.closest('.select-done-to-do-button');

    if ($inputSortButton) {
      this.onSortClick('input');
    }

    if ($timeSortButton) {
      this.onSortClick('time');
    }

    if ($allButton) {
      this.state.toDoItems.forEach((toDo) => {
        toDo.isCount = false;
        toDo.isFinish = true;
      });
      this.onClick(this.state.toDoItems);
    }

    if ($selectButton) {
      const checkedToDoItems = this.state.toDoItems.filter((toDo) => toDo.isChecked);
      checkedToDoItems.forEach((toDo) => {
        toDo.isCount = false;
        toDo.isFinish = true;
      });
      this.onClick(checkedToDoItems);
    }
  });

  this.render();
}
