import React, { useState } from 'react'
import { Text, View, Button, FlatList } from 'react-native'
import { Textarea } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import tailwind from 'tailwind-rn'

import { Icon } from '@components/Icon'
import { MidiaCard } from './MidiaCard'
import { CreateMidia } from './CreateMidia'
import { useMutation } from '@apollo/react-hooks'
import { ADD_VISTORIA } from '@/querys'

export interface Props {
  imovelId: number
  close: () => void
  refresh: () => void
}
export interface Midia {
  observacao: string
  url: string
}
export function ModalCreateInspection ({
  close,
  imovelId,
  refresh
}: Props): JSX.Element {
  const [midias, setMidias] = useState<Midia[]>([])
  const [observacao, setObservacao] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [addVistoria, { data }] = useMutation(ADD_VISTORIA)

  async function onSave () {
    if (!observacao) {
      return alert('Precisa ter uma observação')
    }
    setIsSubmitting(true)

    const response = await addVistoria({
      variables: {
        imovelId,
        vistoriaInput: {
          observacao,
          midias: midias.map((midia) => ({
            descricao: midia.observacao,
            url: midia.url,
            extensao: '.jpg'
          }))
        }
      }
    })

    console.log('response', response)
    console.log('data', data)

    close()
    refresh()
  }

  return (
    <View style={tailwind('flex-1 flex mt-6 px-4')}>
      <View style={tailwind('flex flex-row items-center justify-between')}>
        <View></View>
        {/* Top */}
        <Text style={tailwind('text-lg font-bold')}>Adicionar Vistoria</Text>
        <TouchableOpacity
          disabled={isSubmitting}
          onPress={() => {
            close()
          }}
          style={tailwind('px-2 rounded-full')}
        >
          <Icon name="ios-close"></Icon>
        </TouchableOpacity>
      </View>
      <View style={tailwind('my-2 flex-1')}>
        <View>
          <Textarea
            value={observacao}
            onChangeText={setObservacao}
            rowSpan={4}
            bordered
            underline
            placeholder="Digite suas obserções sobre o imóvel"
            style={tailwind('rounded-lg')}
          />
        </View>
        <View style={tailwind('flex flex-1 my-4')}>
          <FlatList
            data={midias}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => <MidiaCard midia={item} />}
          />
        </View>
        <View>
          <View style={tailwind('flex flex-row items-center justify-between')}>
            <CreateMidia
              addMidia={(midia: Midia) => {
                setMidias((last) => [...last, midia])
              }}
            />
            <Button
              title="Salvar"
              onPress={() => {
                onSave()
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
