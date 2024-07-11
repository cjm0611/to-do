import { useEffect, useState } from 'react';
import { kadvice } from 'kadvice';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

export type TodoType = {
  text: string;
  isCompleted: boolean;
};

function App() {
  const [advice, setAdvice] = useState(kadvice.getOne());
  const [todos, setTodos] = useState<TodoType[]>([]);
  const currentDate: Date = new Date();
  const today: string = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDay()}일`;

  useEffect(() => {
    const initialAdvice = kadvice.getOne();
    setAdvice(initialAdvice);

    const storedTodos = localStorage.getItem('todos');
    const initialTodos: TodoType[] = storedTodos ? JSON.parse(storedTodos) : [];
    setTodos(initialTodos);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-cyan-800 to-gray-300 p-[100px] flex items-center justify-center font-pre">
      <div className="w-[500px] h-full rounded-[20px] p-[50px] bg-white drop-shadow-xl">
        <h1 className="text-3xl text-gray-800 font-semibold">{today}</h1>
        <p className="text-gray-500 italic mt-[10px]">{`${advice.message} - ${advice.author}`}</p>
        <main className="mt-[30px]">
          <p className="text-xl font-bold mb-[10px]">To Do List ✅</p>
          <TodoList todos={todos} setTodos={setTodos} />
          <section className="mt-[10px]">
            <TodoInput todos={todos} setTodos={setTodos} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
