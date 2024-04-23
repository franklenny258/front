import { InfoCircleOutlined } from '@ant-design/icons';
import { Layout, theme, Select, DatePicker, DatePickerProps, Tooltip } from 'antd';
import css from './index.module.css';
import { LANGUAGES } from '../../utils/constants';
import dayjs from 'dayjs';
import { useFeedParamsContext } from '../../context/feedContext';

export const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { language, date, updateFeedParams } = useFeedParamsContext();

  const handleChangeLanguage = (value: string) => {
    updateFeedParams({ language: value });
  };

  const handleChangeDate: DatePickerProps['onChange'] = date => {
    updateFeedParams({ date: date.format('YYYY/MM/DD') });
  };

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
