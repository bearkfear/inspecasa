import React, { useContext } from 'react'
import Store from '@store/index'
import { observer } from 'mobx-react'
import AppNavigator from './app-navigator'
import Views from '@views/index'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

const AuthNavigator = () => {
  const store = useContext(Store)
  return (
    <Navigator
      screenOptions={{ header: () => null }}
      mode="modal"
    >
      {
        store.isAuth ? (
          <Screen name="app" component={AppNavigator}></Screen>
        ) : (
          <Screen name="auth" component={Views.Login}></Screen>
        )
      }
    </Navigator>
  )
}

export default observer(AuthNavigator)
