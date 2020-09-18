import React from 'react'
import { Image } from 'react-native'
import {
  Header,
  Body,
  Title,
  Subtitle
} from 'native-base'

const HeaderLogo: React.FC<{}> = () => (
  <Header noLeft>
    <Body>
      <Title>
        <Image style={{ width: 200, height: 50 }} source={require('@assets/logo.png')} resizeMode="contain"></Image>
      </Title>
      <Subtitle>INSPECIONE SEUS IMÓVEIS</Subtitle>
    </Body>
  </Header>
)

export default HeaderLogo
