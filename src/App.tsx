import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useNavigate } from 'react-router-dom';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/article-of-the-day', { replace: true }); // Redirect to /article-of-the-day when App starts
  }, [navigate]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Wiki feed app ©{new Date().getFullYear()} Challenge project.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
