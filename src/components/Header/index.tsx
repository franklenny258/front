import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Layout, theme, Select, DatePicker, DatePickerProps, Tooltip } from 'antd';
import css from './index.module.css';
import { LANGUAGES } from '../../utils/constants';
import dayjs from 'dayjs';
import { useGetFeed } from '../../api/feed/useGetFeed';

export const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [date, setDate] = React.useState(dayjs(new Date()).format('YYYY/MM/DD'));
  const [language, setLanguage] = React.useState('en');
  const {
    data: feed,
    refetch,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetFeed({ language, date });

  const handleChangeLanguage = (value: string) => {
    setLanguage(value);
  };

  const handleChangeDate: DatePickerProps['onChange'] = date => {
    setDate(date.format('YYYY/MM/DD'));
  };

  // Fetch new data every time date or language is changed
  React.useEffect(() => {
    refetch();
  }, [language, date]);

  return (
    <Layout.Header style={{ background: colorBgContainer }} className={css.headerContent}>
      <div>
        <Select
          placeholder='Select a language'
          defaultValue={language}
          style={{ width: 175 }}
          onChange={handleChangeLanguage}
          options={LANGUAGES}
        />
        <Tooltip
          className={css.tooltip}
          title="Allows you to select a language to view wiki's data."
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
      <div>
        <DatePicker onChange={handleChangeDate} defaultValue={dayjs(date)} />
        <Tooltip
          className={css.tooltip}
          title="Allows you to select the date you wish to view wiki's data from."
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    </Layout.Header>
  );
};
