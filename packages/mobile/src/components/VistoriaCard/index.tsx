import React from 'react'
import { Text, View, Image, ActivityIndicator } from 'react-native'
import tailwind from 'tailwind-rn'
import { colors } from '@inspecasa/common'
import HTML from 'react-native-render-html'
import { VistoriaMidiaCard } from '../VistoriaMidiaCard'

export interface Responsavel {
  id: string
  nome: string
  sobrenome: string
  email: string
  urlImg: string
  __typename: string
}

export interface Midia {
  id: string
  url: string
  extensao: string
  createdAt: string
  descricao: string
  __typename: string
}

export interface Vistoria {
  id: string
  createdAt: string
  observacao: string
  responsavel: Responsavel
  midias: Midia[]
  __typename: string
}

export function VistoriaCard (props: { vistoria: Vistoria }): JSX.Element {
  const { vistoria } = props

  return (
    <View style={tailwind('border-b border-gray-300')}>
      <View style={tailwind('flex-row px-2 py-2 ')}>
        <View style={tailwind('flex-col items-center')}>
          <Image
            source={{ uri: vistoria.responsavel.urlImg }}
            PlaceholderContent={<ActivityIndicator />}
            style={tailwind('w-12 h-12 rounded-full')}
          />
          <Text
            style={[tailwind('text-xs font-bold'), { color: colors.primary }]}
          >
            {vistoria.responsavel.nome}
          </Text>
        </View>
        <View style={tailwind('bg-gray-200 rounded-lg px-4 py-2 ml-1 flex-1')}>
          <HTML html={vistoria.observacao} />
        </View>
      </View>
      <View style={tailwind('ml-16')}>
        <Text style={tailwind('text-xs text-gray-800 font-bold')}>
          {new Date(Number(vistoria.createdAt)).toLocaleString()}
        </Text>
        <View style={tailwind('mt-2 flex-1 flex-col')}>
          {vistoria.midias.map((midia) => (
            <VistoriaMidiaCard
              midia={midia}
              key={midia.id + midia.extensao}
            ></VistoriaMidiaCard>
          ))}
        </View>
      </View>
    </View>
  )
}
