import { useEffect, useState } from 'react';
import { kadvice } from 'kadvice';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import { CustomThemeProvider } from './contexts/CustomThemeProvider';
import ThemeToggleButton from './components/ThemeToggleButton';
import useLocalStorage from './hooks/useLocalStorage';

export type TodoType = {
  text: string;
  isCompleted: boolean;
};

function App() {
  const [advice, setAdvice] = useState(kadvice.getOne());
  const [todos, setTodos] = useLocalStorage<TodoType[]>('todos', []);
  const currentDate: Date = new Date();
  const today: string = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDay()}일`;

  useEffect(() => {
    const initialAdvice = kadvice.getOne();
    setAdvice(initialAdvice);
  }, []);

  return (
    <CustomThemeProvider>
      <div className="w-full min-h-screen bg-gradient-to-b p-[100px] flex items-center justify-center font-pre from-cyan-800 to-gray-300 dark:from-gray-800 dark:to-cyan-800 dark:text-white">
        <div className="relative w-[500px] h-full bg-white dark:bg-black rounded-[20px] p-[50px] drop-shadow-xl">
          <h1 className="text-3xl font-semibold dark:text-white">{today}</h1>
          <p className="text-gray-500 italic mt-[10px] dark:text-[#C5C8CE]">{`${advice.message} - ${advice.author}`}</p>
          <main className="mt-[30px]">
            <p className="text-xl font-bold mb-[10px]">To Do List ✅</p>
            <TodoList todos={todos} setTodos={setTodos} />
            <section className="mt-[10px]">
              <TodoInput todos={todos} setTodos={setTodos} />
            </section>
          </main>
          <div className="absolute bottom-[10px] right-[10px]">
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </CustomThemeProvider>
  );
}

export default App;
