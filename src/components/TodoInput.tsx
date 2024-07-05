import AddIcon from '@mui/icons-material/Add';

type TodoInputProps = {
  handleShowInputField: () => void;
};

const TodoInput = ({ handleShowInputField }: TodoInputProps) => {
  return (
    <button
      className="flex items-center justify-center"
      onClick={handleShowInputField}
    >
      <AddIcon style={{ color: '#5C5AD9' }} />
      <p>할 일 추가</p>
    </button>
  );
};

export default TodoInput;
