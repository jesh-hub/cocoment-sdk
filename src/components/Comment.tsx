import Button from 'src/components/Button';
import { calcTimeAgo } from 'src/utils/date';
import Avatar from 'src/components/Avatar';
import type { FC } from 'react';

type CommentProps = {
  comment: {
    id: string;
    created: Date;
    content: string;
  };
  writer: {
    name: string;
    avatar?: string;
  };
  onClickReply?: (id: string) => void;
};

const Comment: FC<CommentProps> = ({ comment, writer, onClickReply }) => {
  return (
    <div className="my-3 flex flex-col gap-3 rounded-lg border border-gray-300 px-3 py-3.5 text-slate-800 shadow">
      <div className="flex items-center gap-2">
        <Avatar dataUrl={writer.avatar} name={writer.name} />
        <div>
          {writer.name}
          <div className="mt-auto flex items-center gap-2 text-xs">
            <div className="text-slate-500">{calcTimeAgo(comment.created)}</div>
            {onClickReply !== undefined && (
              <Button
                size="sm"
                weight="semibold"
                onClick={() => onClickReply(comment.id)}
              >
                대댓글
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p>{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
