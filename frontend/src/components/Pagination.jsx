/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export const Pagination = ({ curPage, setCurPage, totalPages }) => {


    const handleNext = () => {
        if (curPage >= totalPages) {
            setCurPage(1)
        } else {
            setCurPage(page => page + 1)
        }
    }

    const handlePrev = () => {
        if (curPage <= 1) {
            setCurPage(totalPages)
        } else {
            setCurPage(page => page - 1);
        }
    }

    return (
        <div className="mt-10 flex gap-4 justify-center items-center">
            <button onClick={handlePrev} className="px-2 py-1 text-slate-50 bg-slate-500 rounded-sm">Prev</button>
            <p className="">{curPage} / {totalPages}</p>
            <button onClick={handleNext} className="px-2 py-1 text-slate-50 bg-slate-500 rounded-sm">Next</button>
        </div>
    )
}
