import { ErrorCodes } from 'src/constants/errors';

const DefaultStopReceiveDelay = 60 * 1000;

export enum RoutePaths {
  LOGIN = '/login',
  PROFILE = '/profile',
}

export class Popup<T> {
  path: RoutePaths;
  popup?: Window;
  receiveTimeout: number;
  onReceiveMessage?: (data: T) => Promise<void> | void;

  /**
   * @param path
   * @param delay - `delay <= 0` 또는 `false` 인 경우 no timeout
   */
  constructor(
    path: RoutePaths,
    delay: number | false = DefaultStopReceiveDelay,
  ) {
    this.path = path;
    if (typeof delay === 'number' && delay > 0) this.receiveTimeout = delay;
    else this.receiveTimeout = 0;
  }

  /**
   * @description 오픈하기 전에 onReceiveMessage 정의할 것
   * @example
   *
   * const popup = new Popup<T>('/path');
   * popup.onReceiveMessage = (data: T) => console.log('receive', data);
   * popup.open();
   */
  open() {
    const popup = window.open(
      import.meta.env.VITE_APP_WEBAPP_URL + this.path,
      '_blank',
      'width=540, height=600',
    );
    if (popup === null) throw new Error(ErrorCodes.POPUP_BLOCKED);
    this.popup = popup;

    const stopReceiveMessage = this.startReceiveMessage();
    if (this.receiveTimeout > 0)
      setTimeout(() => {
        stopReceiveMessage();
      }, this.receiveTimeout);
  }

  startReceiveMessage() {
    const onReceiveMessage = ({ origin, data, source }: MessageEvent<T>) => {
      if (source !== this.popup) return;
      if (origin !== import.meta.env.VITE_APP_WEBAPP_URL) return;

      // console.log('onReceiveMessage', data);
      // TODO keep alive
      if (this.onReceiveMessage !== undefined) void this.onReceiveMessage(data);
    };

    addEventListener('message', onReceiveMessage);
    return () => {
      // console.log('stopReceiveMessage');
      this.popup?.close();
      removeEventListener('message', onReceiveMessage);
    };
  }

  postMessage<D>(data: D) {
    this.popup?.postMessage(data, import.meta.env.VITE_APP_WEBAPP_URL);
  }
}
