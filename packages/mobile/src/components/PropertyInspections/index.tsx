import React, { useRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_VISTORIAS } from '@/querys'

import tailwind from 'tailwind-rn'
import { VistoriaCard, Vistoria } from '../VistoriaCard'
import { RefreshControl } from 'react-native'

import { Spinner, Content, Text, View } from 'native-base'
import { AddInspection } from '../AddInspection'

interface Props {
  id: number
}

export default function Inspection ({ id }: Props): JSX.Element {
  const refreshRef = useRef(false)

  const resp = useQuery(GET_VISTORIAS, {
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
    <>
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
        {data.imovel.vistorias.length === 0 && !loading && (
          <View style={tailwind('flex-col items-center')}>
            <View
              style={tailwind(
                'rounded-full overflow-hidden bg-orange-600 px-2 py-2 px-4 my-2'
              )}
            >
              <Text style={tailwind('text-sm text-white')}>
                Nenhuma vistoria ainda!
              </Text>
            </View>
          </View>
        )}
        <View style={tailwind('flex-col')}>
          {data?.imovel?.vistorias?.map((vistoria: Vistoria) => (
            <VistoriaCard key={vistoria.id} vistoria={vistoria}></VistoriaCard>
          ))}
          <View style={tailwind('w-10 h-32')}></View>
        </View>
      </Content>
      <AddInspection refresh={() => {
        resp.refetch()
      }} imovelId={id} />
    </>
  )
}
