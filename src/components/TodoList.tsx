import { TodoType } from '../App';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: TodoType[];
  handleToggleItem: (index: number) => void;
  handleDeleteItem: (index: number) => void;
  handleEditItem: (index: number, text: string) => void;
};

const TodoList = ({
  todos,
  handleToggleItem,
  handleDeleteItem,
  handleEditItem,
}: TodoListProps) => {
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
