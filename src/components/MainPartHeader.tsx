import Button from 'src/components/Button';
import { ErrorMessages } from 'src/constants/errors';
import { useUser } from 'src/hooks/useApp';
import { useToaster } from 'src/hooks/useToaster';
import { login as loginWithFirebase, logout } from 'src/services/firebase';
import { RoutePaths, openPopup } from 'src/services/webapp';
import type { MouseEventHandler } from 'react';

const PartHeader = () => {
  const user = useUser();
  const { errorToast } = useToaster();

  const withErrorHandler = (fn: () => Promise<void> | void) => async () => {
    try {
      await fn();
    } catch (e) {
      const code = (e as Error).message as keyof typeof ErrorMessages;
      errorToast(ErrorMessages[code] || code, {
        reference: null, // TODO
      });
    }
  };

  const login = withErrorHandler(() => {
    openPopup<{
      provider: string;
    }>(RoutePaths.LOGIN, withErrorHandler(loginWithFirebase));
  });

  return (
    <div className="my-3 text-right">
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
