import React, { useState } from 'react'
import { View, Button, Modal } from 'react-native'
import { ModalCreateMidia } from './ModalCreateMidia'
interface Props {
  addMidia: (midia) => void
}

export function CreateMidia ({ addMidia }: Props): JSX.Element {
  const [modalMidia, setModalMidia] = useState(false)

  return (
    <View>
      <Button
        title="Adicionar Mídia"
        onPress={() => {
          setModalMidia(true)
        }}
      />
      <Modal
        visible={modalMidia}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ModalCreateMidia
          close={() => {
            setModalMidia(false)
          }}
          addMidia={addMidia}
        />
      </Modal>
    </View>
  )
}
