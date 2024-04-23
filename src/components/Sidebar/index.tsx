import { Layout, Menu, MenuProps } from 'antd';
import {
  VideoCameraOutlined,
  StarOutlined,
  AreaChartOutlined,
  FileImageOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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
      icon: <AreaChartOutlined />,
    },
    {
      key: 'image',
      label: 'Image of the day',
      icon: <FileImageOutlined />,
    },
    {
      key: 'news',
      label: "Today's news",
      icon: <ReadOutlined />,
    },
    {
      key: 'today-in-history',
      label: 'Today in history',
      icon: <VideoCameraOutlined />,
    },
  ];

  const onChangePage: MenuProps['onClick'] = e => {
    navigate(`/${e.key}`);
  };

  return (
    <Layout.Sider breakpoint='lg' collapsedWidth='0'>
      <div className='demo-logo-vertical' />
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['article-of-the-day']}
        items={navItems}
        onClick={onChangePage}
      />
    </Layout.Sider>
  );
};
