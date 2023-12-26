export enum ErrorCodes {
  ILLEGIBLE_FILE = 'illegible-file',
  POPUP_BLOCKED = 'popup-blocked',
}

export const ErrorMessages = {
  // TODO FAQ 링크
  [ErrorCodes.ILLEGIBLE_FILE]: '첨부하신 파일을 처리할 수 없습니다.',
  [ErrorCodes.POPUP_BLOCKED]: '팝업 차단을 해제해주세요.',
  'auth/popup-blocked': '팝업 차단을 해제해주세요.',
};
