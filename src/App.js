import { useState, useEffect } from 'react';
import db from './firebase.config';
import List from './List';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import LoginSignUp from './LoginSignUp';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [groceryList, setGroceryList] = useState([]);
  const [edit, setEdit] = useState('');
  const [editId, setEditId] = useState('');
  const [toggleLogin, setToggleLogin] = useState(false);
  const [userId, setUserId] = useState(null);

  const colRef = collection(db, 'grocery');
  const auth = getAuth();

  // UPDATE / CREATE DATA
  const onSubmit = (e) => {
    e.preventDefault();
    // UPDATE DATA
    if (edit) {
      const docRef = doc(db, 'grocery', editId);
      updateDoc(docRef, { name: inputValue })
        .then(() => {})
        .catch((error) => {
          console.log(error.message);
        });
      setEdit(false);
      setEditId('');
    }
    // CREATE DATA
    else {
      addDoc(colRef, { name: inputValue, userRef: userId })
        .then(() => {})
        .catch((error) => {
          console.log(error.message);
        });
    }
    setInputValue('');
  };

  // HANDLE EDIT
  const onEdit = (value, id) => {
    setEdit(true);
    setEditId(id);
    setInputValue(value);
  };

  // DELETE ALL DATA
  const clearAllItems = () => {
    groceryList.forEach((item) => {
      const docRef = doc(db, 'grocery', item.id);
      deleteDoc(docRef);
    });
  };

  // LOUGOUT
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        setUserId(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // GET DATA
  useEffect(() => {
    const q = query(colRef, where('userRef', '==', userId));
    onSnapshot(q, (snapchot) => {
      let groceries = [];
      snapchot.docs.forEach((doc) => {
        groceries.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
      setGroceryList(groceries);
    });
  }, [userId]);

  useEffect(() => {
    setUserId((auth.currentUser && auth.currentUser.uid) || null);
  }, [auth.currentUser]);

  return (
    <>
      <LoginSignUp toggleLogin={toggleLogin} setToggleLogin={setToggleLogin} />
      <section className='section-center'>
        <header>
          <h3>grocery bud</h3>
          {!userId && <h4>login to save your grocery list</h4>}
          {userId ? (
            <button type='button' className='login-btn' onClick={logoutUser}>
              logout
            </button>
          ) : (
            <button
              type='button'
              className='login-btn'
              onClick={() => setToggleLogin(true)}
            >
              login
            </button>
          )}
        </header>
        <form onSubmit={onSubmit} className='grocery-form'>
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
            <button className='clear-btn' onClick={clearAllItems}>
              clear items
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
