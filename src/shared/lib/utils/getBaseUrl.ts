export const getApiBaseUrl = (variant?: string) => {
  const baseApiUrl = variant
    ? `https://${variant}.webspaceteam.by/api`
    : process.env.NEXT_PUBLIC_API_URL;

  return baseApiUrl;
};

export const getStoreBaseUrl = (variant?: string) => {
  const baseApiUrl = variant
    ? `https://${variant}.webspaceteam.by/storage`
    : process.env.NEXT_PUBLIC_STORE_URL;

  return baseApiUrl;
};

export const getSiteBaseUrl = (variant?: string) => {
  const baseApiUrl = variant
    ? `https://${variant}.webspaceteam.by`
    : process.env.NEXT_PUBLIC_SITE_URL;

  return baseApiUrl;
};