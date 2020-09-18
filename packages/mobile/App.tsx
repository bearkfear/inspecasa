import '@/configs'
import { AppLoading } from 'expo'
import { StyleProvider, Root, Container } from 'native-base'
import * as Font from 'expo-font'
import getTheme from './native-base-theme/components'
import lightTheme from './native-base-theme/variables/platform'
import React, { useState } from 'react'
import Navigator from './src/navigations/root-navigator'
import { StoreProvider } from './src/store'
import { Provider } from '@/configs/graphql/Provider'
import { AppearanceProvider } from 'react-native-appearance'

const Index: React.FC = () => {
  const [ready, setReady] = useState(false)
  if (!ready) {
    return (
      <AppLoading
        startAsync={async () =>
          await Font.loadAsync({
            Ionicons: require('native-base/Fonts/Ionicons.ttf')
            // Feather: require('native-base/Fonts/Feather.ttf')
          })
        }
        onFinish={() => setReady(true)}
      ></AppLoading>
    )
  }
  return (
    <StyleProvider style={getTheme(lightTheme)}>
      <StoreProvider>
        <Provider>
          <AppearanceProvider>
            <Root>
              <Container>
                <Navigator />
              </Container>
            </Root>
          </AppearanceProvider>
        </Provider>
      </StoreProvider>
    </StyleProvider>
  )
}

export default Index
