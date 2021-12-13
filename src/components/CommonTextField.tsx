import React from 'react'
import { css } from '@emotion/react'
import TextField from '@mui/material/TextField'
import { TARGET } from '../features/types'

type Props = {
  id?: string
  label?: string
  type?: string
  name: string
  value: null | string | number
  index?: number
  onChange: Function
  width?: string
}

const CommonTextField: React.FC<Props> = (props) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let target: TARGET = {
      name: props.name,
      value: event.target.value,
    }
    if ('index' in props) {
      target.index = props.index
    }
    props.onChange(target)
  }

  const widthStyle = css`
    ${'width' in props && 'width: ' + props.width}
  `

  return (
    <TextField
      variant='standard'
      margin='normal'
      fullWidth
      id={'id' in props ? props.id : undefined}
      label={'label' in props ? props.label : undefined}
      type={'type' in props ? props.type : undefined}
      name={props.name}
      value={props.value}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(event) => handleInputChange(event)}
      css={widthStyle}
    />
  )
}

export default CommonTextField
