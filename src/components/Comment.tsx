import { FC } from 'react';
import { Button } from 'src/style/components';

type CommentProps = {
  writer: {
    name: string;
    avatar?: string;
  };
  comment: {
    timeAgo: string;
    content: string;
  };
  handleReply: () => void;
};

const Comment: FC<CommentProps> = ({ writer, comment, handleReply }) => {
  const Avatar = writer.avatar !== undefined ? 'img' : 'div';
  const avatarProps =
    writer.avatar !== undefined
      ? {
          src: writer.avatar,
          alt: writer.name,
        }
      : { children: writer.name[0] };

  return (
    <article className="my-3 flex gap-3 rounded-xl border border-gray-400 px-3 py-3.5 text-slate-800">
      <div className="inline-flex w-14 flex-none flex-col items-center gap-2 text-sm font-medium text-slate-700">
        <Avatar
          {...avatarProps}
          className="h-10 w-10 rounded-full bg-slate-800 text-center font-bold leading-10 text-amber-50"
        />
        {writer.name}
      </div>
      <div className="flex flex-col gap-1">
        <p>{comment.content}</p>
        <div className="mt-auto flex items-center gap-2 text-xs">
          <div className="text-slate-500">{comment.timeAgo}</div>
          <Button size="sm" onClick={handleReply}>
            대댓글
          </Button>
        </div>
      </div>
    </article>
  );
};

export default Comment;
