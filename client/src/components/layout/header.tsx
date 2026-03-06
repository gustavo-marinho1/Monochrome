import { ShoppingBag, User } from "lucide-react"
import { ThemeToggle } from "../ui/theme-toggle"
import { ButtonHeaderAction } from "../ui/buttons-header"
import { useContext } from "react"
import { UserContext } from "../../contexts/user-context"
import { UserDropdown } from "../ui/user-dropdown"
import { Link, useNavigate } from "react-router-dom"
import { SearchMd, SearchSm } from "../ui/search"
import { Sidebar } from "./sidebar"

const Header = () => {
  const navigate = useNavigate();
  const { loading, user } = useContext(UserContext);

  const getCartQtt = () => {
    return 1;
  }

  return (
    <header className="relative">
      
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <div className="size-full hidden dark:flex items-end opacity-5 dark:opacity-40 overflow-hidden">
          <img src="gray-gradient.png" />
        </div>
      </div>

      <div className="relative backdrop-blur dark:text-white bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(0,0,0,0.7)] flex items-center justify-between gap-4 p-4 py-3">
        <Sidebar />

        <div className="flex justify-left md:px-5">
          <Link to="/">
            <h1 className="text-xl tracking-wider">MONOCHROME</h1>
          </Link>
        </div>

        {/* Search mobile */}
        <SearchSm />

        {/* Actions desktop */}
        <div className="hidden md:flex w-full justify-end items-center gap-4">
          <SearchMd />

          {!loading && (
            user ? (
              <UserDropdown>
                <div className="flex items-center gap-1">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </div>
              </UserDropdown>
            ) : (
              <ButtonHeaderAction onClick={() => navigate("/login")}>
                <User className="h-5 w-5" />
              </ButtonHeaderAction>
            )
          )}

          <ButtonHeaderAction onClick={() => navigate("/cart")}>
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                {getCartQtt()}
              </span>
            </div>
          </ButtonHeaderAction>

          <ThemeToggle />
        </div>
      </div>

    </header>
  )
}

export { Header }