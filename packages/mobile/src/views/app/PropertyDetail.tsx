import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Container, Button, Tabs, Tab, Text } from 'native-base'
import { Header } from 'react-native-elements'
import { Icon } from '@components/Icon'
import PropertyInformations from '@/components/ProperyInformations'
import PropertyInspections from '@/components/PropertyInspections'
import PropertyMidias from '@/components/PropertyMidias'
import PropertyDocs from '@/components/PropertyDocuments'
import { StatusBar } from 'expo-status-bar'
import tailwind, { getColor } from 'tailwind-rn'
import { colors } from '@inspecasa/common'

const PropertyDetail: React.FC<{}> = () => {
  const route = useRoute()
  const navigator = useNavigation()

  console.log('getcolors', getColor('gray-200'))

  const tabs = [
    {
      name: 'Detalhes',
      Component: PropertyInformations
    },
    {
      name: 'Vistorias',
      Component: PropertyInspections
    },
    {
      name: 'Docs',
      Component: PropertyDocs
    },
    {
      name: 'Mídias',
      Component: PropertyMidias
    }
  ]

  return (
    <Container style={tailwind('bg-gray-200')}>
      <StatusBar style="dark"></StatusBar>
      <Header containerStyle={tailwind('bg-gray-200')}>
        <Button transparent onPress={() => navigator.goBack()}>
          <Icon
            active
            name="md-arrow-back"
            style={[{ color: colors.primary }]}
          />
        </Button>

        <Text style={[{ color: colors.primary }]}>Sobre</Text>
      </Header>
      <Tabs>
        {tabs.map((p, i) => (
          <Tab
            heading={p.name}
            key={p.name + i}
            tabStyle={tailwind('bg-gray-200')}
            activeTabStyle={tailwind('bg-gray-200')}
            activeTextStyle={{ color: colors.primary }}
          >
            <p.Component id={route.params.id}></p.Component>
          </Tab>
        ))}
      </Tabs>
    </Container>
  )
}

export default PropertyDetail
