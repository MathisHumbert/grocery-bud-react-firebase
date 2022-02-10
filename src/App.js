import { useState, useEffect } from 'react';
import db from './firebase.config';
import List from './List';
import Alert from './Alert';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [groceryList, setGroceryList] = useState([]);
  const [edit, setEdit] = useState('');
  const [editId, setEditId] = useState('');

  const colRef = collection(db, 'grocery');

  // GET DATA
  useEffect(() => {
    onSnapshot(colRef, (snapchot) => {
      let groceries = [];
      snapchot.docs.forEach((doc) => {
        groceries.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
      setGroceryList(groceries);
    });
  }, []);

  // UPDTAE / CREATE DATA
  const onSubmit = (e) => {
    e.preventDefault();
    // UPDTAE DATA
    if (edit) {
      const docRef = doc(db, 'grocery', editId);
      updateDoc(docRef, { name: inputValue })
        .then(() => {
          // ALERT
          console.log('success');
        })
        .catch((error) => {
          // ALERT
          console.log(error);
        });
      setEdit(false);
      setEditId('');
    }
    // CREATE DATA
    else {
      addDoc(colRef, { name: inputValue })
        .then(() => {
          // ALERT
          console.log('success');
        })
        .catch((error) => {
          // ALERT
          console.log(error);
        });
    }
    setInputValue('');
  };

  const onEdit = (value, id) => {
    setEdit(true);
    setEditId(id);
    setInputValue(value);
  };

  return (
    <section className='section-center'>
      <form onSubmit={onSubmit} className='grocery-form'>
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g eggs'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {edit ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      <div className='grocery-container'>
        <div className='grocery-list'>
          {groceryList.map((item) => {
            return <List {...item} key={item.id} onEdit={onEdit} />;
          })}
        </div>
        {groceryList.length > 0 && (
          <button className='clear-btn'>clear items</button>
        )}
      </div>
    </section>
  );
}

export default App;
