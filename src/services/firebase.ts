// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';
import type { NextOrObserver, Unsubscribe, User } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC3G3KFeEf4I6PZdk-8Ry6ZFf2fntjF0F4',
  // TODO 리디렉션 도메인 맞춤설정하기
  // https://firebase.google.com/docs/auth/web/google-signin?hl=ko#expandable-4
  authDomain: 'cocoment-dev.firebaseapp.com',
  projectId: 'cocoment-dev',
  storageBucket: 'cocoment-dev.appspot.com',
  messagingSenderId: '652317155962',
  appId: '1:652317155962:web:a819a1390a1d2de0cbd1c3',
};
// const app =
initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const login = async () => {
  try {
    // const result =
    await signInWithPopup(auth, provider);

    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential?.accessToken;
  } catch (e) {
    // TODO 브라우저 팝업 설정 등 에러 코드 확인
    const error = e as FirebaseError;
    // const errorCode = error.code;
    // const email = error.customData?.email || '';
    // const credential = GoogleAuthProvider.credentialFromError(error);

    throw new Error(error.code);
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const subscribeAuthState = (
  cb: NextOrObserver<User | null>,
): Unsubscribe => {
  return auth.onAuthStateChanged(cb);
};
