export default function ItemToDo({ $app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;

  this.setState = (nextState) => {
    this.state = nextState;

    this.rerender();
  };

  this.$target = document.createElement('div');
  this.$target.className = 'to-do';
  this.$target.id = this.state.id;

  if (!this.state.isFinish) {
    const container = $app.querySelector('.list-to-do-container');
    container.appendChild(this.$target);
  } else {
    // 할 일 목록에서 삭제
    const deleteListToDo = document.getElementById(`${this.state.id}`);
    deleteListToDo.remove();
    // 종료 목록에 추가
    const container = $app.querySelector('.done-to-do-container');
    container.appendChild(this.$target);
  }

  // render
  this.render = () => {
    this.$target.innerHTML = `
      <div>
        ${this.state.isFinish ? '' : '<input type="checkbox" />'}
        <span>${this.state.text}</span>
      </div>
      <div>
        <span id="count${this.state.id}">
          ${this.state.isFinish ? this.state.time.origin : this.state.time.count}초
        </span>
        ${this.state.isFinish ? '' : '<button class="done-to-do-button">종료</button>'}
      </div>
    `;
  };

  this.$target.addEventListener('click', (e) => {
    const $button = e.target.closest('.done-to-do-button');

    if ($button) {
      this.onClick(this.state);
    }
  });

  this.render();

  // count rerender
  const countText = document.querySelector(`#count${this.state.id}`);
  this.rerender = () => {
    countText.innerHTML = this.state.isFinish ? `${this.state.time.origin}초` : `${this.state.time.count}초`;
  };
}
