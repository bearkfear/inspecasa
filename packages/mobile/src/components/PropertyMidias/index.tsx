import React, { useRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_MIDIAS_FROM_IMOVEL } from '@/querys'
import { RefreshControl } from 'react-native'
import { Spinner, Content, Body, Text } from 'native-base'
import { Card, Image } from 'react-native-elements'
import { Video } from 'expo-av'
interface Props {
  id: number;
}

const PropertyMidias: React.FC<Props> = ({ id }) => {
  const refreshRef = useRef(false)

  const resp = useQuery(GET_MIDIAS_FROM_IMOVEL, {
    variables: {
      id
    }
  })

  const { data, loading } = resp

  if (loading) {
    return <Spinner />
  }

  refreshRef.current = false

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
      {data?.imovel.midias.map((midia) => (
        <Card key={midia.createdAt}>
          {midia.extensao === '.mp4' ? (
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
              style={{ width: 300, height: 300 }}
            />
          ) : (
            <Image
              source={{ uri: midia.url }}
              style={{ width: 100, height: 100 }}
              PlaceholderContent={<Spinner />}
            />
          )}
          <Text>{midia.descricao}</Text>
          <Text>
            Criado em: {new Date(Number(midia.createdAt)).toLocaleString()}
          </Text>
        </Card>
      ))}
      {!loading && !data?.imovel.midias.length && (
        <Text>Não possui midias</Text>
      )}
    </Content>
  )
}

export default PropertyMidias
