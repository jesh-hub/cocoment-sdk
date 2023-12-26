import type { User } from 'firebase/auth';
import type { MouseEventHandler } from 'react';
import Button from 'src/components/Button';
import { ErrorMessages } from 'src/constants/errors';
import { useUser } from 'src/hooks/useApp';
import { useToaster } from 'src/hooks/useToaster';
import { get } from 'src/services/api';
import { login as loginWithFirebase, logout } from 'src/services/firebase';
import { Popup, RoutePaths } from 'src/services/webapp';
import { toBinary } from 'src/utils/file-reader';

type ProfileInitMessage = {
  init: true;
};
type ProfileDataMessage = {
  avatar?: File;
  nickname: string;
};
type ProfileMessage = ProfileInitMessage & ProfileDataMessage;

const PartHeader = () => {
  const user = useUser();
  const { errorToast } = useToaster();

  const withErrorHandler = async (fn: () => Promise<void> | void) => {
    try {
      await fn();
    } catch (e) {
      const code = (e as Error).message as keyof typeof ErrorMessages;
      errorToast(ErrorMessages[code] || code, {
        reference: null, // TODO
      });
    }
  };

  const openProfile = (name: string, url: string) =>
    withErrorHandler(() => {
      const popup = new Popup<ProfileMessage>(RoutePaths.PROFILE);
      popup.onReceiveMessage = ({ init, ...data }) => {
        if (init) popup.postMessage({ name, url });
        else void onProfileReceiveMessage(data);
      };
      popup.open();
    });

  const onProfileReceiveMessage = ({ avatar, nickname }: ProfileDataMessage) =>
    withErrorHandler(async () => {
      console.log(nickname); // TODO update
      if (avatar !== undefined) await uploadAvatar(avatar);

      async function uploadAvatar(file: File) {
        const { requiredHeaders, s3PresignedURL } = await get<{
          requiredHeaders: { [key: string]: string };
          s3PresignedURL: string;
        }>('/v1/account/profile/upload-url', {
          query: {
            image_format: file.type.replace('image/', ''),
          },
        });
        const result = await toBinary(file);
        console.log(result);
        console.log(s3PresignedURL, requiredHeaders);
      }
    });

  const login = () =>
    withErrorHandler(() => {
      const popup = new Popup<{ provider: string }>(RoutePaths.LOGIN);
      popup.onReceiveMessage = onLoginReceiveMessage;
      popup.open();
    });

  const onLoginReceiveMessage = () =>
    withErrorHandler(async () => {
      const user = await loginWithFirebase();
      await checkFirstLogin(user);
    });

  const checkFirstLogin = async (user: User) => {
    try {
      if (localStorage.getItem('FirstLoginChecked')) return;

      const { isNewUser } = await get<{
        isNewUser: boolean;
      }>('/v1/account/check-new-user');
      if (isNewUser)
        void openProfile(user.displayName || '', user.photoURL || '');
      localStorage.setItem('FirstLoginChecked', '1');
    } catch (e) {
      // 에러처리 하지 않는다.
    }
  };

  return (
    <div className="my-3 text-right">
      {user && (
        <Button
          size="sm"
          weight="semibold"
          onClick={() => {
            const username = user?.displayName || ''; // TODO 백엔드와 같이 가지고 있는 사용자 정보로
            const profileUrl = user?.photoURL || ''; // TODO 백엔드와 같이 가지고 있는 사용자 정보로

            void openProfile(username, profileUrl);
          }}
        >
          프로필 변경
        </Button>
      )}
      {!user && (
        <Button
          size="sm"
          weight="semibold"
          onClick={login as MouseEventHandler<HTMLButtonElement>}
        >
          로그인
        </Button>
      )}
      {user && (
        <Button
          size="sm"
          weight="semibold"
          onClick={logout as MouseEventHandler<HTMLButtonElement>}
        >
          로그아웃
        </Button>
      )}
    </div>
  );
};

export default PartHeader;
