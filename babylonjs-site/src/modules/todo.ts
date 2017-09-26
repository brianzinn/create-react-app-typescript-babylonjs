import { Reducer } from 'redux';

export type ToDoState = {list: Todo[]};

// action types
export type ADD_TODO = 'ADD_TODO';
export const ADD_TODO: ADD_TODO = 'ADD_TODO';

export type DELETE_TODO = 'DELETE_TODO';
export const DELETE_TODO: DELETE_TODO = 'DELETE_TODO';

export type EDIT_TODO = 'EDIT_TODO';
export const EDIT_TODO: EDIT_TODO = 'EDIT_TODO';

export type COMPLETE_TODO = 'COMPLETE_TODO';
export const COMPLETE_TODO: COMPLETE_TODO = 'COMPLETE_TODO';

export type COMPLETE_ALL = 'COMPLETE_ALL';
export const COMPLETE_ALL: COMPLETE_ALL = 'COMPLETE_ALL';

export type CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const CLEAR_COMPLETED: CLEAR_COMPLETED = 'CLEAR_COMPLETED';

// filters
export type SHOW_ALL = 'SHOW_ALL';
export const SHOW_ALL: SHOW_ALL = 'SHOW_ALL';

export type SHOW_COMPLETED = 'SHOW_COMPLETED';
export const SHOW_COMPLETED: SHOW_COMPLETED = 'SHOW_COMPLETED';

export type SHOW_ACTIVE = 'SHOW_ACTIVE';
export const SHOW_ACTIVE: SHOW_ACTIVE = 'SHOW_ACTIVE';

// model
export type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export type AddToDoAction = {
    type: ADD_TODO,
    text: string
};
  
export type DeleteToDoAction = {
    type: DELETE_TODO,
    id: number
};
  
export type EditToDoAction = {
    type: EDIT_TODO,
    id: number,
    newText: string
};

export type CompleteTodoAction = {
    type: COMPLETE_TODO,
    id: number
};
  
export type CompleteAllAction = {
    type: COMPLETE_ALL
};
  
export type ClearCompletedAction = {
    type: CLEAR_COMPLETED
};

type KnownAction = AddToDoAction | DeleteToDoAction | EditToDoAction | CompleteTodoAction | CompleteAllAction |
    ClearCompletedAction;

export const actionCreators = {
    addToDo : (text: string) => <AddToDoAction> {
        type: ADD_TODO,
        text
    },
    deleteToDo: (id: number) => <DeleteToDoAction> {
        type: DELETE_TODO,
        id
    },
    editToDo: (id: number, newText: string) => <EditToDoAction> {
        type: EDIT_TODO,
        id,
        newText
    },
    completeToDo: (id: number) => <CompleteTodoAction> {
        type: COMPLETE_TODO,
        id
    },
    completeAll: () => <CompleteAllAction> {
        type: COMPLETE_ALL
    },
    clearCompleted: () => <ClearCompletedAction> {
        type: CLEAR_COMPLETED
    }
};

export type ToDoProps = ToDoState & typeof actionCreators;

const initialState: ToDoState = {list:[<Todo> {
    text: 'Hook up to Azure functions',
    completed: false,
    id: 0
}]};

const reducer: Reducer<ToDoState> = (state: ToDoState = initialState, action: KnownAction): ToDoState => {
    switch (action.type) {
        case ADD_TODO:
        {
            let newState: ToDoState = { list: state.list.slice(0)};
            
            newState.list.push({
                id: newState.list.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                text: action.text,
                completed: false
            });
            return newState;
        }
        case DELETE_TODO:
        {
            let newState = {list: state.list.filter(todo => todo.id !== action.id)};
            return newState;
        }
        case EDIT_TODO:
        {
            let newState = {list: state.list.map(todo => 
                todo.id === action.id ?
                    {...todo, text: action.newText} :
                    todo
            )};
            return newState;
        }
        case COMPLETE_TODO: // actually a toggle of current completed state
        {
            let newState = {list: state.list.map(todo => 
                todo.id === action.id ?
                    {...todo, completed: !todo.completed} :
                    todo
            )};
            return newState;
        }
        case COMPLETE_ALL:
        {
            const allAlreadyComplete = state.list.every(todo => todo.completed);
            let newState = {list: state.list.map(todo => ({
                ...todo,
                completed: !allAlreadyComplete
            }))};
            return newState;
        }
        case CLEAR_COMPLETED:
        {
            return {list: state.list.filter(todo => todo.completed === false)};
        }
        default:
            // const exhaustiveCheck: never = action;
            return state;
    }
};

export default reducer;