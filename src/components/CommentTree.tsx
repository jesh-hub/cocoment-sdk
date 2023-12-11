import Comment from 'src/components/Comment';
import WritableComment from 'src/components/WritableComment';
import type { FC } from 'react';
import type { VisualComment } from 'types/comment';

type CommentTreeProps = {
  parentId?: string; // uuid
  comments: VisualComment[];
  onToggleReply?: (id: string) => void;
  onSubmitReply: (
    content: string,
    userName: string,
    parentId?: string,
  ) => Promise<void>;
};

const CommentTree: FC<CommentTreeProps> = ({
  parentId,
  comments,
  onToggleReply,
  onSubmitReply,
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
                onClickReply={onToggleReply}
              />
              {childrenVisible && (
                <CommentTree
                  parentId={id}
                  comments={child || []}
                  onSubmitReply={onSubmitReply}
                />
              )}
            </li>
          ),
        )}
      </ul>
      {parentId !== undefined && (
        <WritableComment onSubmit={(c, u) => onSubmitReply(c, u, parentId)} />
      )}
    </div>
  );
};

export default CommentTree;
