import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { ContactsT } from './types';

export const getContacts = async ({ variant }: { variant?: string }): Promise<ContactsT | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/design/contacts`, {
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
