import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Content,
  Text,
  Header,
  Body,
  Left,
  Title,
  Button,
  Right,
  Textarea,
  Label,
  Separator,
  View
} from 'native-base'
import { Image } from 'react-native'
import { Icon } from '@components/Icon'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
const CadastroVistoria: React.FC<{}> = () => {
  const navigation = useNavigation()
  const [images, setImages] = useState([])

  useEffect(() => {
    async function getPermission () {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status !== 'granted') {
          alert('Desculpe, é preciso ter acesso as suas fotos para poder criar vistorias!')
        }
      }
    }
    getPermission()
  }, [])

  async function handlePickImage () {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      })

      if (!result.cancelled) {
        setImages(img => [...img, result])
      }

      console.log(result)
    } catch (E) {
      console.log(E)
    }
  }

  return (
    <>
      <Header>
        <Left>
        </Left>
        <Body >
          <Title>Nova Vistoria</Title>
        </Body>
        <Right>
          <Button icon transparent onPress={() => navigation.goBack()}>
            <Icon name="ios-close" active />
          </Button>
        </Right>
      </Header>
      <Content padder>
        <Label>Observações:</Label>
        <Textarea
          bordered
          underline
          rowSpan={5}
          placeholder="Deixe uma observação"
        />
        <Separator/>

        <Button full>
          <Text>Salvar</Text>
        </Button>
        <Button icon full onPress={() => handlePickImage()}>
          <Text>Adicionar midias</Text>
          <Icon name="ios-camera"/>
        </Button>

        <Separator/>
        {images.map(image => (
          <Image
            key={image.uri}
            source={{ uri: image.uri }}
            style={{ width: 200, height: 200 }}
          />
        ))}
      </Content>
    </>
  )
}

export default CadastroVistoria
