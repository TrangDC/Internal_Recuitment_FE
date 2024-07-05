import { Collapse } from '@mui/material'
import { Text15md } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { ReactNode } from 'react'
import ChevronUp from 'shared/components/icons/ChevronUpIcon'
import ChevronDown from 'shared/components/icons/ChevronDownIcon'

type PermissonCollapseProps = {
  children: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  title: string
}

function AppCollapse({
  children,
  open,
  setOpen,
  title,
}: PermissonCollapseProps) {
  return (
    <FlexBox flexDirection={'column'} padding={2}>
      <FlexBox
        sx={{ cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
        marginBottom={2}
        maxWidth={'fit-content'}
      >
        <Text15md color={'primary.800'}>{title}</Text15md>
        {open ? <ChevronUp /> : <ChevronDown />}
      </FlexBox>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </FlexBox>
  )
}

export default AppCollapse
