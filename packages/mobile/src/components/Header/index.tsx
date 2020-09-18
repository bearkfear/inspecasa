import React from 'react'

import {
  Header,
  Body,
  Title
} from 'native-base'

import styled from 'styled-components/native'
interface HeadProps {
  title: string;
}

const HeadTitle = styled(Title)`
  font-weight: 700;
`

const Head: React.FC<HeadProps> = ({ title }) => {
  return (
    <Header>
      <Body>
        <HeadTitle>{title}</HeadTitle>
      </Body>
    </Header>
  )
}

export default Head
