import { Search, X } from "lucide-react"
import { Container } from "../layout/container"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchSm = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (!open) return
    const field = document.getElementById("search-sm-input");
    if (field) {
      field.focus();
    }
  }, [open]);

  const handleSearch = () => {
    if (search.length <= 0) return
    navigate(`/search?s=${search}`);
  }

  return (
    <>
      {/* Trigger */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setOpen(prev => !prev)}>
          <Search className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute md:hidden left-0 right-0 h-full" style={{ visibility: open ? "visible" : "hidden" }}>
        <div className="size-full flex items-center p-1 bg-white dark:bg-black">
          <Container size="flex-[1]">
            <form className="w-full flex items-center gap-2 py-1.5 px-2.5" onSubmit={e => {
              e.preventDefault();
              handleSearch();
            }}>
              <input
                id="search-sm-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-[1]"
                placeholder="Search..."
              />
              <button onClick={handleSearch}>
                <Search className="h-5 w-5" />
              </button>
              <button onClick={() => setOpen(false)} type="button">
                <X className="h-5 w-5" />
              </button>
            </form>
          </Container>
        </div>
      </div>
    </>
  )
}

const SearchMd = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    if (search.length <= 0) return
    navigate(`/search?s=${search}`);
  }

  return (
    <Container>
      <form className="flex items-center gap-2 py-1.5 px-2.5" onSubmit={e => {
        e.preventDefault();
        handleSearch();
      }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <button onClick={handleSearch}>
          <Search className="h-5 w-5" />
        </button>
      </form>
    </Container>
  )
}

export { SearchSm, SearchMd }