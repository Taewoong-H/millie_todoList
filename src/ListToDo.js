export default function ListToDo({ $app, initialState, onClick, onCheckClick }) {
  // state 및 this객체 설정
  this.state = initialState;
  this.onClick = onClick;
  this.onCheckClick = onCheckClick;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  // render
  this.$target = document.createElement('div');
  this.$target.className = 'list-to-do-container';

  const leftTarget = $app.querySelector('.left-container');
  leftTarget.appendChild(this.$target);

  this.render = () => {
    const toDoTemplate = this.state
      .map((toDo) => {
        return `<div class='to-do-${toDo.id}'>${toDo.template()}</div>`;
      })
      .join('');

    this.$target.innerHTML = `
      ${toDoTemplate}
    `;
  };

  // event handler
  this.$target.addEventListener('click', (e) => {
    const $doneButton = e.target.closest('.done-to-do-button');
    const $checkBox = e.target.closest('.check-box');

    if ($doneButton) {
      const doneToDo = this.state.find((toDo) => toDo.id === Number($doneButton.dataset.id));
      doneToDo.isCount = false;
      doneToDo.isFinish = true;
      this.onClick(doneToDo);
    }

    if ($checkBox) {
      const checkedToDo = this.state.find((toDo) => toDo.id === Number($checkBox.value));

      checkedToDo.isChecked = $checkBox.checked;
      this.onCheckClick();
    }
  });

  this.render();
}
