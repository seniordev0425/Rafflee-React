import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

export const PrevNextButton = ({ name, disabled, onClick, onMouseEnter, onMouseLeave }) => {
  const className = `alice-carousel__${name}-btn-item${disabled ? ' __inactive' : ''}`

  return (
    <div className={`alice-carousel__${name}-btn`}>
      <div className={`alice-carousel__${name}-btn-wrapper`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <p className={className} onClick={onClick}>
          {name == 'next' ? (
              <FontAwesomeIcon icon={faChevronCircleRight} aria-hidden="true" size="lg"/>
            ) : 
            (
              <FontAwesomeIcon icon={faChevronCircleLeft} aria-hidden="true" size="lg"/>
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
