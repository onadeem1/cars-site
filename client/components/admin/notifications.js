import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { sendNotification, resetError, resetNotifications } from '../../store'
import { connect } from 'react-redux'
import SubmitError from '../error'
import '../styling/notifications.scss'

const Notifications = props => {
  const [submitted, setSubmitted] = useState(false)
  useEffect(() => {
    props.resetError()
    props.resetNotifications()
    return function cleanup() {
      props.resetError()
      props.resetNotifications()
    }
  }, [])

  if (props.notificationStatus === 'LOADING')
    return (
      <div className="loading">
        <div className="loading-text">Loading...</div>
      </div>
    )

  return (
    <div className="notifications-form-page-container">
      {submitted && !props.errorMessage ? (
        <>
          <div className="notifications-thanks-container">
            Message sent. Your users must be excited :)
          </div>
          <div className="notifications-thanks-detail-container">
            Click below to send another message.
          </div>
          <div className="button-container">
            <button
              className="red-btn"
              type="button"
              onClick={() => setSubmitted(false)}
            >
              Send another notification
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="notifications-header-container">Notify Users</div>
          <div className="notifications-subheader-container">
            This will send a notification to all Wishlist App Users.
          </div>
          <Formik
            initialValues={{
              headings: '',
              subtitle: '',
              contents: ''
            }}
            onSubmit={(values, actions) => {
              props.sendNotification(values)
              actions.resetForm()
              setSubmitted(true)
            }}
          >
            {() => {
              return (
                <Form className="notifications-form">
                  <div className="title-container">
                    <Field
                      className="form-control"
                      name="headings"
                      placeholder="Title"
                    />
                  </div>
                  <div className="subtitle-container">
                    <Field
                      className="form-control"
                      name="subtitle"
                      placeholder="Subtitle"
                    />
                  </div>
                  <div className="message-container">
                    <Field
                      component="textarea"
                      style={{ resize: 'none' }}
                      rows="8"
                      className="form-control notification-message-box"
                      name="contents"
                      placeholder="Message"
                    />
                  </div>
                  <div className="button-container">
                    <button className="red-btn" type="submit">
                      NOTIFY ALL USERS
                    </button>
                  </div>
                  {props.errorMessage && (
                    <SubmitError message={props.errorMessage} />
                  )}
                </Form>
              )
            }}
          </Formik>
        </>
      )}
    </div>
  )
}

const mapDispatch = { sendNotification, resetError, resetNotifications }

const mapState = state => {
  return {
    errorMessage: state.error,
    notificationStatus: state.notifications
  }
}

export default connect(mapState, mapDispatch)(Notifications)
