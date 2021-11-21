import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import background from "./img/wpp.jpg";




ReactDOM.render(
  <React.StrictMode>
    <div
      style={{
        // backgroundImage: `url("https://images.wallpapersden.com/image/wxl-squid-game-worker-digital_80018.jpg")`,
        backgroundImage: `url(${background})`,
        backgroundPosition: 'position',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '120vh'
      }}
    >
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
