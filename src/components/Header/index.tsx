import { InfoCircleOutlined } from '@ant-design/icons';
import { Layout, theme, Select, DatePicker, DatePickerProps, Tooltip } from 'antd';
import css from './index.module.css';
import { LENGUAGES } from '../../utils/constants';

export const Header = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header style={{ background: colorBgContainer }} className={css.headerContent}>
      <div>
        <Select
          placeholder='Select a language'
          defaultValue='en'
          style={{ width: 175 }}
          onChange={handleChange}
          options={LENGUAGES}
        />
        <Tooltip
          className={css.tooltip}
          title="Allows you to select a language to view wiki's data."
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
      <div>
        <DatePicker onChange={onChange} />
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
