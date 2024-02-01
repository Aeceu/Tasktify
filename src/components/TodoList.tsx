import { Dispatch } from "react";
import { Todo } from "../model/TodoModel";
import "./styles.css";
import SingleTodo from "./SingleTodo";
import { Action } from "../App";
import { Droppable } from "react-beautiful-dnd";

interface TodoListProps {
  todos: Todo[];
  setTodos: Dispatch<Action>;
  completedTodos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  completedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading">Active Tasks</span>

            {todos.map((todo, i) => (
              <SingleTodo
                index={i}
                todo={todo}
                key={todo.id}
                todos={todos}
                dispatch={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading">Completed Tasks</span>
            {completedTodos.map((completed, i) => (
              <SingleTodo
                index={i}
                todo={completed}
                key={completed.id}
                todos={completedTodos}
                dispatch={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default TodoList;
