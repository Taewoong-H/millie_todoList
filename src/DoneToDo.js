import ItemToDo from './ItemToDo.js';

export default function DoneToDo({ $app, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.state.map((toDo) => {
      const itemToDo = new ItemToDo({
        $app,
        initialState: toDo,
      });
    });
  };

  this.$target = document.createElement('div');
  this.$target.className = 'done-to-do';

  const rightTarget = $app.querySelector('.right-container');
  rightTarget.appendChild(this.$target);

  this.render = () => {
    this.$target.innerHTML = `
      <h2 class="done-to-do-title">종료된 할 일</h2>
      <div class="done-to-do-container">
        <!-- item-to-do -->
      </div>
    `;
  };

  this.render();
}
