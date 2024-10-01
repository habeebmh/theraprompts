import { useAPI } from './useAPI';
import { post } from '../api';

export const useEntry = (userId, entryId) => {
  const { data: entry, error, loading } = useAPI(async () => {
        if (!userId) {
      return undefined;
    }
    const response = await post(process.env.REACT_APP_API_GET_JOURNAL_ENTRY, { user: userId, entry: entryId });
    return response;
  }, [userId, entryId]);

  return { entry, error, loading };
}