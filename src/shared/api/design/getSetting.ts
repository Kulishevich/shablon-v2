import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { SettingsT } from './types';

export const getSetting = async ({ variant }: { variant?: string }): Promise<SettingsT | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/design/settings`, {
      next: {
        revalidate: 60,
      },
    });

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
