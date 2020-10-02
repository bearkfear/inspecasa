import React from 'react'
import Tab from '@components/Tab'
import Views from '@views/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

const bottomTab = createBottomTabNavigator()
const stack = createStackNavigator()

const Home = () => (
  <stack.Navigator
    initialRouteName="propriedades"
  >
    <stack.Screen
      name="propertyList"
      component={Views.Home}
      options={{
        header: () => null
      }}
    ></stack.Screen>
    <stack.Screen
      name="propertyDetails"
      component={Views.PropertyDetail}
      options={{
        header: () => null
      }}
    ></stack.Screen>
  </stack.Navigator>
)

const bottomNavigator: React.FC<{}> = () => {
  return (
    <>
      <bottomTab.Navigator
        initialRouteName="home"
        tabBar={props => <Tab {...props} />}
      >
        <bottomTab.Screen
          name="home"
          component={Home}
        ></bottomTab.Screen>
        <bottomTab.Screen
          name="settings"
          component={Views.Settings}
        ></bottomTab.Screen>

      </bottomTab.Navigator>

    </>
  )
}

const AppNavigator: React.FC<{}> = () => (
  <stack.Navigator mode="modal">
    <stack.Screen name="HomeTabs" component={bottomNavigator} />
  </stack.Navigator>
)

export default AppNavigator
