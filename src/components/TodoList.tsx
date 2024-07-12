import { TodoType } from '../App';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: TodoType[];
  setTodos: (newTodos: TodoType[]) => void;
};

const TodoList = ({ todos, setTodos }: TodoListProps) => {
  const handleToggleItem = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleDeleteItem = (index: number) => {
    const newTodos = todos.filter((_, idx) => idx !== index);
    setTodos(newTodos);
  };

  const handleEditItem = (index: number, newText: string) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={todo.text} className="mb-[10px]">
          <TodoItem
            text={todo.text}
            isCompleted={todo.isCompleted}
            onToggle={() => handleToggleItem(index)}
            onDelete={() => handleDeleteItem(index)}
            onEdit={(newText) => handleEditItem(index, newText)}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
