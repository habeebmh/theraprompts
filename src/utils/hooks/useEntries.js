import { post } from '../api';
import { useAPI } from './useAPI';

export const useEntries = (userId) => {
  const { data: entries = [], error, loading } = useAPI(async () => {
    if (!userId) {
      return [];
    }
    const response = await post(process.env.REACT_APP_API_GET_JOURNAL_ENTRIES, { user: userId });
    console.log('response', response);
    return response;
  }, [userId]);

  return { entries, error, loading };
}