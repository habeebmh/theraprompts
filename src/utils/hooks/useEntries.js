import { post } from '../api';
import { useAPI } from './useAPI';

export const useEntries = (userId) => {
  const { data: entries, error, isLoading } = useAPI(async () => {
    const response = await post('https://getjournalentries-xa34nfyqgq-uc.a.run.app', { user: userId });
    return response.json();
  }, [userId]);

  return { entries, error, isLoading };
}