import ItemToDo from './ItemToDo.js';

export default function DoneToDo({ $app, initialState }) {
  // state 및 this객체 설정
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    console.log(this.state);

    this.state.map((toDo) => {
      const itemToDo = new ItemToDo({
        $app: this.$target,
        initialState: toDo,
      });
    });
  };

  // render
  const title = document.createElement('h2');
  title.className = 'done-to-do-title';
  title.innerHTML = '종료된 할 일';

  this.$target = document.createElement('div');
  this.$target.className = 'done-to-do-container';

  const rightTarget = $app.querySelector('.right-container');
  rightTarget.appendChild(title);
  rightTarget.appendChild(this.$target);

  // this.render = () => {
  //   this.$target.innerHTML = `
  //     <h2 class="done-to-do-title">종료된 할 일</h2>
  //     <div class="done-to-do-container">
  //       <!-- item-to-do -->
  //     </div>
  //   `;
  // };

  // this.render();
}
