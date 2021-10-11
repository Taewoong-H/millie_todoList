import ToDo from './ToDo.js';

export default function DoneToDo({ $app, initialState }) {
  // state 및 this객체 설정
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
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

  this.render = () => {
    this.$target.innerHTML = this.state
      .map((toDo) => {
        return toDo.render();
      })
      .join('');
  };

  this.render();
}
