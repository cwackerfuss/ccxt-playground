import React from 'react';
import { Form } from 'semantic-ui-react'

const TextInput = ({ input, meta }) => (
  // <div>
  //   <label>Bio</label>
  //   <input {...input} />
  //   {meta.touched && meta.error && <span>{meta.error}</span>}
  // </div>
  <Form.Group widths='equal'>
    <Form.Input fluid id='form-subcomponent-shorthand-input-first-name' label='First name' placeholder='First name' />
    <Form.Input fluid id='form-subcomponent-shorthand-input-last-name' label='Last name' placeholder='Last name' />
  </Form.Group>
)

export default TextInput;
