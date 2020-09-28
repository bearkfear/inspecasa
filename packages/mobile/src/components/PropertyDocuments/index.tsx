import React, { useRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_DOCS_FROM_IMOVEL } from '@/querys'
import tailwind from 'tailwind-rn'
import { Spinner, Content } from 'native-base'
import { Text, View, RefreshControl, Linking } from 'react-native'
import { Icon } from '../Icon'
import { TouchableOpacity } from 'react-native-gesture-handler'
export interface Documento {
  id: string
  changedAt: string
  createdAt: string
  descricao: string
  extensao: string
  url: string
  __typename: string
}

export interface Imovel {
  id: string
  documentos: Documento[]
  __typename: string
}

export interface RootObject {
  imovel: Imovel
}

interface Props {
  id: number
}

export default function Documents ({ id }) {
  const refreshRef = useRef(false)

  const resp = useQuery<RootObject>(GET_DOCS_FROM_IMOVEL, {
    variables: {
      id
    }
  })

  const { data, loading, error } = resp

  if (loading) {
    return <Spinner />
  }
  refreshRef.current = false

  async function onOpenLink (url: string): Promise<void> {
    const canOpen = await Linking.canOpenURL(url)

    console.log('canOpen', canOpen)

    if (canOpen) {
      await Linking.openURL(url)
    } else {
      alert('Não pode ser baixado')
    }
  }

  return (
    <Content
      refreshControl={
        <RefreshControl
          refreshing={refreshRef.current}
          onRefresh={() => {
            if (loading && resp) {
              refreshRef.current = true
              resp.refetch()
            }
          }}
        />
      }
    >
      <View>
        {data.imovel.documentos.length === 0 && !loading && (
          <View style={tailwind('flex-col items-center')}>
            <View
              style={tailwind(
                'rounded-full overflow-hidden bg-orange-600 px-2 py-2 px-4 my-2'
              )}
            >
              <Text style={tailwind('text-sm text-white')}>
                Nenhuma documento ainda!
              </Text>
            </View>
          </View>
        )}

        {data?.imovel.documentos.map((doc) => (
          <View
            key={doc.id + data?.imovel.id}
            style={tailwind('border-b border-gray-300 px-2 py-2')}
          >
            <View style={tailwind('flex-row items-center')}>
              <View style={tailwind('pr-4')}>
                <Icon
                  style={tailwind('text-gray-900')}
                  name="ios-albums"
                ></Icon>
              </View>
              <View style={tailwind('flex-1')}>
                <View
                  style={tailwind(
                    'bg-gray-200 w-full flex-1 rounded px-2 py-2'
                  )}
                >
                  <Text style={tailwind('text-gray-900')}>{doc.descricao}</Text>
                </View>
                <View style={tailwind('flex-row justify-between items-center')}>
                  <Text style={tailwind('text-gray-800 text-sm py-2')}>
                    {new Date(Number(doc.createdAt)).toLocaleString()}
                  </Text>
                  <TouchableOpacity
                    style={tailwind(
                      'border px-2 py-1 rounded border-orange-600'
                    )}
                    onPress={() => onOpenLink(doc.url)}
                  >
                    <Text style={tailwind('text-sm text-orange-600 font-bold')}>
                      Baixar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Content>
  )
}
