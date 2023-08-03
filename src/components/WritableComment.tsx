import React, { useRef, useState } from 'react';
import { Button } from 'src/style/components';

type WritableCommentProps = {};

const WritableComment: React.FC<WritableCommentProps> = () => {
  const [name, setName] = useState<string>('');
  const [avatar, setAvatar] = useState<File>();
  const [avatarDataURL, setAvatarDataURL] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files || [];

    // TODO 에러
    if (file === undefined) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size / 1024 / 1024 > 20) return;

    // TODO 로딩, 에러 처리
    const reader = new FileReader();
    await new Promise<void>((resolve, reject) => {
      reader.onload = () => resolve();
      reader.onerror = (event: ProgressEvent<FileReader>) => {
        reject(event.target?.error);
      };
      reader.readAsDataURL(file);
    });
    if (reader.result !== null) setAvatarDataURL(reader.result as string);
    setAvatar(file);
  };

  const [focusing, setFocusing] = useState<boolean>(false);
  const timeoutId = useRef<undefined | NodeJS.Timeout>();
  const handleFocus =
    (focus: boolean, doTimeout = false) =>
    () => {
      if (timeoutId.current !== undefined) clearTimeout(timeoutId.current);
      if (doTimeout)
        timeoutId.current = setTimeout(() => setFocusing(focus), 100);
      else setFocusing(focus);
    };

  return (
    <form
      className={`my-3 rounded-lg border py-3.5 shadow ${
        focusing ? 'border-blue-500' : 'border-gray-300'
      }`}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(name, content, avatar);
      }}
    >
      <div className="flex px-3">
        <div className="inline-flex h-10 w-10">
          <input
            id="new-comment-avatar"
            type="file"
            accept="image/*"
            title="아바타 이미지를 등록하세요. (선택)"
            className="hidden"
            ref={inputRef}
            onChange={handleChangeAvatar}
          />
          <label
            htmlFor="new-comment-avatar"
            className={`h-10 w-10 cursor-pointer rounded-full border bg-slate-800 pl-px text-center text-2xl leading-9 text-amber-50 ${
              avatar ? 'border-slate-300' : 'border-slate-500'
            }`}
          >
            {avatar === undefined && '?'}
            {avatar !== undefined && (
              <img
                src={avatarDataURL}
                alt="저장할 아바타 이미지"
                className="h-full w-full rounded-full"
              />
            )}
          </label>
        </div>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="이름을 입력하세요."
          required
          className="text-md bg-transparent px-2 py-1 text-slate-800 placeholder:text-slate-400 focus-visible:outline-0"
          onFocus={handleFocus(true)}
          onBlur={handleFocus(false, true)}
          onChange={({ target: { value } }) => setName(value)} // TODO handleChange util화?
        />
      </div>
      <textarea
        id="new-comment-content"
        value={content}
        placeholder="내용을 입력하세요."
        className="text-md mt-3 w-full resize-none bg-transparent p-1 pl-3 text-slate-800  placeholder:text-slate-400 focus-visible:outline-0"
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false, true)}
        onChange={({ target }) => setContent(target.value)} // TODO handleChange util화?
        required
      />
      <div className="mr-3 mt-1 text-right">
        <Button type="submit" variant="submit-outline">
          등록
        </Button>
      </div>
    </form>
  );
};

export default WritableComment;
