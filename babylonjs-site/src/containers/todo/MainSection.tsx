import * as React from 'react';

import Footer from './Footer';
import TodoItem from './TodoItem';

import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
  Todo
} from '../../modules/todo';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo: Todo) => !todo.completed,
  [SHOW_COMPLETED]: (todo: Todo) => todo.completed
};

interface MainSectionProps {
  todos: Todo[];
  clearCompleted: () => void;
  completeAll: () => void;
  editTodo: (id: number, text: string) => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

interface MainSectionState {
  filter: string;
}

class MainSection extends React.Component<MainSectionProps, MainSectionState> {
  constructor(props: MainSectionProps) {
    super(props);
    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted = () => {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.clearCompleted();
    }
  }

  handleShow = (filter: string) => {
    this.setState({ filter });
  }

  renderToggleAll = (completedCount: number) => {
    const { todos, completeAll } = this.props;
    if (todos.length > 0) {
      return (
        <input className="toggle-all" type="checkbox" checked={completedCount === todos.length} onChange={() => completeAll()} />
      );
    }
    return null;
  }

  renderFooter = (completedCount: number) => {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
            completedCount={completedCount}
            activeCount={activeCount}
            filter={filter}
            onClearCompleted={this.handleClearCompleted}
            onShow={this.handleShow}
        />
      );
    }

    return null;
  }

  render() {
    const { todos, completeTodo, deleteTodo, editTodo } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count: number, todo: Todo): number => todo.completed ? count + 1 : count, 0);

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
              editTodo={editTodo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}

export default MainSection;