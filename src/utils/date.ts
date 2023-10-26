const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export const calcTimeAgo = (from: Date) => {
  const literal = (texts: TemplateStringsArray, ...params: number[]) =>
    texts.reduce((acc, cur, i) => {
      return acc + cur + (~~params[i] || '');
    }, '');

  const diff = new Date().getTime() - from.getTime();
  if (diff < SEC) return `방금 전`;
  if (diff < MIN) return literal`${diff / SEC}초 전`;
  if (diff < HOUR) return literal`${diff / MIN}분 전`;
  if (diff < DAY) return literal`${diff / HOUR}시간 전`;
  if (diff < 365 * DAY) return literal`${diff / DAY}일 전`;
  return '오래 전';
};
