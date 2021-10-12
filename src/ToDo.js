export default function ToDo({ id, text, time, setRender, doneCount }) {
  // state 및 this객체 설정
  this.id = id;
  this.text = text;
  this.time = time;
  this.isCount = true;
  this.isFinish = false;
  this.isChecked = false;
  this.setRender = setRender;
  this.doneCount = doneCount;

  this.setCount = () => {
    const countDown = setInterval(() => {
      this.time.count--;
      // count가 종료 될 시 함수 종료
      if (!this.isCount) {
        clearInterval(countDown);
      }
      // 시간이 0이 될 시 종료
      else if (this.time.count < 0) {
        clearInterval(countDown);
        this.isFinish = true;
        this.isCount = false;
        this.doneCount(this, true);
      }

      // 1초 마다 toDo 객체 rerender
      this.setRender(this);
    }, 1000);
  };

  this.setCount();

  this.template = () => {
    return `
      <div class="to-do ${this.time.count <= 5 && !this.isFinish ? 'warning' : ''}">
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

  // render(해당 toDo객체에만)
  this.render = ($target) => {
    $target.innerHTML = `
      ${this.template()}
    `;
  };

  // // 시간 초 rerendering
  // this.countRender = () => {
  //   if (this.isCount) {
  //     const countText = document.querySelector(`#count${this.id}`);
  //     countText.innerHTML = `${this.time.count}초`;
  //   }
  // };
}
