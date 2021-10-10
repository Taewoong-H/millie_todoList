export default function MakeToDo({ $app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.count = 0;

  this.setState = (nextState) => {
    this.state = nextState;

    // this.render();
  };

  this.$target = document.createElement('div');
  this.$target.className = 'make-to-do';

  const leftTarget = $app.querySelector('.left-container');
  leftTarget.appendChild(this.$target);

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
      const inputText = document.querySelector('#input-left');
      const inputTime = document.querySelector('#input-right');
      const toDoText = inputText.value;
      const toDoTime = inputTime.value;

      // 필수 값 설정
      if (toDoText.length > 0 && toDoTime.length > 0) {
        // ToDoItem Object
        this.count += 1;
        const toDoItem = {
          id: this.count,
          text: toDoText,
          time: { origin: toDoTime, count: toDoTime },
          isCount: false,
          isFinish: false,
        };

        this.onClick(toDoItem);
        inputText.value = '';
        inputTime.value = '';
      }
    }
  });

  this.render();
}
