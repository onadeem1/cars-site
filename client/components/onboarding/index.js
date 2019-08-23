import React from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import '../../components/styling/onboarding.scss'

import one from '../../images/1-onboarding.png'
import two from '../../images/2-onboarding.png'
import three from '../../images/3-onboarding.png'
import four from '../../images/4-onboarding.png'

class SimpleSlider extends React.Component {
  constructor(props) {
    super(props)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }
  state = {
    currentSlide: 0
  }
  next() {
    this.slider.slickNext()
  }
  previous() {
    this.slider.slickPrev()
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      beforeChange: (oldIndex, newIndex) =>
        this.setState({ currentSlide: newIndex })
    }
    return (
      <div className="slider-container">
        <Slider ref={c => (this.slider = c)} {...settings}>
          <div className="slide-container">
            <div className="slide-text">It's never easy finding a car.</div>
            <img className="slide-image" src={one} />
          </div>
          <div className="slide-container">
            <div className="slide-text">
              WishList makes it simple, just let our experts know exactly what
              you need.
            </div>
            <img className="slide-image" src={two} />
          </div>
          <div className="slide-container">
            <div className="slide-text">
              We'll contact you with cars we know you'll love.
            </div>
            <img className="slide-image" src={three} />
          </div>
          <div className="slide-container">
            <div className="slide-text">
              It's that easy, just wish for it, we'll do the rest.
            </div>
            <img className="slide-image" src={four} />
          </div>
        </Slider>
        <div className="slide-btn-container">
          {this.state.currentSlide === 3 ? (
            <>
              <Link to="/cars">
                <button autoFocus type="button" className="red-btn slide-btn">
                  Start Wishing
                </button>
              </Link>
              <div
                className="skip-link-container"
                style={{ color: 'transparent' }}
              >
                .
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                className="red-btn slide-btn"
                onClick={this.next}
              >
                Next
              </button>
              <div className="skip-link-container">
                <Link className="skip-link" to="/cars">
                  skip
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default SimpleSlider
