import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './auth-navigator'
import { StatusBar } from 'expo-status-bar'

const RootNavigator: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <StatusBar style="inverted" />
      <AuthNavigator />
    </NavigationContainer>
  )
}

export default RootNavigator
