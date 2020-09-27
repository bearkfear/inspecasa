import React from 'react'
import { Linking, Text, View, TouchableOpacity, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { Video } from 'expo-av'
import HTML from 'react-native-render-html'
import { Midia } from '../VistoriaCard'

export function VistoriaMidiaCard ({ midia }: { midia: Midia }): JSX.Element {
  async function onOpenUrl (url: string): Promise<void> {
    const canOpen = await Linking.canOpenURL(url)

    if (canOpen) {
      Linking.openURL(url)
    } else {
      alert('Não foi possível abrir essa mídia')
    }
  }

  return (
    <View style={tailwind('flex-row items-start mb-2 mr-2')}>
      {midia.extensao !== '.mp4' ? (
        <Image
          style={tailwind('w-12 h-12 rounded overflow-hidden')}
          key={midia.id}
          source={{ uri: midia.url }}
        ></Image>
      ) : (
        <Video
          source={{
            uri: midia.url
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={tailwind('w-12 h-12')}
        />
      )}
      <View style={tailwind('ml-1 flex-1 flex items-end')}>
        <View
          style={tailwind(
            'bg-gray-200 w-full rounded-lg px-4 py-2 ml-1 flex-1'
          )}
        >
          <HTML html={midia.descricao}></HTML>
        </View>
        <TouchableOpacity
          onPress={() => onOpenUrl(midia.url)}
          style={tailwind(
            'px-2 py-1 bg-white border border-orange-500 mt-2 rounded'
          )}
        >
          <Text style={tailwind('text-orange-500 text-xs font-bold ')}>
            Abrir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
