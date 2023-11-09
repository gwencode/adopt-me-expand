const Paginate = ({ page, next, handleNav }) => {
  return (
    <div className="paginate">
      <div>
        {page > 0 && (
          <button onClick={() => handleNav(page - 1)}>Previous Page</button>
        )}
        {next && <button onClick={() => handleNav(page + 1)}>Next Page</button>}
      </div>
    </div>
  );
};

export default Paginate;
