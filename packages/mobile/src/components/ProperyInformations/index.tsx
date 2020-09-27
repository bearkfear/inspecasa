import React from 'react'
import { Text, Spinner, Content, Body, Left, View } from 'native-base'
import { useQuery } from '@apollo/react-hooks'
import { GET_IMOVEL } from '@/querys'
import { Icon } from '@/components/Icon'
import { Categoria } from '@inspecasa/common'
import HTML from 'react-native-render-html'
interface Props {
  id: number
}

const PropertyInformations: React.FC<Props> = ({ id }) => {
  const resp = useQuery(GET_IMOVEL, { variables: { id } })

  const { data, loading } = resp

  if (loading) {
    return <Spinner />
  }

  const {
    bairro,
    cep,
    cidade,
    complemento,
    numero,
    rua,
    uf
  } = data.imovel.endereco
  return (
    <Content
      padder
      onScrollEndDrag={({ nativeEvent }) => {
        if (nativeEvent.contentOffset.y <= -100) {
          resp.refetch()
        }
      }}
    >
      <Text>Categoria: {Categoria[data.imovel.categoria]}</Text>
      <Text>Valor Proposto: {data.imovel.valorProposta}</Text>
      <Text>Numero de Quartos: {data.imovel.numQuartos}</Text>
      <Text>Descrição:</Text>
      <Text>Endereço: </Text>
      <Text>{`${rua} - ${numero} ${complemento} ${cep} ${bairro} ${cidade}/${uf} `}</Text>
      <HTML html={data.imovel.descricao} />
    </Content>
  )
}

export default PropertyInformations
