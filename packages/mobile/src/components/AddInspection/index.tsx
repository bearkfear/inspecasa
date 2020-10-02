import React from 'react'
import { View, Modal } from 'react-native'
import { Fab } from 'native-base'
import { Icon } from '@components/Icon'
import { ModalCreateInspection } from './ModalCreateInspection'

export function AddInspection (props: {
  imovelId: number
  refresh: () => void
}): JSX.Element {
  const { imovelId } = props

  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <View>
      <Fab
        style={{
          backgroundColor: '#ef6235'
        }}
        onPress={() => {
          setIsVisible(true)
        }}
      >
        <Icon name="ios-add" style={{ color: '#fff' }} />
      </Fab>
      <Modal
        visible={isVisible}
        animationType="slide"
        presentationStyle="formSheet"
        onDismiss={() => setIsVisible(false)}
        onRequestClose={() => setIsVisible(false)}
      >
        <ModalCreateInspection
          imovelId={imovelId}
          close={() => setIsVisible(false)}
          refresh={() => {
            props.refresh()
          }}
        />
      </Modal>
    </View>
  )
}
