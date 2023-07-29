import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import initializeFirebaseClient from './initFirebase';

export async function firebaseStorageUpload(file, currentUser, setLoading) {
  const { storage } = initializeFirebaseClient();
  const fileRef = ref(storage, `avatars/${currentUser?.uid}.png`);
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  setLoading(false);
  return { snapshot, url };
}
