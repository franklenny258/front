import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/todays-featured',
        element: <div>FEATURED SIR</div>,
      },
      {
        path: '/most-read',
        element: <div>READ SIR</div>,
      },
      {
        path: '/image',
        element: <div>IMAGE SIR</div>,
      },
      {
        path: '/news',
        element: <div>NEW SIR</div>,
      },
      {
        path: '/on-this-day',
        element: <div>DAY SIR</div>,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
