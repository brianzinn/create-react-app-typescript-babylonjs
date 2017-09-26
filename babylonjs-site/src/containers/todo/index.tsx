import * as React from 'react';
import { ApplicationState } from '../../store';
import { ToDoProps, actionCreators } from '../../modules/todo';
import { connect } from 'react-redux';
// import * as classNames from 'classnames';

import MainSection from './MainSection';
import Header from './Header';
import 'todomvc-app-css/index.css'

class ToDo extends React.Component<ToDoProps, {}> {
  constructor(props: ToDoProps) {
    super(props);
  }

  public render() {
    const { list, clearCompleted, completeAll, editToDo, completeToDo, deleteToDo, addToDo } = this.props
    return (
      <div className="todoapp">        
        <Header addTodo={addToDo} />

        <MainSection
          todos={list}
          clearCompleted={clearCompleted}
          completeAll={completeAll}
          editTodo={editToDo}
          completeTodo={completeToDo}
          deleteTodo={deleteToDo}
        />
      </div>
    )
  }
}

// Wire up the React component to the Redux store.  Doing it this way, we only get from one reducer.
export default connect(
  (state: ApplicationState) => state.todo, // Selects which state properties are merged into the component's props
  actionCreators                 // Selects which action creators are merged into the component's props
)(ToDo);