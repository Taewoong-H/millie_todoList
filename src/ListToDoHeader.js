export default function ListToDoHeader({ $app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.$target = document.createElement('div');
  this.$target.className = 'list-to-do-header';

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
          <button class="select-done-to-do-button" ${
            this.state.selectedToDo.length > 0 ? '' : 'disabled'
          }>선택 종료</button>
        </div>
      </div>
    `;
  };

  // event handler
  this.$target.addEventListener('click', (e) => {
    const $allButton = e.target.closest('.all-done-to-do-button');
    const $selectButton = e.target.closest('.select-done-to-do-button');

    if ($allButton) {
      this.state.toDoItems.forEach((toDo) => {
        toDo.isFinish = true;
        toDo.isCount = false;
      });
      this.onClick(this.state.toDoItems);
    }

    if ($selectButton) {
      this.state.selectedToDo.forEach((toDo) => {
        toDo.isFinish = true;
        toDo.isCount = false;
      });
      this.onClick(this.state.selectedToDo);
    }
  });

  this.render();
}
