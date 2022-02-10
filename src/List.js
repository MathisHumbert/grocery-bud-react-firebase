import { deleteDoc, doc } from 'firebase/firestore';
import { FaEdit, FaTrash } from 'react-icons/fa';
import db from './firebase.config';

const List = ({ name, id }) => {
  // DELETE DATA
  const onDelete = async (groceryId) => {
    const docRef = doc(db, 'grocery', groceryId);
    try {
      await deleteDoc(docRef);
      // ALERT
    } catch (error) {
      console.log(error.message);
      // ALERT
    }
  };

  // UPDATE DATA
  const onEdit = () => {};

  return (
    <article className='grocery-item'>
      <p className='title'>{name}</p>
      <div className='btn-container'>
        <button type='button' className='edit-btn' onClick={() => onEdit(id)}>
          <FaEdit />
        </button>
        <button
          type='button'
          className='delete-btn'
          onClick={() => onDelete(id)}
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

export default List;
