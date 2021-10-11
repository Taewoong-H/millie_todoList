export default function DonePopUp({ $app, initialState, onClick }) {
  // state 및 this객체 설정
  this.state = initialState;
  this.onClick = onClick;

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.isPopUp) {
      this.$target.style.display = 'block';

      this.render();
    }
  };

  // render
  this.$target = document.createElement('div');
  this.$target.className = 'pop-up';
  $app.appendChild(this.$target);

  this.render = () => {
    this.$target.innerHTML = `
      <div class="pop-up-body">
        [${this.state ? this.state.doneToDoItem.text : ''}] 아이템이 종료되었습니다.
        <br>
        <button class="pop-up-button">확인</button>
      </div>
    `;
  };

  // event handler
  this.$target.addEventListener('click', (e) => {
    const $button = e.target.closest('.pop-up-button');

    if ($button) {
      this.$target.style.display = 'none';
      this.onClick();
    }
  });

  this.render();
}
