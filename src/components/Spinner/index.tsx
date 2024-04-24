import { Spin } from 'antd';
import css from './index.module.css';

export const Spinner = () => {
  return (
    <div className={css.spinner}>
      <Spin size='large'>
        <div className='content' />
      </Spin>
    </div>
  );
};
