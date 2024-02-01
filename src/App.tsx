import { FormEvent, useReducer, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model/TodoModel";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

export type Action =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number }
  | { type: "done"; payload: number }
  | { type: "update"; payload: { editTodo: string; id: number } }
  | { type: "addComplete"; payload: Todo[] }
  | { type: "addTask"; payload: Todo[] };

interface State {
  todos: Todo[];
  completed: Todo[];
}

const TodoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), todo: action.payload, isDone: false },
        ],
      };
    case "remove":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "update":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, todo: action.payload.editTodo }
            : todo
        ),
      };
    case "done":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        ),
      };
    case "addComplete":
      return {
        ...state,
        completed: action.payload,
      };
    case "addTask":
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(TodoReducer, {
    todos: [],
    completed: [],
  });
  const [task, setTask] = useState<string>("");

  const addTodos = (e: FormEvent) => {
    e.preventDefault();

    if (task) {
      dispatch({ type: "add", payload: task });
      setTask("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = state.todos,
      complete = state.completed;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    dispatch({ type: "addComplete", payload: complete });
    dispatch({ type: "addTask", payload: active });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <span className="heading">Tasktify</span>
        <InputField
          addTodos={addTodos}
          task={task}
          setTask={setTask}
          dispatch={dispatch}
        />

        <TodoList
          todos={state.todos}
          setTodos={dispatch}
          completedTodos={state.completed}
        />
      </div>
    </DragDropContext>
  );
};
export default App;
