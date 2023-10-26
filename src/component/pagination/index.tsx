import React from "react"
import {
    BsChevronDoubleRight,
    BsChevronDoubleLeft,
} from "react-icons/bs"
import { Pagination } from "react-headless-pagination"
import "./style.css"
import { chunk } from "lodash"


interface TPaginationComponent {
  page: number
  total: number
  setPage: (d: number) => void
}
const PaginationComponent: React.FC<TPaginationComponent> = (props) => {
    
const countPage = (total: number, perPage: number): number => {
    const arr = Array.from(Array(total).keys())
    const chunks = chunk(arr, perPage)
    return chunks.length
  }
  const { page, total, setPage } = props
//   const { open } = useAppSelector((s) => s.layoutSlice)

  const handlePageChange = (page: number): void => {
    setPage(page)
  }
  return (
    <div
      className="pl-[100px] pr-[32px] left-0  border py-7 fixed bottom-0 w-full bg-white"
    >
      <div className="flex lg:items-center lg:justify-between gap-6  flex-col lg:flex-row">
        <div className="flex gap-3 items-center">
          <p className="text-sm font-semibold">Total {total} items</p>
        </div>
        <div id="pagination">
          <Pagination
            className="flex lg:w-auto w-full"
            currentPage={page}
            edgePageCount={1}
            middlePagesSiblingCount={1}
            setCurrentPage={handlePageChange}
            totalPages={countPage(total,10)}
            truncableClassName="w-10 px-0.5 text-center border border-l-0 text-[14px] items-center flex justify-center"
            truncableText="..."
          >
            <Pagination.PrevButton className="flex justify-center items-center w-[43px] h-[38px] border rounded-tl-xl rounded-bl-xl">
              <BsChevronDoubleLeft
                className=" h-5 w-5 text-gray4 "
                aria-hidden="true"
              />
            </Pagination.PrevButton>
            <Pagination.PageButton
              activeClassName="text-cyan1 bg-cyan2 border-cyan1 font-semibold"
              className="flex justify-center items-center w-[43px] h-[38px] border  cursor-pointer text-sm"
              inactiveClassName="text-gray1 font-semibold border-l-0"
            />

            <Pagination.NextButton className="flex justify-center items-center w-[43px] h-[38px] border border-l-0 rounded-tr-xl rounded-br-xl">
              <BsChevronDoubleRight
                className=" h-5 w-5 text-gray4 "
                aria-hidden="true"
              />
            </Pagination.NextButton>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
export default PaginationComponent
