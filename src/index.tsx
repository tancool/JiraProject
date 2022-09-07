import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProviders } from './context';
import { loadServer,DevTools } from 'jira-dev-tool';

// 这个是在Jira dev tool后面引用
import 'antd/dist/antd.less';

loadServer(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <AppProviders>
      <React.StrictMode>
        <DevTools/>
        <App />
      </React.StrictMode>
    </AppProviders>
  );
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
