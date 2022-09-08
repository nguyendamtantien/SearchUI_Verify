import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import NavScroll from './components/Navbar';
import SearchInvoices from './components/SearchInvoices';
import reportWebVitals from './reportWebVitals';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavScroll></NavScroll>
    <SearchInvoices></SearchInvoices>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
