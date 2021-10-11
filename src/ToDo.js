export default function ToDo({ id, text, time, isCount, isFinish, isChecked, setRender, doneCount }) {
  // state 및 this객체 설정
  this.id = id;
  this.text = text;
  this.time = time;
  this.isCount = isCount;
  this.isFinish = isFinish;
  this.isChecked = isChecked;
  this.setRender = setRender;
  this.doneCount = doneCount;

  this.setCount = () => {
    const countDown = setInterval(() => {
      this.time.count--;
      // 시간이 0이 될 시 종료
      if (this.time.count < 0) {
        clearInterval(countDown);
        this.isFinish = true;
        this.isCount = false;
        this.doneCount(this, true);
      }
      // count가 종료 될 시 함수 종료
      if (!this.isCount) {
        clearInterval(countDown);
      }
      this.setRender(this);
    }, 1000);
  };

  this.setCount();

  // render
  this.render = () => {
    return `
      <div class="to-do">
        <div>
          ${
            this.isFinish
              ? ''
              : `<input type="checkbox" value="${this.id}" class="check-box" ${this.isChecked ? 'checked' : ''}/>`
          }
          <span>${this.text}</span>
        </div>
        <div>
          <span id="count${this.id}" class="count">
            ${this.isFinish ? this.time.origin : this.time.count}초
          </span>
          ${this.isFinish ? '' : `<button data-id=${this.id} class="done-to-do-button">종료</button>`}
        </div>
      </div>
    `;
  };

  // 시간 초 rerendering
  this.countRender = () => {
    if (this.isCount) {
      const countText = document.querySelector(`#count${this.id}`);
      countText.innerHTML = `${this.time.count}초`;
    }
  };
}
