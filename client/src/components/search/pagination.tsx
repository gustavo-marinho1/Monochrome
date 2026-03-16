interface Props { 
  page: number,
  setPage: (page: number) => void,
  disabled: boolean
}

const Pagination = ({ page, setPage, disabled }: Props) => {
  const handlePrevPage = () => {
    if (disabled) return
    if (page === 1) return
    setPage(page - 1);
  }
  const handleNextPage = () => {
    if (disabled) return
    setPage(page + 1);
  }

  return (
    <div className="flex items-center justify-center gap-2 py-4 text-sm">

      <button className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-white" onClick={() => handlePrevPage()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M15.75 1.5a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V2.25H9a.75.75 0 010-1.5h6z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
        </svg>
        Previous
      </button>

      <div>
        {page}
      </div>

      <button className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-white" onClick={() => handleNextPage()}>
        Next
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M15.75 1.5a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V2.25H9a.75.75 0 010-1.5h6z" clipRule="evenodd" />
        </svg>
      </button>

    </div>
  )
}

export { Pagination }