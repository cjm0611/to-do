import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TodoType } from '../App';

type TodoInputProps = {
  todos: TodoType[];
  setTodos: (newTodos: TodoType[]) => void;
};

const TodoInput = ({ todos, setTodos }: TodoInputProps) => {
  const [isShowInputField, setIsShowInputField] = useState<boolean>(false);
  const [newToDoText, setNewToDoText] = useState<string>('');

  const handleShowInputField = () => {
    setIsShowInputField(!isShowInputField);
  };

  const handleCancel = () => {
    setIsShowInputField(false);
    setNewToDoText('');
  };

  const handleAddTodo = () => {
    if (newToDoText.trim() == '') {
      toast.error('할 일을 입력해주세요.', {
        position: 'bottom-center',
        duration: 2000,
      });
      return;
    }

    const newTodo = { text: newToDoText, isCompleted: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setNewToDoText('');
    setIsShowInputField(false);
  };

  return (
    <div>
      {!isShowInputField ? (
        <button
          className="flex items-center justify-center"
          onClick={handleShowInputField}
        >
          <AddIcon className="text-[#5C5AD9] dark:text-[#7A78E0]" />
          <p>할 일 추가</p>
        </button>
      ) : (
        <div className="flex items-center">
          <input
            type="text"
            className="w-full border-b p-[5px] focus:border-blue-500 outline-none bg-transparent"
            placeholder="해야 할 일을 입력하세요."
            onChange={(e) => setNewToDoText(e.target.value)}
            value={newToDoText}
          />
          <button
            className="w-[75px] h-[25px] ml-[15px] bg-gray-300 text-black rounded-[8px]"
            onClick={handleCancel}
          >
            취소
          </button>
          <button
            className="w-[75px] h-[25px] ml-[15px] bg-green-600 text-white rounded-[8px]"
            onClick={handleAddTodo}
          >
            추가
          </button>
          <Toaster />
        </div>
      )}
    </div>
  );
};

export default TodoInput;
