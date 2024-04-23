import { useQuery } from '@tanstack/react-query';
import { _get } from '../apiClient';
import { FeedType } from '../../types/feed';

type GetFeedQueryParams = {
  language: string;
  date: string;
};

const FEED_KEY = ['Feed'];

const fetchFeed = async ({ language, date }: GetFeedQueryParams): Promise<FeedType> => {
  const { data } = await _get(`/feed/v1/wikipedia/${language}/featured/${date}`);
  return data;
};

export const useGetFeed = (params: GetFeedQueryParams) => {
  return useQuery<FeedType, Error>({ queryKey: FEED_KEY, queryFn: () => fetchFeed(params) });
};
