import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin, theme } from 'antd';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useFeedParamsContext } from './context/feedContext';
import { useGetFeed } from './api/feed/useGetFeed';
import { ErrorPage } from './pages/ErrorPage';
import css from './App.module.css';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const { language, date } = useFeedParamsContext();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const { refetch, isLoading, isError } = useGetFeed({
    language,
    date,
  });

  React.useEffect(() => {
    navigate('/most-read', { replace: true }); // Redirect to /most-read when App starts
  }, [navigate]);

  // Fetch new data every time date or language is changed
  React.useEffect(() => {
    refetch();
  }, [language, date]);

  if (isLoading)
    return (
      <div className={css.spinner}>
        <Spin size='large'>
          <div className='content' />
        </Spin>
      </div>
    );

  if (isError) return <ErrorPage />;

  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content style={{ margin: '24px 16px 0', overflow: 'auto' }}>
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
        <Footer style={{ height: 100 }}></Footer>
      </Layout>
    </Layout>
  );
};

export default App;
