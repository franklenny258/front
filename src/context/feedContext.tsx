import React from 'react';
import dayjs from 'dayjs';

type FeedParams = {
  language?: string;
  date?: string;
};

type FeedParamsContextType = {
  language?: string;
  date?: string;
  updateFeedParams: (params: FeedParams) => void;
};

const FeedParamsContext = React.createContext<FeedParamsContextType | null>(null);

export const FeedParamnsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [feedParamns, setFeedParams] = React.useState<FeedParams>({
    language: 'en',
    date: dayjs(new Date()).format('YYYY/MM/DD'),
  });

  const updateFeedParams = (inputParams: FeedParams) => {
    setFeedParams({ ...feedParamns, ...inputParams });
  };

  return (
    <FeedParamsContext.Provider value={{ ...feedParamns, updateFeedParams }}>
      {children}
    </FeedParamsContext.Provider>
  );
};

export const useFeedParamsContext = () => {
  const feedParams = React.useContext(FeedParamsContext) as FeedParamsContextType;
  return feedParams;
};
