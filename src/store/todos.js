import { fetchRequest } from "../components/lib/fetchAPI"
import { todosTypes } from "../constants/actionTypes"
const initialState = {
    todos: [],
    inputTitle: "",
    inputDate: "",
}
export const fireBaseTodosReducer = (state = initialState, action) => {
    switch (action.type) {
        case todosTypes.GET:
            const todosArray = [];
            for (let key in action.payload) {
                const data = {
                    id: key,
                    title: action.payload[key].title,
                    date: action.payload[key].date,
                    checked: action.payload[key].checked,
                };
                todosArray.push(data);
            }
            return {
                ...state,
                todos: todosArray,
            };
        case todosTypes.POST:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case todosTypes.TITLE:
            return {
                ...state,
                inputTitle: action.payload
            }
        case todosTypes.DATE:
            return {
                ...state,
                inputDate: action.payload
            }
        case todosTypes.RESET:
            return {
                ...state,
                inputDate: "",
                inputTitle: ""
            }
        case todosTypes.COMPLETED:
            const updatedTodos = state.todos.map((todo) => {
                if (todo.id === action.payload) {
                    return { ...todo, checked: !todo.checked };

                }
                return todo;
            });
            return {
                ...state,
                todos: updatedTodos
            };
        case todosTypes.DELETE:
            const filteredTodos = state.todos.filter((el) => el.id !== action.payload)
            return {
                ...state,
                todos: filteredTodos
            }
        case todosTypes.OPEN_MODAL:
            const openModalTodos = state.todos.map((todo) => {
                if (todo.id === action.payload) {
                    return { ...todo, openModal: !todo.openModal };
                }
                return todo;
            });
            return {
                ...state,
                todos: openModalTodos
            }
        case todosTypes.EDIT:
            const updatedFilterTodos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, title: action.payload.title, date: action.payload.date };
                }
                return todo;
            });
            return {
                ...state,
                todos: updatedFilterTodos,
            };
        case todosTypes.SORT:
            const sortedTodos = state.todos.sort((a, b) => b.checked - a.checked)
            console.log(sortedTodos);
            return {
                ...state,
                todos: sortedTodos
            }
        default:
            return state
    }
}
export function getTodos() {
    return async (dispatch) => {
        try {
            const response = await fetchRequest()
            dispatch({ type: todosTypes.GET, payload: response });
        } catch (error) {
            new Error(error);
            console.log(error);
        }

    }
}
export function postTodo(data) {
    return async (dispatch) => {
        try {
            await fetchRequest({ method: "POST", body: data })
            dispatch({ type: todosTypes.POST, payload: data })
            dispatch(getTodos())
        } catch (error) {
            new Error(error);
            console.log(error);
        }

    }
}
export function deleteTodo(id) {
    return async (dispatch) => {
        try {
            console.log(id);
            await fetchRequest({ method: "DELETE" }, id)
            dispatch({ type: todosTypes.DELETE, payload: id })
            dispatch(getTodos())
        } catch (error) {
            new Error(error);
            console.log(error);
        }
    }
}
export function completedTodo(checked, id) {
    return async (dispatch) => {
        try {
            await fetchRequest({ method: "PATCH", body: { checked: !checked } }, id)
            dispatch({ type: todosTypes.COMPLETED, payload: id })
            dispatch(getTodos())
        } catch (error) {
            new Error(error);
            console.log(error);
        }
    }
}
export function editTodo(data, id) {
    return async (dispatch) => {
        try {
            console.log(id);
            await fetchRequest({ method: "PUT", body: data }, id)
            dispatch({ type: todosTypes.EDIT, payload: { id, title: data.title, date: data.date } })
            dispatch(getTodos())
        } catch (error) {
            new Error(error);
            console.log(error);
        }
    }

}
