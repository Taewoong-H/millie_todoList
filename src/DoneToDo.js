export default function DoneToDo({ $app, initialState }) {
  // state 및 this객체 설정
  this.state = initialState;

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
        return toDo.render();
      })
      .join('');

    this.$target.innerHTML = `
      <h2 class="done-to-do-title">종료된 할 일</h2>
      <div class="done-to-do-container">
        ${doneToDoTemplate}
      </div>
    `;
  };

  this.render();
}
