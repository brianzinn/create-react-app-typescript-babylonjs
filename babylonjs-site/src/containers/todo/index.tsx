import * as React from 'react';
import { ApplicationState } from '../../store';
import { ToDoProps, actionCreators } from '../../modules/todo';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class ToDo extends React.Component<ToDoProps, {}> {
  constructor(props: ToDoProps) {
    super(props)

    console.log('props', props)
  }

  public render() {
    console.log('current props:', this.props)
    return (
      <div>
        {
          this.props.list.map(todo => (
            <div className="row" key={todo.id}>
              <div className="col-xs-6">
                {todo.text}
              </div>
              <div className="col-xs-3">{todo.completed ? 'completed' : 'not completed'}</div>
              <div className="col-xs-3">
                <Button onClick={() => this.props.completeToDo(todo.id)}>toggle</Button>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

// Wire up the React component to the Redux store.  Doing it this way, we only get from one reducer.
export default connect(
  (state: ApplicationState) => state.todo, // Selects which state properties are merged into the component's props
  actionCreators                 // Selects which action creators are merged into the component's props
)(ToDo);