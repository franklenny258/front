import { Card, Empty } from 'antd';
import { useGetFeed } from '../../api/feed/useGetFeed';
import { useFeedParamsContext } from '../../context/feedContext';
import { Image } from '../../types/feed';
import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';
import css from './index.module.css';
import { ErrorPage } from '../ErrorPage';
import { Spinner } from '../../components/Spinner';
import { IMG_PLACEHOLDER } from '../../utils/constants';

const { Meta } = Card;

export const ImageOfTheDay = () => {
  const { language, date, seenArticles, updateFeedParams } = useFeedParamsContext();
  const { data, isFetching, isError } = useGetFeed({
    language,
    date,
  });

  if (isError) return <ErrorPage />;

  const imageOfTheDay: Image | undefined = data?.image;

  // Make sure image of the day exist before rendering
  if (!isFetching && !imageOfTheDay?.wb_entity_id) return <Empty />;
  if (isFetching && !imageOfTheDay) return <Spinner />;

  return (
    <>
      <h3 className={css.title}>See below the most featured image of {date}!</h3>
      <Card
        className={css.articleCard}
        onClick={() => {
          if (isFetching) return;
          updateFeedParams({
            seenArticles: [...seenArticles!, imageOfTheDay!.wb_entity_id],
          });
          window.open(imageOfTheDay?.file_page, '_blank');
        }}
        loading={isFetching}
        hoverable={!isFetching}
        cover={
          <img
            alt={imageOfTheDay?.title}
            src={
              imageOfTheDay?.thumbnail?.source ? imageOfTheDay?.thumbnail?.source : IMG_PLACEHOLDER
            }
          />
        }
        actions={[
          <>
            By: <br />
            <b>{imageOfTheDay?.artist.text}</b>
          </>,
          // Check if article have been read by user
          <>
            Seen by you: <br />
            {!seenArticles?.find(id => id === imageOfTheDay?.wb_entity_id) ? (
              <CloseSquareOutlined style={{ color: 'red' }} />
            ) : (
              <CheckSquareOutlined style={{ color: 'green' }} />
            )}
          </>,
        ]}
      >
        <Meta title={imageOfTheDay?.title} description={imageOfTheDay?.description?.text} />
      </Card>
    </>
  );
};
