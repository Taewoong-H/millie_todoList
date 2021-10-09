export default function ItemToDo({ $app, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.$target = document.createElement('div');
  this.$target.className = 'to-do';
  this.$target.id = this.state.id;

  const container = $app.querySelector('.list-to-do-container');
  container.appendChild(this.$target);

  this.render = () => {
    this.$target.innerHTML = `
      <div>
        <input type="checkbox" />
        <span>${this.state.text}</span>
      </div>
      <div>
        <span>${this.state.time}초</span>
        <button>종료</button>
      </div>
    `;
  };

  this.render();
}
