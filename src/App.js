import './App.css';
import React, { useState, useMemo, useEffect, createElement } from 'react';
import debounce from 'lodash.debounce';
import _ from 'lodash';

const App = () => {
  const [count, setCount] = useState(0); 
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');

  const a = [1200, 400];
  const b = [670, 500];
  const c = [850, 200];

  let arr = [];
  let current = [1200, 400];

  useEffect(() => {
    if(count !== 0) {
      addResults(count)
    }
  }, [count]); 
  
  const getElement =  ([a,b], item) => {
    return createElement('div', {key: item, style: { position:'absolute', left:`${a}px`, top:`${b}px`}}, '.' );
  };
  const getRandom = () => Math.floor(Math.random() * 3 + 1);

  const addResults = (count) => {
    _.times(count, (item) => {
      const rand = getRandom();
      console.log("--------!!!----item---", item)
      if(rand === 1){
        current[0] = (current[0]+a[0])/2
        current[1] = (current[1]+a[1])/2
      }
      if(rand === 2){
        current[0] = (current[0]+b[0])/2
        current[1] = (current[1]+b[1])/2
      }
      if(rand === 3){
        current[0] = (current[0]+c[0])/2
        current[1] = (current[1]+c[1])/2
      }
      arr.push(getElement(current, item));
    })
    setResult(arr);
  }
 
  const handleChange = (event) => {
    const { target: { value } = {} } = event || {};
    if(value <= 0 || value > 20000) {
      setError('Enter a number that is greater than zero and less then 20000');
    } else {
      setError(_.isEmpty(''));
      setCount(event.target.value);
    }
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(handleChange, 1000)
  , []);

  return(
    <div className='main'>
      <div style={{ 'padding-top': '30px' }}>
        <label style={{ 'padding-right': '10px' }}>Enter a number :</label>
      </div>
      <div className='body1'>
        <input type="number" min="1" max="20000" onChange={debouncedChangeHandler} />
      </div>
      <div className='body1'>
        <span style={{ color: 'red', 'padding-bottom': '30px' }}>{!_.isEmpty(error) && error}</span>
      </div>

      <div className='body2'>
        {count}
      </div>
      {React.createElement('div', {key: 'a', style: { position:'absolute', left:`${a[0]}px`, top:`${a[1]}px`}}, '. A' )}
      {React.createElement('div', {key: 'b', style: { position:'absolute', left:`${b[0]}px`, top:`${b[1]}px`}}, 'B  .' )}
      {React.createElement('div', {key: 'c', style: { position:'absolute', left:`${c[0]}px`, top:`${c[1]}px`}}, '. C' )}
      {result}
    </div>
  )
};

export default App;
