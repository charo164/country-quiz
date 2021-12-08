import App from '@/App';
import { AppWrapper } from '@/reducer/provider';
import React from 'react';
import ReactDOM from 'react-dom';
import topbar from 'topbar';

topbar.config({
  autoRun: true,
  barThickness: 3,
  barColors: {
    0: '#f9a826',
  },
  shadowBlur: 10,
  shadowColor: 'rgba(0,   0,   0,   .6)',
});

ReactDOM.render(
  <AppWrapper>
    <App />
  </AppWrapper>,
  document.getElementById('root'),
);
