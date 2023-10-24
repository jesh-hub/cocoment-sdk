import Button from 'src/components/Button';
import { ErrorMessages } from 'src/constants/errors';
import useApp from 'src/hooks/useApp';
import useToast from 'src/hooks/useToast';
import { login, logout } from 'src/services/firebase';
import { RoutePaths, openPopup } from 'src/services/webapp';

const PartHeader = () => {
  const { user } = useApp();
  const { errorToast } = useToast();

  const withErrorHandler = (fn: Function) => async () => {
    try {
      await fn();
    } catch (e) {
      const code = (e as Error).message as keyof typeof ErrorMessages;
      errorToast(ErrorMessages[code] || code);
    }
  };

  return (
    <div className="my-3 text-right">
      {!user && (
        <Button
          size="sm"
          weight="semibold"
          disabled={user === undefined}
          onClick={withErrorHandler(() => {
            openPopup(RoutePaths.LOGIN, withErrorHandler(login));
          })}
        >
          로그인
        </Button>
      )}
      {user && (
        <Button size="sm" weight="semibold" onClick={logout}>
          로그아웃
        </Button>
      )}
    </div>
  );
};

export default PartHeader;
