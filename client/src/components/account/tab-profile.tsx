import { Check, Pen, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useNavigate } from "react-router-dom"
import { changeProfileName, getProfile } from "@/services/profile"
import { InputPhoto } from "../ui/input-photo"
import { Photo } from "../profile/photo"
import { Input } from "../ui/input"
import { LoadingName } from "../profile/loading-name"

const api_url = import.meta.env.VITE_API_USER_URL;

const buttonStyle = "h-9.5 aspect-square flex items-center justify-center rounded-lg ";

interface Fields {
  newName: string
}

const schema = z.object({
  newName: z.string({message: "Insert your name"}).min(1, {message: "Insert your name"})
});

const Profile = () => {
  const navigate = useNavigate();
  const [avatar_url, setAvatarUrl] = useState<string>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [isEditPhoto, setIsEditPhoto] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const { watch, setValue, handleSubmit } = useForm<Fields>({
    resolver: zodResolver(schema)
  });

  const newName = watch("newName");
  const disabledChangeName = String(newName).trim() === String(name).trim() || String(newName) === "";

  useEffect(() => {
    if (!isEditPhoto) getInfo();
  }, [isEditPhoto]);

  useEffect(() => {
    if (!isEditName) return
    setErrorMsg("");
    const input = document.getElementById("newName");
    input?.focus();
  }, [isEditName]);

  const getInfo = async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      if (res.data.avatar_url) setAvatarUrl(api_url + "/" + res.data.avatar_url);
      else setAvatarUrl(undefined);
      setName(res.data.name);
      setValue("newName", res.data.name);
      setEmail(res.data.email);
    } catch (error) {
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  const handleClickEditName = () => {
    setIsEditName(true);
  }

  const changeName = async (f: Fields) => {
    setErrorMsg("");
    setLoading(true);
    try {
      await changeProfileName(f.newName);
      await getInfo();
      setIsEditName(false);
    } catch (error) {
      setErrorMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const cancelChangeName = () => {
    setIsEditName(false);
    setValue("newName", name);
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-2">

      <div className="md:w-3/7 flex justify-center items-center">
        {isEditPhoto ? (
          <InputPhoto open={isEditPhoto} setOpen={setIsEditPhoto} />
        ) : (
          <div className="relative h-32">
            <div className="relative size-32 rounded-full overflow-hidden cursor-pointer border border-neutral-400 dark:border-neutral-500 group">
              <Photo src={avatar_url} />
            </div>
            <button onClick={() => setIsEditPhoto(true)} className="absolute bottom-0 right-0 bg-neutral-300 dark:bg-neutral-700 rounded-full p-2">
              <Pen className="" size={17} />
            </button>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-2">
        {isEditName ? (
          <div>
            <form className="flex items-end gap-1" onSubmit={handleSubmit(f => changeName(f))}>
              <Input
                id="newName"
                name="newName"
                label="Update name"
                value={newName}
                setValue={(v) => setValue("newName", v)}
              />
              {loading ? (
                <LoadingName />
              ) : (
                <>
                  <button type="submit" className={buttonStyle + "bg-green-600 text-white"} disabled={disabledChangeName} style={{
                    opacity: disabledChangeName ? 0.5 : 1,
                    cursor: disabledChangeName ? "not-allowed" : "pointer"
                  }}>
                    <Check size={15} />
                  </button>
                  <button type="button" className={buttonStyle + "bg-red-600 text-white"} onClick={() => cancelChangeName()}>
                    <X size={15} />
                  </button>
                </>
              )}
            </form>
            {errorMsg && (
              <span className="text-red-600 text-sm">{errorMsg}</span>
            )}
          </div>
        ) : (
          loading ? (
            <></>
          ) : (
            <div className="flex items-end gap-1">
              <Input id="name" name="name" label="Name" value={name} disabled />
              <button className={buttonStyle + "border border-neutral-400 dark:border-neutral-500"} onClick={() => handleClickEditName()}>
                <Pen size={15} />
              </button>
            </div>
          )
        )}

        <Input id="email" name="email" label="Email" value={email} disabled />
      </div>

    </div>
  )
}

export { Profile }