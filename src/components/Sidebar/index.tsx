import { Layout, Menu, MenuProps } from 'antd';
import { StarOutlined, FileImageOutlined, ReadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import css from './index.module.css';

type MenuItem = Required<MenuProps>['items'];

export const Sidebar = () => {
  const navigate = useNavigate();
  const navItems: MenuItem = [
    {
      key: 'article-of-the-day',
      label: 'Article of the day',
      icon: <StarOutlined />,
    },
    {
      key: 'most-read',
      label: 'Most read articles',
      icon: <ReadOutlined />,
    },
    {
      key: 'image',
      label: 'Image of the day',
      icon: <FileImageOutlined />,
    },
  ];

  const onChangePage: MenuProps['onClick'] = e => {
    navigate(`/${e.key}`);
  };

  return (
    <Layout.Sider breakpoint='lg' collapsedWidth='0'>
      <div className={css.logo}>
        <img src='/wiki.svg' alt='wikilogo' />
        <b className={css.logoText}>WikiConsult</b>
      </div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['most-read']}
        items={navItems}
        onClick={onChangePage}
      />
    </Layout.Sider>
  );
};
