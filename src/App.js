import MakeToDo from './MakeToDo.js';

export default function App($app) {
  this.state = {
    toDoItems: [],
  };

  const makeToDo = new MakeToDo({
    $app,
    initialState: this.state.toDoItems,
    onClick: (toDoItem) => {
      this.setState({
        toDoItems: [...this.state.toDoItems, toDoItem],
      });
      console.log(this.state);
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    makeToDo.setState(this.state.toDoItems);
  };

  // const init = () => {
  //   try {
  //     this.setState({
  //       ...this.state,
  //     });
  //     console.log('render');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // init();
}
