import React, { useContext, useEffect, useState } from 'react';
import CommentTree from 'src/components/CommentTree';
import { PageInfoContext } from 'src/contexts/PageInfoContext';
import { SpinnerContext } from 'src/contexts/SpinnerContext';
import { get, post } from 'src/services/Api';
import {
  CcmtComment,
  CcmtCommentPostBody,
  VisualComment,
} from 'src/types/Comment';

const MainPart: React.FC = () => {
  const { pageId } = useContext(PageInfoContext);
  const { waitProcessAsync } = useContext(SpinnerContext);
  const [comments, setComments] = useState<VisualComment[]>([]);

  useEffect(() => {
    const ac = new AbortController();

    waitProcessAsync(async () => {
      const res = await get<CcmtComment[] | undefined>('/v1/comment', {
        query: { page_id: pageId },
        signal: ac.signal,
      });
      if (res !== undefined) setComments(res);
    }).then();
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

  const handlePostComment = (
    content: string,
    userName: string,
    parentId?: string,
  ) =>
    waitProcessAsync(async () => {
      await post<CcmtComment, CcmtCommentPostBody>('/v1/comment', {
        page_id: pageId,
        body_text: content,
        parent_id: parentId,
        user_id: userName,
      });
    });

  return (
    <>
      <CommentTree
        comments={comments}
        handleClickReply={handleClickReply}
        handlePostComment={handlePostComment}
      />
    </>
  );
};

export default MainPart;
