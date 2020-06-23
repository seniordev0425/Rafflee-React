import React from 'react'
import {Checkbox} from 'antd'



function CategoryFilter(props){

    const {categories, allChecked, handleChange} = props

    const renderList = () => {
        return categories.map((item, index) => 
            <div key={index} className="category-item">
                <label>{item.name}</label>
                <Checkbox
                    value={item.name}
                    checked={item.checked}
                    onChange={handleChange}
                />
            </div>
        )
    }
    return(
        <div className="categry-container">
            <div className="category-item">
                <label>All</label>
                <Checkbox 
                    value="all"
                    checked={allChecked}
                    onChange={handleChange}
                />  
            </div>
            {renderList()}
            
        </div>
    )
}

export default CategoryFilter;