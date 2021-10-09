import ItemToDo from './ItemToDo.js';

export default function ListToDo({ $app, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.state.map((toDo) => {
      if (!toDo.isCount) {
        toDo.isCount = true;
        setInterval(() => {
          toDo.time--;
          itemToDo.setState(toDo);
        }, 1000);
        const itemToDo = new ItemToDo({
          $app,
          initialState: toDo,
        });
      }
    });
  };

  this.$target = document.createElement('div');
  this.$target.className = 'list-to-do';

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
          <button>전체 종료</button>
          <button>선택 종료</button>
        </div>
      </div>
      <div class="list-to-do-container">
        <!-- item-to-do -->
      </div>
    `;
  };

  this.render();
}
