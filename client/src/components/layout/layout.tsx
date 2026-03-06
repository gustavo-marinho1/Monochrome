import { Outlet } from "react-router-dom";
import { Main } from "./main";
import { Header } from "./header";
import { Footer } from "./footer";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user-context";
import { me } from "../../services/me";

export default function Layout() {
  const { setUser } = useContext(UserContext);
  
  const getMe = async () => {
    try {
      const res = await me();
      setUser(res.data);
    }
    catch {}
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="bg-gradient-to-tr from-[rgb(255,255,255)] to-[rgb(250,250,250)] dark:from-[rgb(25,25,25)] dark:to-[rgb(15,15,15)]">
      <div className="w-full min-h-screen flex flex-col justify-between text-foreground">
        <div className="sticky z-50 w-full top-0">
          <Header />
        </div>
        

        <Main>
          <Outlet />
        </Main>

        <Footer />
      </div>
    </div>
  )
}