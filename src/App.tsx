import { useEffect, useState } from 'react';
import './App.css';
import TodoItem from './components/ToDoItem';
import { kadvice } from 'kadvice';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const currentDate: Date = new Date();
  const [advice, setAdvice] = useState(kadvice.getOne());
  const today: string = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDay()}일`;
  const [todos, setTodos] = useState([
    { text: 'React useMemo 공부하기', isCompleted: false },
    { text: '구름 코테 가입하기', isCompleted: false },
    { text: 'to-do 앱 완성하기', isCompleted: false },
  ]);
  const [newToDoText, setNewToDoText] = useState('');

  useEffect(() => {
    const initialAdvice = kadvice.getOne();
    setAdvice(initialAdvice);
  }, []);

  const handleToggle = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleAddTodo = () => {
    if (newToDoText.trim() !== '') {
      const newTodo = { text: newToDoText, isCompleted: false };
      setTodos([...todos, newTodo]);
      setNewToDoText('');
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-cyan-800 to-gray-300 p-[100px] flex items-center justify-center font-pre">
      <div className="w-[500px] h-full rounded-[20px] p-[50px] bg-white drop-shadow-xl">
        <h1 className="text-3xl text-gray-800 font-semibold">{today}</h1>
        <p className="text-gray-500 italic mt-[10px]">{`${advice.message} - ${advice.author}`}</p>
        <main className="mt-[30px]">
          <p className="text-xl font-bold mb-[10px]">To Do List ✅</p>
          <ul>
            {todos.map((todo, index) => (
              <li key={index} className="mb-[10px]">
                <TodoItem
                  text={todo.text}
                  isCompleted={todo.isCompleted}
                  onToggle={() => handleToggle(index)}
                />
              </li>
            ))}
          </ul>
          <button className="flex items-center justify-center">
            <AddIcon style={{ color: '#5C5AD9' }} />
            <p>할 일 추가</p>
          </button>
        </main>
        <section className="mt-[50px] flex items-center">
          <input
            type="text"
            className="w-full border-b focus:border-blue-500 outline-none"
            placeholder="해야 할 일을 입력하세요."
            onChange={(e) => setNewToDoText(e.target.value)}
            value={newToDoText}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
