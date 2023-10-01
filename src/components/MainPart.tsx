import React, { useContext, useEffect, useState } from 'react';
import CommentTree from 'src/components/CommentTree';
import { Spinner } from 'src/components/SvgIcons.tsx';
import WritableComment from 'src/components/WritableComment.tsx';
import { PageInfoContext } from 'src/contexts/PageInfoContext';
import useWaitProcess from 'src/hooks/useWaitProcess';
import { get, post } from 'src/services/Api';
import {
  CcmtComment,
  CcmtCommentPostBody,
  VisualComment,
} from 'src/types/Comment';

const MainPart: React.FC = () => {
  const { pageId } = useContext(PageInfoContext);
  const { waitingCount, waitProcessAsync } = useWaitProcess();

  const [comments, setComments] = useState<VisualComment[]>([]);

  const fetchComments = (signal?: AbortSignal) =>
    waitProcessAsync(async () => {
      const res = await get<CcmtComment[] | undefined>('/v1/comment', {
        query: { page_id: pageId },
        signal,
      });
      if (res !== undefined) setComments(res);
    });

  useEffect(() => {
    const ac = new AbortController();

    fetchComments(ac.signal).then();
    return () => ac.abort();
  }, []);

  const handleClickReply = (cid: string) => () =>
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
    return fetchComments();
  };

  return (
    <>
      <WritableComment handleSubmit={handlePostComment} />
      {waitingCount === 0 && (
        <CommentTree
          comments={comments}
          handleClickReply={handleClickReply}
          handlePostComment={handlePostComment}
        />
      )}
      {waitingCount > 0 && (
        <div className="flex items-center justify-center p-4">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default MainPart;
