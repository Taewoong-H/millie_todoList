export default function ItemToDo({ $app, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
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

  this.render = () => {
    this.$target.innerHTML = `
      <div>
        <input type="checkbox" />
        <span>${this.state.text}</span>
      </div>
      <div>
        <span>${this.state.isFinish ? this.state.time.origin : this.state.time.count}초</span>
        <button>종료</button>
      </div>
    `;
  };

  this.render();
}
