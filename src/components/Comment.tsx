import React from 'react';
import { Button } from 'src/components/Button';
import { calcTimeAgo } from 'src/utils/date';

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
  handleClickReply?: (id: string) => () => void;
};

const Comment: React.FC<CommentProps> = ({
  comment,
  writer,
  handleClickReply,
}) => {
  return (
    <div className="my-3 flex flex-col gap-3 rounded-lg border border-gray-300 px-3 py-3.5 text-slate-800 shadow">
      <div className="flex items-center gap-2">
        {writer.avatar !== undefined && (
          <img
            src={writer.avatar}
            alt={writer.name}
            className="box-border inline-block h-10 w-10 rounded-full border border-slate-300"
          />
        )}
        {writer.avatar === undefined && (
          <div className="box-border inline-block h-10 w-10 rounded-full border border-slate-500 bg-slate-800 text-center font-bold leading-10 text-amber-50">
            {writer.name[0]}
          </div>
        )}
        <div>
          {writer.name}
          <div className="mt-auto flex items-center gap-2 text-xs">
            <div className="text-slate-500">{calcTimeAgo(comment.created)}</div>
            {handleClickReply !== undefined && (
              <Button size="sm" onClick={handleClickReply(comment.id)}>
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
