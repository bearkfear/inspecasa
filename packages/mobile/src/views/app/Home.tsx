import React from 'react'
import HTML from 'react-native-render-html'
import { useNavigation } from '@react-navigation/native'
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Text
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { GET_IMOVEIS, GetImoveis } from '@/querys'
import { StatusBar } from 'expo-status-bar'
import tailwind from 'tailwind-rn'

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
    <SafeAreaView style={tailwind('h-full bg-gray-100')}>
      <View style={tailwind('pt-12 items-center')}>
        <View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
          <Text style={tailwind('text-blue-800 font-semibold')}>
            Hello Tailwind
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )

  // return (
  //   <SafeAreaView>
  //     {(loading || !data) && <Spinner></Spinner>}
  //     {data?.imoveis.map((imovel) => (
  //       <TouchableOpacity
  //         key={imovel.id}
  //         onPress={() => nav.navigate('propertyDetails', imovel)}
  //       >
  //         <PriceLabel>valor proposto</PriceLabel>
  //         <Price>R$: {imovel.valorProposta}</Price>
  //       </TouchableOpacity>
  //     ))}
  //   </SafeAreaView>
  // )
}

export default HomeScreen
