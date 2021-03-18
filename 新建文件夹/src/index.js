import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  // 严格模式，在开发的时候如果打开了这个标签生命周期会走两遍，上线之后恢复正常直走一遍。
  // <React.StrictMode>
  // </React.StrictMode>
  <App />,
  document.getElementById('root')
);
