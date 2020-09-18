import React from 'react'
import {
  Button,
  Text
} from 'native-base'
// import { Appearance } from 'react-native-appearance'
import LoginForm from '@components/forms/Login'
import {
  StatusBar
} from 'react-native'

import styled from 'styled-components/native'

interface StyledProps {
  colorScheme?: string
}

const Subtitle = styled.Text<StyledProps>`
  font-size: 20px;
  margin: 10px;
  color: ${props => props.colorScheme === 'dark' ? '#fff' : '#000'};
`

const ContentArea = styled.View<StyledProps>`
  background: ${props => props.colorScheme === 'dark' ? '#000' : '#fff'};
  flex:2;
  justify-content: center;
  padding: 10px;
`

const Logo = styled.Image`
  width: 240px;
  height: 50px;
  align-self: center;
`

const HeaderContent = styled.View`
  flex-direction: column;
`

const Login:React.FC = () => {
  StatusBar.setBarStyle('dark-content')

  return (
    <ContentArea>
      <HeaderContent>
        <Logo
          source={require('../../../assets/logo.png')}
          resizeMode="contain"
        ></Logo>
        <Subtitle>Acesse sua conta</Subtitle>
      </HeaderContent>
      <LoginForm />
      <Button transparent>
        <Text>Esqueceu a senha?</Text>
      </Button>
    </ContentArea>
  )
}

export default Login
