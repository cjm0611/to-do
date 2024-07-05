import { useEffect, useState } from 'react';
import './App.css';
import { kadvice } from 'kadvice';
import toast, { Toaster } from 'react-hot-toast';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

export type TodoType = {
  text: string;
  isCompleted: boolean;
};

function App() {
  const currentDate: Date = new Date();
  const [advice, setAdvice] = useState(kadvice.getOne());
  const today: string = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDay()}일`;
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newToDoText, setNewToDoText] = useState<string>('');
  const [isShowInputField, setIsShowInputField] = useState<boolean>(false);

  useEffect(() => {
    const initialAdvice = kadvice.getOne();
    setAdvice(initialAdvice);

    const storedTodos = localStorage.getItem('todos');
    const initialTodos: TodoType[] = storedTodos ? JSON.parse(storedTodos) : [];
    setTodos(initialTodos);
  }, []);

  const handleToggleItem = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const handleDeleteItem = (index: number) => {
    const newTodos = todos.filter((_, idx) => idx !== index);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const handleEditItem = (index: number, newText: string) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

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
    <div className="w-full min-h-screen bg-gradient-to-b from-cyan-800 to-gray-300 p-[100px] flex items-center justify-center font-pre">
      <div className="w-[500px] h-full rounded-[20px] p-[50px] bg-white drop-shadow-xl">
        <h1 className="text-3xl text-gray-800 font-semibold">{today}</h1>
        <p className="text-gray-500 italic mt-[10px]">{`${advice.message} - ${advice.author}`}</p>
        <main className="mt-[30px]">
          <p className="text-xl font-bold mb-[10px]">To Do List ✅</p>
          <TodoList
            todos={todos}
            handleToggleItem={handleToggleItem}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
          />
          <section className="mt-[10px]">
            {!isShowInputField ? (
              <TodoInput handleShowInputField={handleShowInputField} />
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-full border-b p-[5px] focus:border-blue-500 outline-none"
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
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
