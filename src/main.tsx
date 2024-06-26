import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage/index.tsx';
import { ArticleOfTheDay } from './pages/ArticleOfTheDay/index.tsx';
import { MostRead } from './pages/MostRead/index.tsx';
import { FeedParamnsProvider } from './context/feedContext.tsx';
import { ImageOfTheDay } from './pages/ImageOfTheDay/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/article-of-the-day',
        element: <ArticleOfTheDay />,
      },
      {
        path: '/most-read',
        element: <MostRead />,
      },
      {
        path: '/image',
        element: <ImageOfTheDay />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FeedParamnsProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </FeedParamnsProvider>
  </React.StrictMode>,
);
