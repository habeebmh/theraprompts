import { post } from '../api';


export const createEntry = async (userId, prompt, index, topic, content) => {
  const response = await post(process.env.REACT_APP_API_CREATE_JOURNAL_ENTRY, { 
    user: userId, 
    promptText: prompt, 
    index, 
    topic, 
    content 
  });
  return response;
};