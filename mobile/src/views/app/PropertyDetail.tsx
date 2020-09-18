import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Container, Title, Button, Tabs, Tab, Text } from 'native-base'
import { Header } from 'react-native-elements'
import { Icon } from '@components/Icon'
import PropertyInformations from '@/components/ProperyInformations'
import PropertyInspections from '@/components/PropertyInspections'
import PropertyMidias from '@/components/PropertyMidias'
import PropertyDocs from '@/components/PropertyDocuments'

const PropertyDetail: React.FC<{}> = () => {
  const route = useRoute()
  const navigator = useNavigation()

  return (
    <Container>
      <Header backgroundColor="#EF6237">
        <Button transparent onPress={() => navigator.goBack()}>
          <Icon active name="md-arrow-back" style={{ color: '#fff' }} />
        </Button>
        <Title>
          <Text style={{ color: '#fff', fontWeight: '900' }}>Sobre</Text>
        </Title>
      </Header>
      <Tabs
        tabBarBackgroundColor="#EF6237"
        tabBarActiveTextColor="#ef6235"
        tabBarPosition="top"
      >
        <Tab heading="Detalhes">
          <PropertyInformations id={route.params.id} />
        </Tab>
        <Tab heading="Vistorias">
          <PropertyInspections id={route.params.id} />
        </Tab>
        <Tab heading="Docs">
          <PropertyDocs id={route.params.id} />
        </Tab>
        <Tab heading="Mídias">
          <PropertyMidias id={route.params.id} />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default PropertyDetail
