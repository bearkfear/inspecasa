import React from 'react'
import { Ionicons } from '@expo/vector-icons'
interface IconProps {
  name: string;
  active?: boolean;
  style?: {[key: string]: string | number};
}

export const Icon: React.FC<IconProps> = ({
  style = {},
  name, active = false
}) => (
  <Ionicons
    name={name}
    size={28}
    style={style}
    color={active ? 'rgba(239, 98, 55, 1)' : '#000'}
  />
)
