
const featureFlags = { 
  'accounts': process.env.REACT_APP_FEATURE_FLAG_ACCOUNTS === 'true',
}

export const useFeatureFlag = (featureFlag) => {
  return featureFlags[featureFlag];
};