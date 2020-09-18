import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_VISTORIAS } from '@/querys'
import { useNavigation } from '@react-navigation/native'
import {
  Spinner,
  Content,
  Body,
  Text,
  Card,
  CardItem,
  Button,
  Fab,
  View
} from 'native-base'
import { Icon } from '@/components/Icon'
interface Props {
  id: number;
}

const Inspection: React.FC<Props> = ({ id }) => {
  const navigation = useNavigation()
  const resp = useQuery(GET_VISTORIAS, {
    variables: {
      id
    }
  })

  const { data, loading, error } = resp

  if (loading) {
    return <Spinner />
  }
  return <>
    <Content padder>
      {
        data.imovel.vistorias.length === 0 && !loading &&
        <Text>Nenhuma vistoria ainda!</Text>
      }
      {
        data.imovel.vistorias.map(vistoria => {
          return (
            <Card key={vistoria.id}>
              <CardItem header bordered>
                <Text>
                  {new Date(Number(vistoria.createdAt)).toLocaleString()}
                </Text>
              </CardItem>
              <CardItem>
                <Text>
                  {vistoria.observacao}
                </Text>
              </CardItem>
              <CardItem>
                <Text>{ JSON.stringify(vistoria.midias, null, 4)}</Text>
              </CardItem>

            </Card>
          )
        })
      }
    </Content>
    <Fab
      style={{
        backgroundColor: '#ef6235'
      }}
      onPress={() => { navigation.navigate('CadastroVistoria', { id }) }}
    >
      <Icon name="ios-add" style={{ color: '#fff' }} />
    </Fab>
  </>
}

export default Inspection
