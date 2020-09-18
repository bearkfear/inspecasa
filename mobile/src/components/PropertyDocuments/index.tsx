import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_DOCS_FROM_IMOVEL } from '@/querys'

import {
  Spinner,
  Content,
  Body,
  Text
} from 'native-base'

interface Props {
  id: number;
}

const Inspection: React.FC<Props> = ({ id }) => {
  const resp = useQuery(GET_DOCS_FROM_IMOVEL, {
    variables: {
      id
    }
  })

  const { data, loading, error } = resp

  if (loading) {
    return <Spinner />
  }
  return <Content>
    <Body>
      <Text>
        { JSON.stringify(data?.imovel.documentos, null, 4)}
      </Text>
    </Body>
  </Content>
}

export default Inspection
