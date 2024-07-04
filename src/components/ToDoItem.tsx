export interface TodoItemProps {
  text: string;
  isCompleted: boolean;
  onToggle: () => void;
}

const TodoItem = ({ text, isCompleted, onToggle }: TodoItemProps) => {
  return (
    <div className={`${isCompleted ? 'line-through text-gray-400' : ''}`}>
      <label className="cursor-pointer flex items-center">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={onToggle}
          className="mr-2"
        />
        <p className={isCompleted ? 'line-through' : ''}>{text}</p>
      </label>
    </div>
  );
};

export default TodoItem;
