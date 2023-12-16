import { useCallback, useEffect, useState } from 'react';
import CommentTree from 'src/components/CommentTree';
import ConditionalSpinner from 'src/components/ConditionalSpinner';
import MainPartHeader from 'src/components/MainPartHeader';
import WritableComment from 'src/components/WritableComment.tsx';
import { usePageId } from 'src/hooks/useApp';
import { useProcessor } from 'src/hooks/useProcessor';
import { get, post } from 'src/services/api';
import type {
  CcmtComment,
  CcmtCommentPostBody,
  VisualComment,
} from 'types/comment';
import type { FC } from 'react';

const MainPart: FC = () => {
  const pageId = usePageId();
  const [processingCount, process] = useProcessor();

  const [comments, setComments] = useState<VisualComment[]>([]);

  const fetchComments = useCallback(
    async (signal?: AbortSignal) => {
      const res = await process(() =>
        get<CcmtComment[]>('/v1/comment', {
          query: { page_id: pageId },
          signal,
        }),
      );
      if (res !== undefined) setComments(res);
    },
    [pageId, process],
  );

  useEffect(() => {
    const ac = new AbortController();
    void fetchComments(ac.signal);
    return () => {
      ac.abort();
    };
  }, [fetchComments]);

  const handleToggleReply = (cid: string) =>
    setComments((comments) => {
      return comments.map(({ childrenVisible, ...comment }) => ({
        childrenVisible:
          comment.id !== cid ? childrenVisible : !childrenVisible,
        ...comment,
      }));
    });

  const handlePostComment = async (
    content: string,
    userName: string,
    parentId?: string,
  ) => {
    await post<CcmtComment, CcmtCommentPostBody>('/v1/comment', {
      page_id: pageId,
      body_text: content,
      parent_id: parentId,
      user_id: userName,
    });
    void fetchComments();
  };

  return (
    <>
      <MainPartHeader />
      <WritableComment onSubmit={handlePostComment} />
      <ConditionalSpinner
        processingCount={processingCount}
        spinnerOuter={(children) => (
          <div className="flex items-center justify-center p-4">{children}</div>
        )}
      >
        <CommentTree
          comments={comments}
          onToggleReply={handleToggleReply}
          onSubmitReply={handlePostComment}
        />
      </ConditionalSpinner>
    </>
  );
};

export default MainPart;
