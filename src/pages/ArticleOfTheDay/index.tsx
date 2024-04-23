import { Card } from 'antd';

const { Meta } = Card;

export const ArticleOfTheDay = () => {
  return (
    <Card
      onClick={() => console.log('hey')}
      loading={false}
      hoverable
      style={{ width: 240 }}
      cover={<img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}
    >
      <Meta title='Europe Street beat' description='www.instagram.com' />
    </Card>
  );
};
