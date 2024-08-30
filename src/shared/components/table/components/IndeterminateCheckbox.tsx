import React, { HTMLProps } from 'react'
import { BoxWrapper } from '../styles'

const IndeterminateCheckbox = ({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <BoxWrapper>
      <input
        type="checkbox"
        ref={ref}
        {...rest}
      />
    </BoxWrapper>
  )
}

export default IndeterminateCheckbox
