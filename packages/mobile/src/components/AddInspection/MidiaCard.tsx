import React from 'react'
import { View, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { Midia } from './ModalCreateInspection'
import HTML from 'react-native-render-html'
export interface Props {
  midia: Midia
}

export function MidiaCard ({ midia }: Props): JSX.Element {
  return (
    <View style={tailwind('h-20 flex flex-row mb-2')}>
      <Image
        source={{ uri: midia.url }}
        style={tailwind('w-20 h-20 rounded')}
      />

      <View style={tailwind('flex-1 bg-gray-200 rounded ml-2 px-2 py-2')}>
        <HTML html={midia.observacao} />
      </View>
    </View>
  )
}
