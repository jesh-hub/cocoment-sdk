import React from 'react';

type AvatarProps = {
  dataUrl?: string;
  name: string;
};

const Avatar = ({ dataUrl, name }: React.PropsWithChildren<AvatarProps>) => {
  const char = name !== '' ? name.slice(0, 1).toLocaleUpperCase() : '?';

  return (
    <>
      {dataUrl && (
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src={dataUrl}
          alt={name}
        />
      )}
      {!dataUrl && (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">
          <span className="text-2xl font-medium leading-none text-white">
            {char}
          </span>
        </span>
      )}
    </>
  );
};

export default Avatar;
