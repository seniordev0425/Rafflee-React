import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import images from '../../images'

export const PrevNextButton = ({ name, disabled, onClick, onMouseEnter, onMouseLeave }) => {
  const className = `alice-carousel__${name}-btn-item${disabled ? ' __inactive' : ''}`

  return (
    <div className={`alice-carousel__${name}-btn`}>
      <div className={`alice-carousel__${name}-btn-wrapper`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <p className={className} onClick={onClick}>
          {name === 'next' ? (
              <img src={images.right_icon} width={30} />
            ) : 
            (
              <img src={images.left_icon} width={30} />
            )
          }
        </p>
      </div>
    </div>
  )
}

PrevNextButton.propTypes = {
  name: PropTypes.oneOf(['next', 'prev']),
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
}
