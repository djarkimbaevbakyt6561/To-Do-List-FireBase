import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import checkIcon from '../../assets/icons/check-icon.png';
import deleteIcon from '../../assets/icons/delete-icon.png';
import editIcon from '../../assets/icons/edit.png';
import { todosTypes } from '../../constants/actionTypes';
import { completedTodo, deleteTodo } from '../../store/todos';
import { Modal } from '../modal/Modal';
export const TodoItem = ({ title, date, id, index, checked }) => {
  const todos = useSelector((store) => store.todos);
  const dispatch = useDispatch();
  function completedHandler() {
    dispatch(completedTodo(checked, id));
  }
  function deleteHandler() {
    dispatch(deleteTodo(id))
  }
  function toggleModalHandler() {
    dispatch({ type: todosTypes.OPEN_MODAL, payload: id });
  }
  return (
    <>
      <ListItem state={todos.todos[index].checked}>
        <p>{title}</p>
        <DateAndFuncContainer>
          <p>{date}</p>
          <FunctionContainer>
            <img onClick={completedHandler} src={checkIcon} />
            <img onClick={deleteHandler} src={deleteIcon} />
            <EditIcon onClick={toggleModalHandler} src={editIcon} />
          </FunctionContainer>
        </DateAndFuncContainer>
      </ListItem>
      {todos.todos[index].openModal &&
        createPortal(
          <Modal todo={todos.todos[index]} onClick={toggleModalHandler} />,
          document.getElementById('modal')
        )}
    </>
  );
};
const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  text-decoration: none;
  font-size: 18px;
  p {
    text-decoration: ${(props) => (props.state ? 'line-through' : 'none')};
  }
`;
const FunctionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
  img {
    width: 24px;
    cursor: pointer;
  }
`;
const EditIcon = styled.img`
  width: 22px !important;
  height: 22px !important;
`;
const DateAndFuncContainer = styled.div`
  display: flex;
  p {
    margin: 0;
    margin-right: 20px;
  }
`;
