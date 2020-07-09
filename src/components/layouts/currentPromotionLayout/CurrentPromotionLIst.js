import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Pagination } from 'antd'
import { Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import PromotionListItem from './PromotionListItem'
import CategoryFilter from '../../common/CategoryFilter'
import { NUMBER_PER_PAGE } from '../../../utils/constants'
import { getHotPromotions, getHighlightedPromotions, getNewPromotions, getBestPromotions, getCategories } from '../../../actions/homepage'
import Loading from '../../common/Loading'

import { useTranslation } from 'react-i18next'

function CurrentPromotionList() {
    const { t } = useTranslation()

    const hotPromotions = useSelector(state => state.homepage.hotPromotions)
    const highlightedPromotions = useSelector(state => state.homepage.highlightedPromotions)
    const newPromotions = useSelector(state => state.homepage.newPromotions)
    const bestOfferPromotions = useSelector(state => state.homepage.bestOfferPromotions)
    const categoryArr = useSelector(state => state.homepage.categories)

    const isLoading_1 = useSelector(state => state.userInfo.GET_HOT_PROMOTIONS_SUCCESS)
    const isLoading_2 = useSelector(state => state.userInfo.GET_HIGHLIGHTED_PROMOTIONS_SUCCESS)
    const isLoading_3 = useSelector(state => state.userInfo.GET_NEW_PROMOTIONS_SUCCESS)
    const isLoading_4 = useSelector(state => state.userInfo.GET_BEST_PROMOTIONS_SUCCESS)
    const isLoading_5 = useSelector(state => state.userInfo.GET_CATEGORIES)

    const token = useSelector(state => state.userInfo.token)

    const dispatch = useDispatch()

    const [currentMenu, setCurrentMenu] = useState('highlight')
    const [openCategory, setOpenCategory] = useState(false)
    const [categories, setCategories] = useState([])
    const [allChecked, setAllChecked] = useState(true)

    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)

    const promotionList = {
        highlight: highlightedPromotions,
        new: newPromotions,
        hot: hotPromotions,
        bestoffer: bestOfferPromotions
    }

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getHighlightedPromotions({ token: token }))
    }, [])

    useEffect(() => {
        let temp = []
        categoryArr.map((item) =>
            temp.push({ name: item.name, checked: true })
        )
        setCategories(temp)
    }, [categoryArr])

    useEffect(() => {
        setMinValue(0)
        setMaxValue(NUMBER_PER_PAGE)
    }, [currentMenu])

    useEffect(() => {
        if (currentMenu === 'highlight')
            dispatch(getHighlightedPromotions({ token: token }))
        else if (currentMenu === 'new')
            dispatch(getNewPromotions({ token: token }))
        else if (currentMenu === 'bestoffer')
            dispatch(getBestPromotions({ token: token }))
        else if (currentMenu === 'hot')
            dispatch(getHotPromotions({ token: token }))
    }, [token])

    const changeMenu = (val) => {
        setCurrentMenu(val)
        setOpenCategory(false)
        if (val === 'highlight')
            dispatch(getHighlightedPromotions({ token: token }))
        else if (val === 'new')
            dispatch(getNewPromotions({ token: token }))
        else if (val === 'bestoffer')
            dispatch(getBestPromotions({ token: token }))
        else if (val === 'hot')
            dispatch(getHotPromotions({ token: token }))
    }

    const toggleCategory = () => setOpenCategory(!openCategory)

    const handleChange = (e) => {
        let itemVal = e.target.value
        let checked = e.target.checked
        let tempArr = [...categories]
        if (itemVal === "all") {
            setAllChecked(checked)
            tempArr = tempArr.map(item => ({ ...item, checked: checked }))
            setCategories(tempArr)
        }
        else {
            tempArr = tempArr.map(item =>
                item.name === itemVal ? { ...item, checked: checked } : item
            )
            setCategories(tempArr)
            setAllChecked(tempArr.every(item => item.checked))
        }
    }

    const filter = (list) => {
        if (allChecked)
            return list

        let tempArr = []
        let flag = false
        for (let i = 0; i < list.length; i++) {
            if (!list[i].categories) continue
            flag = false
            for (let j = 0; j < list[i].categories.length; j++) {
                if (flag) break
                for (let k = 0; k < categories.length; k++) {
                    if (list[i].categories[j] === categories[k].name && categories[k].checked) {
                        tempArr.push(list[i])
                        flag = true
                        break
                    }
                }
            }
        }
        return tempArr
    }

    const handlePagination = (value) => {
        setMinValue((value - 1) * NUMBER_PER_PAGE)
        setMaxValue((value) * NUMBER_PER_PAGE)
    }

    const renderPromotionList = () => {
        return (
            filter(promotionList[currentMenu]).slice(minValue, maxValue).map((item, index) =>
                <div key={index} className="promotion-list-item-container">
                    <PromotionListItem item={item} menuname={currentMenu} />
                </div>
            )
        )
    }

    return (
        <>
            <div className="menubar-container">
                <Row>
                    <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
                        <Menu mode="horizontal" className="menubar" selectedKeys={[currentMenu]}>
                            <Menu.Item key="highlight" className="menu-item-mr" onClick={() => changeMenu('highlight')}>
                                {t('menubar.highlights')}
                            </Menu.Item>
                            <Menu.Item key="new" className="menu-item-mr" onClick={() => changeMenu('new')}>
                                {t('menubar.new')}
                            </Menu.Item>
                            <Menu.Item key="hot" className="menu-item-mr" onClick={() => changeMenu('hot')}>
                                {t('menubar.hot')}
                            </Menu.Item>
                            <Menu.Item key="bestoffer" className="menu-item-mr" onClick={() => changeMenu('bestoffer')}>
                                {t('menubar.endsoon')}
                            </Menu.Item>
                            <Menu.Item key="categories" className="menu-bar-settings-icon" onClick={toggleCategory}>
                                <FontAwesomeIcon icon={faSlidersH} />
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
            {openCategory && <CategoryFilter categories={categories} allChecked={allChecked} handleChange={handleChange} />}

            {(isLoading_1 || isLoading_2 || isLoading_3 || isLoading_4 || isLoading_5)
                ?
                <div className="min-height-container">
                    <Loading />
                </div>
                :
                <div className="min-height-container">
                    {renderPromotionList()}

                    {filter(promotionList[currentMenu]).length < 1 && (
                        <div className="empty-result mt-5">
                            <span className="promotion-list-item-title">{t('empty_result_to_display')}</span>
                        </div>
                    )}
                    <Pagination
                        responsive
                        defaultCurrent={1}
                        defaultPageSize={NUMBER_PER_PAGE}
                        onChange={handlePagination}
                        total={filter(promotionList[currentMenu]).length}
                        className="py-5 d-flex justify-content-center"
                    />
                </div>
            }
        </>
    )
}

export default CurrentPromotionList