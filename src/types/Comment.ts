export type CcmtComment = {
  // body_html과 body_text가 모두 null일 수는 없다.
  body_html: string | null;
  body_text: string | null;
  // TODO children 리네이밍 예정
  childs: CcmtComment[];
  created_at: string;
  history: {
    created_at: string;
    id: string;
    new_status: string;
    rule_id: string;
    type: string;
  }[];
  id: string; // uuid
  is_edited: boolean;
  page_id: string;
  page_url: string | null;
  parent_id: string | null;
  status: string;
  update_at: string | null;
  user_id: string;
};

export type CcmtCommentPostBody = {
  body_html?: string;
  body_text?: string;
  page_id: string;
  parent_id?: string;
  user_id: string;
};

export type VisualComment = CcmtComment & {
  childrenVisible?: boolean;
};
