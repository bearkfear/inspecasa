import React from 'react'
import { formatMoney } from '@inspecasa/common'
import { ImovelCard } from '@/components/ImovelCard'

import {

  View,

  ScrollView,
  ActivityIndicator
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { GET_IMOVEIS, GetImoveis } from '@/querys'
import { StatusBar } from 'expo-status-bar'
import tailwind from 'tailwind-rn'

export function HomeScreen (): JSX.Element {
  const query = useQuery<GetImoveis>(GET_IMOVEIS)
  const { data, loading } = query

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView style={tailwind('h-full bg-gray-200 pt-10')}>
        {(loading || !data) && <ActivityIndicator></ActivityIndicator>}
        {data?.imoveis
          .map((imovel) => ({
            ...imovel,
            valorProposta: formatMoney(imovel.valorProposta)
          }))
          .map((imovel) => (
            <ImovelCard key={imovel.id} imovel={imovel}></ImovelCard>
          ))}
        <View style={tailwind('h-20')}></View>
      </ScrollView>
    </>
  )
}

export default HomeScreen
