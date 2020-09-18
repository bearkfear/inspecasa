import React, { useContext } from 'react'
import { Formik, FormikHelpers } from 'formik'
import { client } from '@/configs/graphql'
import {
  Form,
  Item,
  Label,
  Input,
  Text,
  Button,
  Spinner
} from 'native-base'
import Store from '@/store'
import { auth } from 'firebase'

import styled from 'styled-components/native'
import { gql } from 'apollo-boost'

const SubmitButton = styled(Button)`
  margin-top: 20px;
  width: 95%;
  align-self: center;
`

interface State {
  email: string,
  password: string,
}

const LoginForm: React.FC<{}> = () => {
  const store = useContext(Store)
  const [initialValues] = React.useState<State>({
    email: store.email || '',
    password: ''
  })

  const GET_ME = gql`
    query me{ 
      me {
        id
      }
    }
  `

  async function handleSubmit (values: State, helpers: FormikHelpers<State>) {
    helpers.setSubmitting(true)
    const email = values.email
    const password = values.password

    try {
      const resp = await auth().signInWithEmailAndPassword(email, password)
      const token = await resp.user.getIdToken()

      store.setUid(resp.user.uid)
      store.setToken(token)

      const { data } = await client.query({
        query: GET_ME
      })
      if (data.me.id) {
        store.setEmail(email)
        store.setIsAuth(true)
      } else {
        store.clearStore()
        helpers.setSubmitting(false)
      }
    } catch (error) {
      helpers.setSubmitting(false)
      store.clearStore()
    }
  }

  return <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
  >
    {({
      handleChange,
      handleBlur,
      handleSubmit,
      values,
      isSubmitting
    }) => (
      <>
        <Form>
          <Item stackedLabel>
            <Label>E-mail</Label>
            <Input
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Digite seu email"
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            ></Input>
          </Item>
          <Item stackedLabel >
            <Label>Senha</Label>
            <Input
              onChangeText={handleChange('password')}
              value={values.password}
              onBlur={handleBlur('password')}
              placeholder="Digite sua senha"
              autoCapitalize="none"
              secureTextEntry
            ></Input>
          </Item>

        </Form>
        <SubmitButton
          success
          onPress={handleSubmit}
          disabled={isSubmitting}
          full
        >
          <Text>Acessar conta</Text>
          {isSubmitting && <Spinner />}
        </SubmitButton>

      </>
    )}
  </Formik>
}

export default LoginForm
