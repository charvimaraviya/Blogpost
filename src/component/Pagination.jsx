import './Pagination.css'

export const Pagination = ({ currentPage, totalPages, onPrev, onNext, onPostsPerPageChange, postsPerPage}) => {
    return(
        <div className='page-wrapper'>
            <select
                className="select-number"
                value={postsPerPage}
                onChange={(e) => onPostsPerPageChange(Number(e.target.value))}
            >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
          </select>

            <button 
                className='previous-btn'
                onClick={onPrev}
                disabled = {currentPage == 1}
                >
                    Previous
            </button>

            <p 
                className='page-number'
            >
                {currentPage} Of {totalPages}
            </p>

            <button 
                className='next-btn'
                onClick={onNext}
                disabled = {currentPage === totalPages}
            >
                Next
            </button>
        </div>
    )
};
