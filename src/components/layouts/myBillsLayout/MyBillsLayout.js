import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'
import MyBillsItem from './MyBillsItem'
import Loading from '../../common/Loading'

import { getMyBills } from '../../../actions/userInfo'
import { NUMBER_PER_PAGE } from '../../../utils/constants'

function MyBillsLayout() {

  const isLoading = useSelector(state => state.userInfo.GET_MY_BILLS)
  const billsList = useSelector(state => state.userInfo.myBills)
  const pdfInvoice = useSelector(state => state.userInfo.pdfInvoice)

  const dispatch = useDispatch()

  // min, max values are for pagination
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)

  useEffect(() => {
    dispatch(getMyBills())
  }, [])

  useEffect(() => {
    if (pdfInvoice) {
      // Generate pdf file and download it
      var fileName = 'download.pdf';
      var link = document.createElement("a");
      link.setAttribute("href", `data:application/octet-stream;base64,${pdfInvoice}`);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      dispatch({ type: 'INIT_STATE', state: 'pdfInvoice', data: '' })
    }
  }, [pdfInvoice])

  const handlePagination = (value) => {
    setMinValue((value - 1) * NUMBER_PER_PAGE)
    setMaxValue((value) * NUMBER_PER_PAGE)
  }

  const renderMyBillsList = () => {
    return (
      billsList.slice(minValue, maxValue).map((item, index) =>
        <div key={index} className="promotion-list-item-container">
          <MyBillsItem item={item} />
        </div>
      )
    )
  }

  if (isLoading) {
    return <div className="min-height-container"><Loading /></div>
  }

  return (
    <div className="min-height-container">
      {renderMyBillsList()}
      <Pagination
        responsive
        defaultCurrent={1}
        defaultPageSize={NUMBER_PER_PAGE}
        onChange={handlePagination}
        total={billsList.length}
        className="py-5 d-flex justify-content-center"
      />
    </div>
  )
}

export default MyBillsLayout