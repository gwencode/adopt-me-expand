type PaginateProps = {
  page: number;
  next: boolean;
  pages: number;
  handleNav: (page: number) => void;
};

const Paginate = ({ page, next, pages, handleNav }: PaginateProps) => {
  return (
    <div className="paginate">
      {page > 0 && (
        <button onClick={() => handleNav(page - 1)}>Previous Page</button>
      )}
      <span>
        Page {page + 1}/{pages}
      </span>
      {next && <button onClick={() => handleNav(page + 1)}>Next Page</button>}
    </div>
  );
};

export default Paginate;
