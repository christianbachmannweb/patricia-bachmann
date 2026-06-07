import PocketBase from 'pocketbase';
import { mergeEinrichtungen } from '../data/einrichtungen';

const pb = new PocketBase('https://pocketbase.polizen.app');

export interface Einrichtung {
  id: string;
  collectionId: string;
  name: string;
  slug: string;
  typ: 'kita' | 'schule';
  ort: string;
  beschreibung: string;
  seo_title: string;
  seo_description: string;
  status: 'besucht' | 'geplant';
  bilder: string[];
}

export async function getEinrichtungen(): Promise<Einrichtung[]> {
  try {
    const records = await pb.collection('einrichtungen').getFullList<Einrichtung>({
      filter: `status = 'besucht'`,
      sort: 'name',
    });
    return mergeEinrichtungen(records);
  } catch (err) {
    console.warn('PocketBase: collection "einrichtungen" not ready yet:', err);
    return mergeEinrichtungen([]);
  }
}

export async function getEinrichtung(slug: string): Promise<Einrichtung | null> {
  try {
    const record = await pb.collection('einrichtungen').getFirstListItem<Einrichtung>(
      `slug = '${slug}'`
    );
    return record;
  } catch {
    return null;
  }
}

export function getBildUrl(einrichtung: Einrichtung, filename: string): string {
  return pb.files.getURL(einrichtung, filename);
}
