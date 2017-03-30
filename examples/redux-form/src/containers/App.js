import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form/immutable' // <--- immutable import


const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {}
  if (!values.get('username')) {
    errors.username = 'Required'
  } else if (values.get('username').length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.get('email')) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'Invalid email address'
  }
  if (!values.get('age')) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.get('age')))) {
    errors.age = 'Must be a number'
  } else if (Number(values.get('age')) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class ImmutableForm extends Component {
  onSubmit = (values) => {
    console.log('onSubmit values: ', values)
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="username" type="text" component={renderField} label="Username"/>
        <Field name="email" type="email" component={renderField} label="Email"/>
        <Field name="age" type="number" component={renderField} label="Age"/>
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'immutableExample',  // a unique identifier for this form
  validate
})(ImmutableForm)