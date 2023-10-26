import React from 'react';
import Comment from 'src/components/Comment';
import WritableComment from 'src/components/WritableComment';
import type { VisualComment } from 'types/comment';

type CommentTreeProps = {
  parentId?: string; // uuid
  comments: VisualComment[];
  handleClickReply?: (id: string) => () => void;
  handlePostComment: (
    content: string,
    userName: string,
    parentId?: string,
  ) => Promise<void>;
};

const CommentTree: React.FC<CommentTreeProps> = ({
  parentId,
  comments,
  handleClickReply,
  handlePostComment,
}) => {
  return (
    <div className={parentId && `ml-8`}>
      <ul>
        {comments.map(
          ({ id, created_at, body_text, user_id, childrenVisible, child }) => (
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
                  parentId={id}
                  comments={child || []}
                  handlePostComment={handlePostComment}
                />
              )}
            </li>
          ),
        )}
      </ul>
      {parentId !== undefined && (
        <WritableComment
          handleSubmit={(c, u) => handlePostComment(c, u, parentId)}
        />
      )}
    </div>
  );
};

export default CommentTree;
