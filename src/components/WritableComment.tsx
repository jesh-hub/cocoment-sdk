import { useEffect, useRef, useState } from 'react';
import Button from 'src/components/Button';
import ConditionalSpinner from 'src/components/ConditionalSpinner';
import useApp from 'src/hooks/useApp';
import useProcessor from 'src/hooks/useProcessor';
import useToaster from 'src/hooks/useToaster';
import type { ChangeEvent, ChangeEventHandler, FC, FormEvent } from 'react';

type WritableCommentProps = {
  onSubmit: (content: string, name: string) => Promise<void>;
};

const WritableComment: FC<WritableCommentProps> = ({ onSubmit }) => {
  const { user } = useApp();
  const { errorToast, warnToast } = useToaster();
  const [processingCount, process] = useProcessor();

  const [avatar, setAvatar] = useState<File>();
  const [avatarDataURL, setAvatarDataURL] = useState<string>('');

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) =>
    process(async () => {
      const [file] = e.target.files || [];

      if (file === undefined) throw new Error('파일을 다시 확인해주세요.');
      if (!file.type.startsWith('image/'))
        throw new Error('이미지 파일만 첨부할 수 있어요.');

      const reader = new FileReader();
      await new Promise<void>((resolve, reject) => {
        reader.onload = () => resolve();
        reader.onerror = (event: ProgressEvent<FileReader>) => {
          if (event.target?.error) reject(event.target.error);
          else reject(new Error('첨부하신 이미지 파일을 처리할 수 없습니다.'));
        };
        reader.readAsDataURL(file);
      });
      if (reader.result !== null) setAvatarDataURL(reader.result as string);
      setAvatar(file);
    });

  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [btnReference, setBtnReference] = useState<HTMLElement | null>(null);
  const isPrevInvalid = useRef<boolean>(false);

  useEffect(() => {
    if (user) setName(user.displayName || '');
  }, [user]);

  const handleInputChange =
    (setState: typeof setName | typeof setContent) =>
    ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState(target.value);
      isPrevInvalid.current = false;
    };
  const handleInputInvalid =
    (message: string) =>
    (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.preventDefault();

      if (!isPrevInvalid.current) {
        errorToast(message, {
          reference: btnReference,
          placement: 'bottom-end',
        });
        (e.target as HTMLInputElement | HTMLTextAreaElement).focus();
        isPrevInvalid.current = true;
      }
    };

  const [focusing, setFocusing] = useState<boolean>(false);
  const timeoutId = useRef<undefined | NodeJS.Timeout>();

  const handleFocus = (focus: boolean) => () => {
    if (timeoutId.current !== undefined) clearTimeout(timeoutId.current);

    if (focus) setFocusing(true);
    else timeoutId.current = setTimeout(() => setFocusing(false), 100); // blur 컬러는 조금 이따가
  };

  return (
    <form
      className={`my-3 rounded-lg border py-3.5 shadow ${
        focusing ? 'border-blue-500' : 'border-gray-300'
      }`}
      onSubmit={(e) => {
        e.preventDefault();
        // TODO hideToast();
        void process(async () => {
          await onSubmit(content, name);
          setName('');
          setContent('');
        });
      }}
      onClick={() => {
        isPrevInvalid.current = false;
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
            onChange={
              handleChangeAvatar as ChangeEventHandler<HTMLInputElement>
            }
          />
          <label
            htmlFor="new-comment-avatar"
            className={`h-10 w-10 cursor-pointer rounded-full border bg-slate-800 pl-px text-center text-2xl leading-9 text-amber-50 ${
              avatar ? 'border-slate-300' : 'border-slate-500'
            }`}
            onClick={(e) => {
              e.preventDefault();
              warnToast('준비 중, 곧 만나요!', {
                reference: e.target as HTMLLabelElement,
                placement: 'bottom-start',
              });
            }}
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
          className="text-md bg-transparent px-2 py-1 text-slate-800 placeholder:text-slate-400 focus-visible:outline-0"
          required
          onFocus={handleFocus(true)}
          onBlur={handleFocus(false)}
          onChange={handleInputChange(setName)}
          onInvalid={handleInputInvalid('이름을 입력하세요.')}
        />
      </div>
      <textarea
        id="new-comment-content"
        value={content}
        placeholder="내용을 입력하세요."
        className="text-md mt-3 w-full resize-none bg-transparent p-1 pl-3 text-slate-800  placeholder:text-slate-400 focus-visible:outline-0"
        required
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false)}
        onChange={handleInputChange(setContent)}
        onInvalid={handleInputInvalid('내용을 입력하세요.')}
      />
      <div className="mr-3 mt-1 text-right">
        <Button
          type="submit"
          ref={setBtnReference}
          variant="primary"
          disabled={processingCount > 0}
        >
          <ConditionalSpinner processingCount={processingCount}>
            등록
          </ConditionalSpinner>
        </Button>
      </div>
    </form>
  );
};

export default WritableComment;
