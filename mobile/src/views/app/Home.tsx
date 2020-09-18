import React from 'react'
import {
  Content,
  Text,
  List,
  ListItem,
  Spinner,
  Badge,
  Title,
  Header
} from 'native-base'
import HTML from 'react-native-render-html'
import { Card } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { Dimensions, TouchableOpacity } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { GET_IMOVEIS, GetImoveis } from '@/querys'
import { Icon } from '@/components/Icon'
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'

const PriceLabel = styled.Text`
  text-transform: uppercase;
  color: #888;
`

const Price = styled.Text`
  font-size: 18px;
  font-weight: 400;
`

const HomeScreen: React.FC<{}> = () => {
  return (
    <>
      <StatusBar style="dark" />
      <Propriedades></Propriedades>
    </>
  )
}

const Propriedades: React.FC<{}> = () => {
  const nav = useNavigation()
  const query = useQuery<GetImoveis>(GET_IMOVEIS)
  const { data, loading } = query
  return (
    <Content contentContainerStyle={{ flex: 1 }} padder>
      {(loading || !data) && <Spinner></Spinner> }
      {data.imoveis.map((imovel) => (
        <TouchableOpacity
          key={imovel.id}
          onPress={() => nav.navigate('propertyDetails', imovel)}
        >
          <Card containerStyle={{}}>
            <PriceLabel>valor proposto</PriceLabel>
            <Price>R$: {imovel.valorProposta}</Price>
          </Card>
        </TouchableOpacity>
      ))}
    </Content>
  )
}

export default HomeScreen
