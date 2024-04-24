import { Card, Empty } from 'antd';
import { useGetFeed } from '../../api/feed/useGetFeed';
import { useFeedParamsContext } from '../../context/feedContext';
import { TodaysFeaturedArticle } from '../../types/feed';
import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import css from './index.module.css';
import { ErrorPage } from '../ErrorPage';
import { Spinner } from '../../components/Spinner';
import { IMG_PLACEHOLDER } from '../../utils/constants';

const { Meta } = Card;

export const ArticleOfTheDay = () => {
  const { language, date, seenArticles, updateFeedParams } = useFeedParamsContext();
  const { data, isFetching, isError } = useGetFeed({
    language,
    date,
  });

  if (isError) return <ErrorPage />;

  const articleOftheDay: TodaysFeaturedArticle | undefined = data?.tfa;

  // Make sure article of the day exist before rendering
  if (!isFetching && !articleOftheDay?.pageid) return <Empty />;
  if (isFetching && !articleOftheDay) return <Spinner />;

  return (
    <>
      <h3 className={css.title}>See below the most featured article of {date}!</h3>
      <Card
        className={css.articleCard}
        title={articleOftheDay?.titles.normalized}
        onClick={() => {
          if (isFetching) return;
          updateFeedParams({
            seenArticles: [...seenArticles!, articleOftheDay!.pageid.toString()],
          });
          window.open(articleOftheDay?.content_urls.desktop.page, '_blank');
        }}
        loading={isFetching}
        hoverable={!isFetching}
        cover={
          <img
            alt={articleOftheDay?.titles.normalized}
            src={
              articleOftheDay?.thumbnail?.source
                ? articleOftheDay?.thumbnail?.source
                : IMG_PLACEHOLDER
            }
          />
        }
        actions={[
          <>
            Added: <br />
            <b>{dayjs(articleOftheDay?.timestamp).format('DD/MM/YYYY')}</b>
          </>,
          // Check if article have been read by user
          <>
            Seen by you: <br />
            {!seenArticles?.find(id => id === articleOftheDay!.pageid.toString()) ? (
              <CloseSquareOutlined style={{ color: 'red' }} />
            ) : (
              <CheckSquareOutlined style={{ color: 'green' }} />
            )}
          </>,
        ]}
      >
        <Meta
          title={articleOftheDay?.description}
          description={`${articleOftheDay?.extract.substring(0, 150)}...`}
        />
      </Card>
    </>
  );
};
