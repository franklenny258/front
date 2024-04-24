import React from 'react';
import { Card, Col, Row, Divider, Pagination } from 'antd';
import { useGetFeed } from '../../api/feed/useGetFeed';
import { useFeedParamsContext } from '../../context/feedContext';
import dayjs from 'dayjs';

import css from './index.module.css';
import { ErrorPage } from '../ErrorPage';
import { Article } from '../../types/feed';

const { Meta } = Card;

export const MostRead = () => {
  const { language, date } = useFeedParamsContext();
  const { data, isFetching, isError } = useGetFeed({
    language,
    date,
  });

  if (isError) return <ErrorPage />;

  const articles = data?.mostread?.articles ?? [];

  // State for pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);

  // Calculate start and end indexes for current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Paginate the articles
  const paginatedArticles = articles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (_current: number, size: number) => {
    setCurrentPage(1); // Reset to first page when changing page size
    setPageSize(size);
  };

  return (
    <>
      <Row justify='space-between' gutter={[16, 16]}>
        {paginatedArticles.map((article: Article) => (
          <Col span={4} key={article.pageid}>
            <Card
              onClick={() => window.open(article?.content_urls.desktop.page, '_blank')}
              loading={isFetching}
              hoverable
              className={css.articleCard}
              cover={
                <img
                  alt={article?.titles.normalized}
                  src={
                    article?.thumbnail?.source
                      ? article?.thumbnail?.source
                      : 'https://ralfvanveen.com/wp-content/uploads//2021/06/Placeholder-_-Begrippenlijst.svg'
                  }
                />
              }
              actions={[
                <span key='added'>
                  Added: <br />
                  <b>{dayjs(article?.timestamp).format('DD/MM/YYYY')}</b>
                </span>,
                <span key='views'>
                  Views: <br />
                  <b>{article?.views}</b>
                </span>,
              ]}
            >
              <Meta title={article?.titles.normalized} description={article?.description} />
            </Card>
          </Col>
        ))}
      </Row>
      <Divider />
      <Pagination
        className={css.pagination}
        current={currentPage}
        total={articles.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        onShowSizeChange={handlePageSizeChange}
        showSizeChanger
        pageSizeOptions={['5', '10', '20', '50']}
      />
    </>
  );
};
