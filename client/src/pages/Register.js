import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

function Register() {
    const [errors, setErrors] = useState({})

    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    })

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result)
        },
        onError(err) {
            // console.log(err.graphQlErrors[0].extensions.exception.errors)
            // console.log(new Error('jskdfksjdf'))
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
            // setErrors(new Error('jskdfksjdf'));
            // errors.email = 'Email must be a valid email address';
        },
        variables: values
    })

    const onSubmit = (event) => {
        event.preventDefault();
        addUser()
    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Register</h1>
                <Form.Input
                    label="Email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                ></Form.Input>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                ></Form.Input>
                <Form.Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                ></Form.Input>
                <Form.Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                ></Form.Input>
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`

export default Register;