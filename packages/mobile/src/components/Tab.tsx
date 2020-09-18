import React from 'react'
import {
  BottomTabBarProps
} from '@react-navigation/bottom-tabs'
import { Footer, FooterTab, Button, Text } from 'native-base'
import { Icon } from '@components/Icon'

interface IBarButton {
  isActive: boolean;
  icon: string;
  name: string;
  onPress(): void;
}
const BarButton: React.FC<IBarButton> = props => (
  <Button active={props.isActive} onPress={props.onPress}>
    <Icon name={props.icon} active={props.isActive} />
    {props.isActive && <Text>{props.name}</Text>}
  </Button>
)

const Tab: React.FC<BottomTabBarProps> = ({
  state: { index },
  navigation
}) => {
  return (
    <Footer>
      <FooterTab>
        <BarButton
          isActive={index === 0}
          icon="ios-home"
          name="Propriedades"
          onPress={() => navigation.navigate('home')}
        ></BarButton>
        <BarButton
          isActive={index === 1}
          icon="ios-cog"
          name="Configurações"
          onPress={() => navigation.navigate('settings')}
        ></BarButton>
      </FooterTab>
    </Footer>
  )
}

export default Tab
