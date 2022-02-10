import { useState, useEffect } from 'react';
import db from './firebase.config';
import List from './List';
import Alert from './Alert';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';

function App() {
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

  const [inputValue, setInputValue] = useState('');
  const [groceryList, setGroceryList] = useState([]);

  // CREATE DATA
  const onSubmit = (e) => {
    e.preventDefault();
    addDoc(colRef, { name: inputValue });
    setInputValue('');
    // ALERT
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
            submit
          </button>
        </div>
      </form>
      <div className='grocery-container'>
        <div className='grocery-list'>
          {groceryList.map((item) => {
            return <List {...item} key={item.id} />;
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
