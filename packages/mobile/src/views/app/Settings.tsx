import React, { useContext, useRef } from 'react'
import { observer } from 'mobx-react'
import Store from '@/store'

import { Spinner } from 'native-base'
import { SafeAreaView, View, Text } from 'react-native'
import tailwind from 'tailwind-rn'
import { Image } from 'react-native-elements'
import { Icon } from '@/components/Icon'
import { useQuery } from '@apollo/react-hooks'
import { GET_CURRENT_USER } from '@/querys'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Settings: React.FC<{}> = () => {
  const store = useContext(Store)
  const refreshRef = useRef(false)

  const resp = useQuery(GET_CURRENT_USER)
  const { data, loading } = resp

  if (!loading) {
    refreshRef.current = false
  }

  return (
    <SafeAreaView style={tailwind('h-full bg-gray-100')}>
      <StatusBar style="dark" />
      <View
        style={tailwind(`
          px-10
          pt-10
        `)}
      >
        <View style={tailwind('flex-row items-center')}>
          <View style={tailwind('mr-6')}>
            <Image
              source={{ uri: data?.me?.urlImg }}
              PlaceholderContent={<Spinner />}
              style={tailwind('w-20 h-20 rounded-full')}
            />
          </View>
          <View>
            <Text
              style={tailwind(`
                text-lg 
                font-bold 
                text-orange-600
              `)}
            >
              {data?.me?.nome} {data?.me?.sobrenome}
            </Text>
            <Text
              style={tailwind(`
          text-lg
          text-sm
        `)}
            >
              {data?.me?.email}
            </Text>
            <Text
              style={tailwind(`
          uppercase
          font-bold
        `)}
            >
              {data?.me?.funcao}
            </Text>
          </View>
        </View>
        <View
          style={tailwind(`
            py-10
          `)}
        >
          <View>
            <View
              style={tailwind(`
                bg-transparent
                flex-row
                items-center
                justify-between
                px-3
                py-2
                rounded-lg
              `)}
            >
              <Text style={tailwind('font-bold')}>Geral</Text>
            </View>

            <TouchableOpacity
              onPress={() => store.clearStore()}
              style={tailwind(`
                bg-gray-200
                flex-row
                items-center
                justify-between
                px-4
                py-2
                rounded-lg
              `)}
            >
              <Text style={tailwind('text-sm')}>Sair</Text>
              <Icon name="ios-log-out" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default observer(Settings)
