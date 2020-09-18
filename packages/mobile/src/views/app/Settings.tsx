import React, { useContext, useRef } from 'react'
import { observer } from 'mobx-react'
import Store from '@/store'

import {
  Content,
  Text,
  H3,
  Spinner,
  ListItem,
  Left,
  Body,
  Right,
  List,
  Title,
  Header
} from 'native-base'
import { Image } from 'react-native-elements'
import { Icon } from '@/components/Icon'
import { useQuery } from '@apollo/react-hooks'
import { GET_CURRENT_USER } from '@/querys'
import { StatusBar } from 'expo-status-bar'
import styled from 'styled-components/native'

const User = styled.View`
  align-items: center;
  justify-content: space-evenly;
`

const Box = styled.View`
  padding-top: 10px;
`

const Settings: React.FC<{}> = () => {
  const store = useContext(Store)
  const refreshRef = useRef(false)

  const resp = useQuery(GET_CURRENT_USER)
  const { data, loading } = resp

  if (!loading) {
    refreshRef.current = false
  }

  return (
    <>
      <StatusBar style="dark" />
      <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
        {loading ? (
          <Spinner />
        ) : (
          <User>
            <Image
              source={{ uri: data.me?.urlImg }}
              PlaceholderContent={<Spinner />}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
            <Box>
              <H3>
                {data?.me.nome} {data.me?.sobrenome}
              </H3>
            </Box>
            <Box>
              <Text note>{data.me?.email}</Text>
            </Box>
            <Box>
              <Text>{data.me?.funcao}</Text>
            </Box>
          </User>

        // <List>
        //   <ListItem thumbnail itemHeader>

        //   </ListItem>
        //   <ListItem>
        //     <Body>
        //       <Text>Perfil</Text>2
        //     </Body>
        //   </ListItem>
        //   <ListItem onPress={() => store.clearStore()} last icon>
        //     <Left>
        //       <Icon name="ios-log-out"></Icon>
        //     </Left>
        //     <Body>
        //       <Text>Sair</Text>
        //     </Body>
        //     <Right></Right>
        //   </ListItem>
        // </List>
        )}
      </Content>
    </>
  )
}

export default observer(Settings)
