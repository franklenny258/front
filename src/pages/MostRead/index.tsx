import { Card } from 'antd';
import { useGetFeed } from '../../api/feed/useGetFeed';
import { useFeedParamsContext } from '../../context/feedContext';

const { Meta } = Card;

export const MostRead = () => {
  const { language, date } = useFeedParamsContext();
  const { data, isLoading, isError } = useGetFeed({
    language,
    date,
  });

  return (
    <Card
      onClick={() => console.log('hey')}
      loading={isLoading}
      hoverable
      style={{ width: 240 }}
      cover={<img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}
    >
      <Meta title='Europe Street beat' description='www.instagram.com' />
    </Card>
  );
};
