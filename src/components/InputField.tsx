import { Action } from "../App";
import "./styles.css";
import { Dispatch, FormEvent, SetStateAction, useRef } from "react";

interface InputFieldProps {
  task: string;
  setTask: Dispatch<SetStateAction<string>>;
  addTodos: (e: FormEvent) => void;
  dispatch: Dispatch<Action>;
}

const InputField: React.FC<InputFieldProps> = ({ addTodos, setTask, task }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        addTodos(e);
        inputRef.current?.blur();
      }}
      className="input"
    >
      <input
        ref={inputRef}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        type="text"
        placeholder="input a task"
        className="inputBox"
      />
      <button className="add_btn" type="submit">
        add
      </button>
    </form>
  );
};
export default InputField;
