import { Collapse } from '@mui/material'
import { useState } from 'react'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text13sb, Tiny12md } from 'shared/components/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ShowFile from 'shared/components/input-fields/ItemFile'
import DownloadIcon from 'shared/components/icons/DownloadIcon'

function Call() {
  const [open, setOpen] = useState(true)
  return (
    <FlexBox
      flexDirection={'column'}
      padding={2}
      width={'100%'}
      border={'1px solid #E3E6EB'}
      borderRadius={'4px'}
      marginTop={'16px'}
    >
      <FlexBox
        height={'24px'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginBottom={1}
        width={'100%'}
      >
        <FlexBox alignItems={'center'} onClick={() => setOpen((prev) => !prev)}>
          {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          <FlexBox gap={1} alignItems={'center'}>
            <Text13sb marginLeft={1}>
              Call title Lorem ipsum dolor sit amet ad suspendisse blandit
              aliquam ut nulla torquent pulvinar cursu
            </Text13sb>
            <Tiny12md>Created by</Tiny12md>
            <Tiny12md color={'primary.600'}>
              Arianne Bui (TECHVIFY.ITS)
            </Tiny12md>
          </FlexBox>
        </FlexBox>
        <Tiny12md>20/07/2024, 14:30</Tiny12md>
      </FlexBox>
      <FlexBox gap={3} marginLeft={4}>
        <FlexBox flexDirection={'column'}>
          <Tiny12md>Contact time</Tiny12md>
          <Text13sb>20/03/2024, 14:30 - 16:30</Text13sb>
        </FlexBox>
        <FlexBox flexDirection={'column'}>
          <Tiny12md>Contact to</Tiny12md>
          <Text13sb>Candidate</Text13sb>
        </FlexBox>
      </FlexBox>
      <Collapse in={open} unmountOnExit>
        <FlexBox marginLeft={4} marginTop={1} flexDirection={'column'} gap={1}>
          <FlexBox flexDirection={'column'}>
            <Tiny12md>Description</Tiny12md>
            <Text13sb>
              Lorem ipsum dolor sit amet ad suspendisse blandit aliquam ut nulla
              torquent pulvinar cursus pellentesque lectus posuere est per eget
              inceptos adipiscing nibh odio felis ultricies... See more
            </Text13sb>
          </FlexBox>
          <FlexBox flexWrap={'wrap'} gap={'10px'}>
            <ShowFile
              name={'Document.doc'}
              IconEnd={<DownloadIcon />}
              containerSx={{
                width: 'auto',
              }}
            />
            <ShowFile
              name={'Document.doc'}
              IconEnd={<DownloadIcon />}
              containerSx={{
                width: 'auto',
              }}
            />
            <ShowFile
              name={'Document.doc'}
              IconEnd={<DownloadIcon />}
              containerSx={{
                width: 'auto',
              }}
            />
          </FlexBox>
        </FlexBox>
      </Collapse>
    </FlexBox>
  )
}

export default Call
