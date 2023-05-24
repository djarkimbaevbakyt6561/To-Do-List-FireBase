import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { todosTypes } from '../../constants/actionTypes';
import { editTodo } from '../../store/todos';

export const Modal = ({ todo, onClick }) => {
  const dispatch = useDispatch();
  const [inputTitle, setInputTitle] = useState(todo.title);
  const [inputDate, setInputDate] = useState(todo.date);

  function getInputTitle(e) {
    setInputTitle(e.target.value);
  }
  function getInputDate(e) {
    setInputDate(e.target.value);
  }

  function updateTodoHandler(e) {
    e.preventDefault();
    const data = {
      title: inputTitle,
      date: inputDate,
      checked: todo.checked,
    };
    dispatch(editTodo(data, todo.id));
    dispatch({ type: todosTypes.OPEN_MODAL, payload: todo.id });
  }
  return (
    <Wrapper>
      <Container>
        <input type="text" value={inputTitle} onChange={getInputTitle} />
        <input type="date" value={inputDate} onChange={getInputDate} />
        <ButtonContainer>
          <button onClick={onClick}>Close</button>
          <button onClick={updateTodoHandler} style={{ marginLeft: '17px' }}>
            Update
          </button>
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 400px;
  height: 150px;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 30px;
  opacity: 0.9;
  background: rgb(185, 214, 173);
  input {
    border-radius: 10px;
    border: none;
    height: 35px;
    margin-bottom: 10px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 10px;
    border: none;
    height: 35px;
    width: 80px;
    :active {
      background-color: #afffb7;
    }
  }
`;
