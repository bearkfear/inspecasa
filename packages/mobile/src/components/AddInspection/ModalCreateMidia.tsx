import { storage } from 'firebase/app'
import 'firebase/storage'
import uuid from 'uuid-random'
import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import * as ImagePicker from 'expo-image-picker'
import { Icon } from '../Icon'
import { Textarea } from 'native-base'
import { Midia } from './ModalCreateInspection'

export interface Props {
  close: () => void
  addMidia: (midia: Midia) => void
}

export interface ImageLibrary {
  width: number
  height: number
  cancelled: boolean
  type: string
  uri: string
}

export function ModalCreateMidia ({ close, addMidia }: Props): JSX.Element {
  const [midia, setMidia] = React.useState('')
  const [isUploading, setIsUploading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [observacao, setObservacao] = React.useState('')
  const getPermission = React.useCallback(
    async function getPermission () {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
        return close()
      }
    },
    [close]
  )

  const pickImage = React.useCallback(async function () {
    const result: ImageLibrary = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    })

    if (result.cancelled) {
      return
    }
    setMidia(result.uri)
  }, [])

  useEffect(() => {
    (async () => {
      await getPermission()
    })()
  }, [getPermission])

  async function saveImage (): Promise<void> {
    const uri = midia

    if (!uri || !observacao) {
      return alert('Precisa ter uma observação e uma mídia')
    }
    setIsUploading(true)

    const imageRef = storage().ref().child(`imoveis/midias/${uuid()}`)

    const blobfile = await (await fetch(`file://${uri}`)).blob()
    const task = imageRef.put(blobfile)

    task.on('state_changed', ({ bytesTransferred, totalBytes }) => {
      const p = (bytesTransferred / totalBytes) * 100
      setProgress(p)
    })

    try {
      await task
      const downloadUrl = await imageRef.getDownloadURL()

      addMidia({
        observacao,
        url: downloadUrl
      })
      close()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={tailwind('flex-1 flex mt-6 px-4')}>
      <View style={tailwind('flex flex-row items-center justify-between')}>
        <TouchableOpacity
          disabled={isUploading}
          onPress={() => saveImage()}
          style={tailwind('w-12')}
        >
          <Text style={tailwind('text-orange-600 font-bold')}>Salvar</Text>
        </TouchableOpacity>
        {/* Top */}
        <Text style={tailwind('text-lg font-bold')}>Adicionar Midia</Text>
        <TouchableOpacity
          onPress={() => {
            close()
          }}
          disabled={isUploading}
          style={tailwind('px-2 rounded-full  w-12')}
        >
          <Icon style={tailwind('text-right ')} name="ios-close"></Icon>
        </TouchableOpacity>
      </View>
      <View style={tailwind('flex-1 flex-col')}>
        <View style={tailwind('my-4 rounded-lg overflow-hidden')}>
          {midia !== '' ? (
            <View style={tailwind('relative')}>
              <Image style={tailwind('h-48')} source={{ uri: midia }}></Image>
              <View
                style={tailwind(
                  'absolute w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center bottom-0 left-0 mx-2 my-2'
                )}
              >
                <Text style={tailwind('text-center')}>
                  <Text style={tailwind('text-white text-lg text-center')}>
                    {progress}
                  </Text>
                  <Text style={tailwind('text-xs text-white')}>%</Text>
                </Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={tailwind(
                'h-48 bg-gray-200 flex items-center justify-center border-gray-300 border'
              )}
              onPress={() => pickImage()}
            >
              <View>
                <Icon name="ios-add" />
              </View>
              <Text style={tailwind('text-black font-bold text-lg')}>
                Selecionar
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Textarea
          disabled={isUploading}
          rowSpan={2}
          bordered
          underline={false}
          value={observacao}
          onChangeText={setObservacao}
          placeholder="Obserções sobre a mídia selecionada"
          style={tailwind('rounded-lg px-4 py-4')}
        />
      </View>
    </View>
  )
}
