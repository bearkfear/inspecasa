import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import tailwind from 'tailwind-rn'
import { Imovel } from '@/querys'
import HTML from 'react-native-render-html'
import { colors, Categoria } from '@inspecasa/common'

export function ImovelCard (props: { imovel: Imovel }): JSX.Element {
  const nav = useNavigation()
  const { imovel } = props
  return (
    <TouchableOpacity
      onPress={() => nav.navigate('propertyDetails', imovel)}
      key={imovel.id + imovel.valorProposta}
      style={tailwind(
        'mx-2 mb-2 p-3 border bg-white border-gray-300 rounded-lg'
      )}
    >
      <Text
        style={[
          tailwind('font-bold text-sm uppercase'),
          { color: colors.primary }
        ]}
      >
        {Categoria[imovel.categoria]}
      </Text>
      <Text style={tailwind('text-lg')}>R$ {imovel.valorProposta}</Text>
      <View>
        <HTML html={imovel.descricao}></HTML>
      </View>
      <View>
        <View style={tailwind('flex-row items-center overflow-hidden')}>
          <View style={tailwind('rounded-full bg-gray-300')}>
            <Text style={tailwind('text-xs px-2 py-1')}>
              Situação: {imovel.situacao ? 'A Venda' : 'Vendido'}
            </Text>
          </View>
          <View style={tailwind('rounded-full bg-gray-300 ml-2')}>
            <Text style={tailwind('text-xs px-2 py-1')}>
              Quartos: {imovel.numQuartos}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
