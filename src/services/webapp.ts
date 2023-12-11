const PopupCloseTimeout = 60 * 1000;

export enum RoutePaths {
  LOGIN = '/login',
}

export const openPopup = <T>(
  path: RoutePaths,
  onReceiveMessage: (data?: T) => Promise<void> | void,
) => {
  const popup = window.open(
    import.meta.env.VITE_APP_WEBAPP_URL + path,
    '_blank',
    'width=540,height=600',
  );
  if (popup === null) throw new Error('popup-blocked');

  const handleReceiveMessage = ({ origin, data, source }: MessageEvent<T>) => {
    if (source !== popup) return;
    if (origin !== import.meta.env.VITE_APP_WEBAPP_URL) return;

    // console.log('onReceiveMessage', data);
    void onReceiveMessage(data);
  };

  addEventListener('message', handleReceiveMessage);
  // 일정 시간 이후에 자동으로 닫으면서 Event Listener를 정리한다.
  setTimeout(() => {
    if (!popup.closed) popup.close();
    removeEventListener('message', handleReceiveMessage);
  }, PopupCloseTimeout);
};
