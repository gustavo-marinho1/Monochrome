import { ThemeToggle } from "../../../components/ui/theme-toggle";
import { MainAuth } from "../../../components/layout/main";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/user-context";
import { register } from "../../../services/register";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import { Container } from "../../../components/layout/container";

interface Fields {
  name: string,
  email: string,
  password: string
}

const schema = z.object({
  name: z.string({message: "Insert your name"}).min(1, {message: "Insert your name"}),
  email: z.email({message: "Insert your email"}).min(1, {message: "Insert your email"}),
  password: z.string({message: "Insert your password"}).min(8, {message: "Password must have at least 8 characters"})
});

export default function Register() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { setUser } = useContext(UserContext);
  const { watch, setValue, handleSubmit, formState: { errors } } = useForm<Fields>({
    resolver: zodResolver(schema)
  });

  const submit = async (values: Fields) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await register(values);
      setUser(res.data);
      navigate("/");
    }
    catch (error: Error | any) {
      setErrorMsg(error.message);
    }
    setLoading(false);
  }

  return (
    <MainAuth>
      {/* Top */}
      <div className="flex justify-end p-5">
        <ThemeToggle />
      </div>

      {/* Bottom */}
      <div className="flex-[1] flex flex-col gap-20 justify-center items-center">

        <div className="w-full flex justify-center">
          <Link to="/" className="text-2xl tracking-wider">MONOCHROME</Link>
        </div>

        <Container>
          <form className="w-md flex flex-col gap-5 p-5" onSubmit={(e) => {
            e.preventDefault();
            setErrorMsg("");
            handleSubmit(e => submit(e))();
          }}>
            <h1 className="text-xl font-semibold">Register</h1>

            {/* Fields */}
            <div className="flex flex-col gap-2">
              <Input
                id="name"
                name="name"
                label="Name"
                value={watch("name")}
                setValue={(val: string) => setValue("name", val)}
                error={!!errors.name}
              />
              <Input
                id="email"
                name="email"
                label="Email"
                value={watch("email")}
                setValue={(val: string) => setValue("email", val)}
                error={!!errors.email}
              />
              <Input
                id="password"
                name="password"
                label="Password"
                password
                value={watch("password")}
                setValue={(val: string) => setValue("password", val)}
                error={!!errors.password}
              />
            </div>

            {/* Errors */}
            {(errors.name || errors.email || errors.password || errorMsg) && (
              <div className="flex flex-col gap-1 font-semibold text-[rgb(255,80,80)]">
                {errors.name && (
                  <p>{errors.name.message}</p>
                )}
                {errors.email && (
                  <p>{errors.email.message}</p>
                )}
                {errors.password && (
                  <p>{errors.password.message}</p>
                )}
                {errorMsg && (
                  <p>{errorMsg}</p>
                )}
              </div>
            )}

            <div className="w-full flex justify-between items-center gap-2">
              <Link to="/login" className="hover:underline">Already have an account?</Link>
              <button disabled={loading} className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-700 rounded-lg py-1.5 px-3">Register</button>
            </div>
          </form>
        </Container>

      </div>
    </MainAuth>
  )
}