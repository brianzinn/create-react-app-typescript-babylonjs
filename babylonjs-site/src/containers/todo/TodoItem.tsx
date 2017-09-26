import * as React from 'react';
import * as classNames from 'classnames';

import { Todo } from '../../modules/todo';
import TodoTextInput from './TodoTextInput';

interface TodoItemProps {
    todo: Todo;
    editTodo: (id: number, text: string) => void;
    deleteTodo: (id: number) => void;
    completeTodo: (id: number) => void;
}

interface TodoItemState {
    editing: boolean;
}

class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
    constructor(props: TodoItemProps) {
        super(props);
        this.state = {
            editing: false
        };
    }

    handleDoubleClick = () => {
        this.setState({ editing: true });
    }

    handleSave(todo: Todo, text: string) {
        if (text.length === 0) {
            this.props.deleteTodo(todo.id);
        } else {
            this.props.editTodo(todo.id, text);
        }
        this.setState({ editing: false });
    }

    render() {
        const { todo, completeTodo, deleteTodo } = this.props;

        let element;
        if (this.state.editing) {
            element = (
                <TodoTextInput
                    text={todo.text}
                    editing={this.state.editing}
                    onSave={(text) => this.handleSave(todo, text)}
                />
            );
        } else {
            element = (
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => completeTodo(todo.id)}
                    />
                
                    <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
                    
                    <button className="destroy" onClick={() => deleteTodo(todo.id)} />                
                </div>
            );
        }

        const itemClasses = classNames({
            completed: todo.completed,
            editing: this.state.editing
        });

        return (
            <li className={itemClasses}>
                {element}
            </li>
        );
    }
}

export default TodoItem;