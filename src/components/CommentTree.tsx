import React from 'react';
import Comment from 'src/components/Comment';
import WritableComment from 'src/components/WritableComment';
import { VisualComment } from 'src/types/Comment.ts';

type CommentTreeProps = {
  comments: VisualComment[];
  handleClickReply?: (id: string) => () => void;
  handlePostComment: (
    content: string,
    userName: string,
    parentId?: string,
  ) => Promise<void>;
  level?: number;
};

const CommentTree: React.FC<CommentTreeProps> = ({
  comments,
  handleClickReply,
  handlePostComment,
  level = 0,
}) => {
  return (
    <ul className={`ml-${8 * level}`}>
      {comments.map(
        ({ id, created_at, body_text, user_id, childrenVisible, childs }) => (
          <li key={id}>
            <Comment
              comment={{
                id,
                created: new Date(created_at),
                content: body_text || '',
              }}
              writer={{ name: user_id }}
              handleClickReply={handleClickReply}
            />
            {childrenVisible && (
              <CommentTree
                comments={childs}
                handlePostComment={handlePostComment}
                level={level + 1}
              />
            )}
          </li>
        ),
      )}
      <li>
        <WritableComment handleSubmit={handlePostComment} />
      </li>
    </ul>
  );
};

export default CommentTree;
