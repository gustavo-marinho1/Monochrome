import { Scan } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Photo } from '../profile/photo';
import { postProfilePhoto } from '../../services/file';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const InputPhoto = ({open, setOpen}: Props) => {
  const [preview, setPreview] = useState<string>();
  const [file, setFile] = useState();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (open && !preview) handleClick();
    setErrorMsg("");
  }, [open]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const upload = async () => {
    if (!file) return;
    setErrorMsg("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);
      await postProfilePhoto(formData);
      setOpen(false);
    } catch (error) {
      setErrorMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
        accept="image/jpeg, image/png, image/webp"
      />

      <div className="relative">
        <div onClick={handleClick} className="relative size-32 rounded-full overflow-hidden cursor-pointer border border-neutral-400 dark:border-neutral-500 group">
          {preview ? (
            <Photo src={preview} />
          ) : (
            <HoverImg />
          )}
          <div className="absolute size-full inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
            <HoverImg />
          </div>
        </div>
      </div>

      {errorMsg && (
        <span className="text-red-600 text-sm">{errorMsg}</span>
      )}

      <div className="flex items-center gap-2">
        <button onClick={() => setOpen(false)} disabled={loading} className="border border-neutral-300 dark:border-neutral-600 py-1 px-3 rounded-full" style={{
          opacity: loading ? 0.5 : 1,
          cursor: loading ? 'default' : 'pointer'
        }}>
          Cancel
        </button>
        <button onClick={upload} disabled={!file || loading} className="bg-green-300 dark:bg-green-700 border border-green-600 dark:border-green-400 py-1 px-3 rounded-full" style={{
          opacity: loading ? 0.5 : (file ? 1 : 0.5),
          cursor: loading ? 'default' : (file ? 'pointer' : 'default')
        }}>
          Save photo
        </button>
      </div>
    </div>
  );
}

const HoverImg = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 w-full h-full text-neutral-500">
      <Scan className="size-6" />
      <span className="text-sm text-center">Drop your photo here or</span>
    </div>
  )
}

export { InputPhoto}