import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { v4 } from "uuid";
import { useState, useCallback, useEffect } from 'react';

const TODO_APP_STORAGE_KEY = 'TODO_APP'
function App() {
  const [todoList, setTodoList] = useState([])
  const [textInput, setTextInput] = useState("")

  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList))
  }, [todoList])

  const onTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const onAddBtnClick = useCallback((e) => {
    setTodoList([{ id: v4(), name: textInput, isCompleted: false },
    ...todoList]);

    setTextInput("");
  }, [todoList, textInput]);

  const onCheckBtnClick = useCallback(
    (id) => {
      setTodoList(prevState => prevState.map(todo => todo.id === id ? { ...todo, isCompleted: true } : todo))
    },
    [],
  )
  return (
    <>
      <h3>Danh sách cần làm</h3>
      <Textfield
        name="add-todo"
        placeholder="Thêm việc cần làm..."
        elemAfterInput={
          <Button
            isDisabled={!textInput} appearance="primary"
            onClick={onAddBtnClick}
          >
            Thêm
          </Button>
        }
        css={{ padding: "2px 4px" }}
        value={textInput}
        onChange={onTextInputChange}
      />
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );

}

export default App;
