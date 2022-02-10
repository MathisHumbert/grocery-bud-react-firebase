import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ name, id }) => {
  return (
    <article className='grocery-item'>
      <p className='title'>{name}</p>
      <div className='btn-container'>
        <button type='button' className='edit-btn'>
          <FaEdit />
        </button>
        <button type='button' className='delete-btn'>
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

export default List;
