import { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const [grocery, setGrocery] = useState([]);
  const onSubmit = () => {};
  return (
    <section className='section-center'>
      <form onSubmit={onSubmit} className='grocery-form'>
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input type='text' className='grocery' placeholder='e.g eggs' />
          <button type='submit' className='submit-btn'>
            submit
          </button>
        </div>
      </form>
      <div className='grocery-container'>
        <div className='grocery-list'>
          {grocery.map((item) => {
            return <List {...item} key={item.id} />;
          })}
        </div>
        {grocery.length > 0 && (
          <button className='clear-btn'>clear items</button>
        )}
      </div>
    </section>
  );
}

export default App;
