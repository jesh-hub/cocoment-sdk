import { ErrorCodes, ErrorMessages } from 'src/constants/errors';

export function toBinary(file: File) {
  const reader = new FileReader();
  return new Promise<ArrayBuffer>((resolve, reject) => {
    reader.onload = (event) => resolve(event.target?.result as ArrayBuffer);
    reader.onerror = (event) => onReadError(event, reject);
    reader.readAsArrayBuffer(file);
  });
}

export function toDataURL(file: File) {
  const reader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = (event) => onReadError(event, reject);
    reader.readAsDataURL(file);
  });
}

function onReadError(
  event: ProgressEvent<FileReader>,
  reject: (reason: Error) => void,
) {
  if (event.target?.error) reject(event.target.error);
  else {
    const code = ErrorCodes.ILLEGIBLE_FILE;
    reject(new Error(ErrorMessages[code]));
  }
}
