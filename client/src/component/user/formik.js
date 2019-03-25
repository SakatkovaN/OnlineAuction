import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'

const FormApp = ({
    values,
    errors,
    touched
}) => (
        <Form>
            <div>{touched.email && errors.email && <p>{errors.email}</p>}
                <Field type="email" name="email" placeholder="email" />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="password" />
            </div>
            <button>Submit</button>
        </Form>
    )

const FormikApp = withFormik({
    mapPropsToValues({ email, password }) {
        return {
            email: email || '',
            password: password || ''
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('email not valid').required('eamil is required'),
        password: Yup.string().min(9, 'Password must be 9 characters').required('password is required')
    }),
    handleSubmit(values) {
        console.log(values)
    }
})(FormApp)

export default FormikApp