import { useRouteError } from 'react-router-dom';
import css from './index.module.css';

interface RouteError {
  statusText?: string;
  message?: string;
}

export const ErrorPage = () => {
  const error = useRouteError() as RouteError;

  return (
    <main className={css.main}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </main>
  );
};
