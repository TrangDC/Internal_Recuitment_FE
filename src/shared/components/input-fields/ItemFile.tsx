import { Button, SxProps, Tooltip, styled } from '@mui/material'
import React from 'react'
import FlexBox from '../flexbox/FlexBox'
import FileIcon from '../icons/FileIcon'
import { Span, Tiny } from '../Typography'
import { convertSizeToMb } from 'shared/utils/utils'

const ItemFile = styled(FlexBox)(({ theme }) => ({
  width: '100%',
  justifyContent: 'space-between',
  padding: '6px 6px 6px 10px',
  border: `1px solid #88CDFF`,
  minHeight: '45px',
  alignItems: 'center',
  backgroundColor: '#F1F9FF',
  borderRadius: '4px',
}))

const NameFIle = styled(FlexBox)(({ theme }) => ({
  flexDirection: 'column',

  '& p': {
    fontSize: '13px',
    fontWeight: 600,
    color: theme.palette.grey[600],
  },

  '& span': {
    fontSize: '12px',
    fontWeight: 500,
    color: theme.palette.grey[400],
  },
}))

interface ShowFileProps {
  name: string
  size?: number
  IconEnd?: React.ReactNode
  containerSx?: SxProps
  onClick?: () => void
}

const ShowFile = ({
  name,
  size,
  IconEnd,
  containerSx,
  onClick,
}: ShowFileProps) => {
  return (
    <ItemFile sx={containerSx} onClick={onClick}>
      <FlexBox gap={'10px'} alignItems={'center'}>
        <FlexBox>
          <FileIcon />
        </FlexBox>
        <NameFIle>
          <Tooltip title={name} placement="bottom">
            <Button>
              <Tiny
                sx={{
                  maxWidth: '150px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {name}
              </Tiny>
            </Button>
          </Tooltip>

          <Span>{size && convertSizeToMb(size)}</Span>
        </NameFIle>
        <FlexBox sx={{ cursor: 'pointer' }}>{IconEnd && IconEnd}</FlexBox>
      </FlexBox>
    </ItemFile>
  )
}

export default ShowFile
