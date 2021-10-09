export default function MakeToDo({ $app, initialState, onClick }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.$target = document.createElement('div');
  this.$target.className = 'make-to-do';

  const leftTarget = $app.querySelector('.left-container');
  leftTarget.appendChild(this.$target);

  this.onClick = onClick;

  this.render = () => {
    this.$target.innerHTML = `
      <h2 class="make-to-do-title">할 일 만들기</h2>
      <div class="make-to-do-container">
        <div class="make-to-do-input">
          <label>할 일 작성</label>
          <input type="text" id="input-left" placeholder="할 일 내용 입력"></input>
        </div>
        <div class="make-to-do-input">
          <label>종료 시간</label>
          <input type="number" id="input-right" placeholder="초 단위 입력"></input>
        </div>
        <button class="make-to-do-button">추가</button>
      </div>
    `;
  };

  this.$target.addEventListener('click', (e) => {
    const $button = e.target.closest('.make-to-do-button');

    if ($button) {
      const toDoText = document.querySelector('#input-left').value;
      const toDoTime = document.querySelector('#input-right').value;

      // 필수 값
      if (toDoText.length > 0 && toDoTime.length > 0) {
        const toDoItem = {
          id: this.state.length + 1,
          text: toDoText,
          time: toDoTime,
          isCount: false,
        };

        this.onClick(toDoItem);
      }
    }
  });

  this.render();
}
