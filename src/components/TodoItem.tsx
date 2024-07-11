import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

type TodoItemProps = {
  text: string;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (text: string) => void;
};

const TodoItem = ({
  text,
  isCompleted,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(text);

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedText(text);
    }
  };

  const handleSaveEdit = () => {
    onEdit(editedText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center">
      {isEditing ? (
        <div className="flex items-center justify-center">
          <input
            type="text"
            className="w-full border-b p-[5px] focus:border-blue-500 outline-none bg-transparent"
            placeholder="해야 할 일을 입력하세요."
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button
            className="w-[75px] h-[25px] ml-[15px] bg-gray-300 text-black rounded-[8px]"
            onClick={handleCancelEdit}
          >
            취소
          </button>
          <button
            className="w-[75px] h-[25px] ml-[15px] bg-green-600 text-white rounded-[8px]"
            onClick={handleSaveEdit}
          >
            저장
          </button>
        </div>
      ) : (
        <div
          className={`flex items-center justify-center  ${isCompleted ? 'line-through text-gray-400' : ''}`}
        >
          <label className="cursor-pointer flex items-center">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={onToggle}
              className="mr-2"
            />
            <p className={isCompleted ? 'line-through' : ''}>{text}</p>
          </label>
          <button
            className="ml-[5px] flex items-center justify-center"
            onClick={onDelete}
          >
            <DeleteIcon className="w-[20px] h-[20px] text-[#243E57] dark:text-[#55a0bd]" />
          </button>
          <button
            className="ml-[5px] flex items-center justify-center"
            onClick={handleEditClick}
          >
            <EditIcon className="w-[20px] h-[20px] text-[#243E57] dark:text-[#55a0bd]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
