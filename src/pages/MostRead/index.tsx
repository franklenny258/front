import React from 'react';
import { Card, Col, Row, Pagination, Empty } from 'antd';
import { useGetFeed } from '../../api/feed/useGetFeed';
import { useFeedParamsContext } from '../../context/feedContext';
import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import css from './index.module.css';
import { ErrorPage } from '../ErrorPage';
import { Article } from '../../types/feed';
import { Spinner } from '../../components/Spinner';
import { IMG_PLACEHOLDER } from '../../utils/constants';

const { Meta } = Card;

export const MostRead = () => {
  const { language, date, seenArticles, updateFeedParams } = useFeedParamsContext();
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

  if (!isFetching && articles.length === 0) return <Empty />;
  if (isFetching && articles.length === 0) return <Spinner />;

  return (
    <>
      <h3 className={css.title}>See below a list of the most visited article of {date}!</h3>
      <Row justify='space-between' gutter={[16, 16]}>
        {paginatedArticles.map((article: Article) => (
          <Col span={4} key={article.pageid}>
            <Card
              onClick={() => {
                updateFeedParams({ seenArticles: [...seenArticles!, article.pageid.toString()] });
                window.open(article?.content_urls.desktop.page, '_blank');
              }}
              loading={isFetching}
              hoverable
              className={css.articleCard}
              cover={
                <img
                  alt={article?.titles.normalized}
                  src={article?.thumbnail?.source ? article?.thumbnail?.source : IMG_PLACEHOLDER}
                />
              }
              actions={[
                <>
                  Added: <br />
                  <b>{dayjs(article?.timestamp).format('DD/MM/YYYY')}</b>
                </>,
                <>
                  Views: <br />
                  <b>{article?.views}</b>
                </>,
                // Check if articles have been read by user
                <>
                  Seen by you: <br />
                  {!seenArticles?.find(id => id === article.pageid.toString()) ? (
                    <CloseSquareOutlined style={{ color: 'red' }} />
                  ) : (
                    <CheckSquareOutlined style={{ color: 'green' }} />
                  )}
                </>,
              ]}
            >
              <Meta title={article?.titles.normalized} description={article?.description} />
            </Card>
          </Col>
        ))}
      </Row>
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
