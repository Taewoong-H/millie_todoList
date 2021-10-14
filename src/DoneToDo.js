export default function DoneToDo({ $app, initialState, onClick }) {
  // state 및 this객체 설정
  this.state = initialState;
  this.onClick = onClick;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  // render
  this.$target = document.createElement('div');
  this.$target.className = 'done-to-do';

  const rightTarget = $app.querySelector('.right-container');
  rightTarget.appendChild(this.$target);

  this.render = () => {
    const doneToDoTemplate = this.state
      .map((toDo) => {
        return toDo.template();
      })
      .join('');

    this.$target.innerHTML = `
      <h2 class="done-to-do-title">종료된 할 일</h2>
      <div class="done-to-do-container">
        ${doneToDoTemplate}
      </div>
    `;
  };

  // event handler
  this.$target.addEventListener('click', (e) => {
    const $restoreButton = e.target.closest('.restore-to-do-button');

    if ($restoreButton) {
      const restoreToDo = this.state.find((toDo) => toDo.id === Number($restoreButton.dataset.id));

      restoreToDo.isCount = true;
      restoreToDo.isFinish = false;
      restoreToDo.time.count = restoreToDo.time.origin;
      restoreToDo.setCount();

      this.onClick(restoreToDo);
    }
  });

  this.render();
}
