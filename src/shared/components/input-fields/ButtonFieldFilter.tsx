import {
  Button,
  ButtonProps,
  Typography,
  Popper,
  ClickAwayListener,
  styled,
  Box,
} from '@mui/material'
import React, { useMemo } from 'react'
import DownIcon from '../icons/DownIcon'
import { get, isEmpty, isEqual } from 'lodash'
import ChipField from './ChipField'
import { SpanText } from '../form/styles'
import { BaseRecord } from 'shared/interfaces'

const ButtonFilterStyled = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'end',
  boxShadow: 'none',
  fontSize: '12px',
  height: '20px',
  WebkitBoxPack: 'start',
  justifyContent: 'flex-start',
  padding: '0px 5px',
  border: 'none',

  '& span': {
    color: theme.palette.primary[800],
    fontWeight: 500,
    fontSize: 13,
    lineHeight: '15.85px',
  },

  '&:hover': {
    border: 'none',
    backgroundColor: 'white',
  },
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  width: '285px',
  maxWidth: '500px',
  backgroundColor: theme.palette.primary.light,
  boxShadow:
    'rgba(40, 41, 61, 0.04) 0px 2px 4px 0px, rgba(96, 97, 112, 0.16) 0px 8px 16px 0px',

  '& .MuiInputBase-root': {
    backgroundColor: 'white',
  },
}))

const PopperStyled = styled(Popper)(({ theme }) => ({
  zIndex: 1300,
}))

const ListStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap'
}))

type ButtonFilterProps<T> = {
  inputLabel: string
  listSelected: BaseRecord | BaseRecord[]
  setListSelected: (value: BaseRecord[]) => void
  showLabel?: string
  node: React.ReactNode
  onChange?: (data: BaseRecord[]) => void;
}

const ButtonFieldFilter = <T extends object>({
  inputLabel,
  showLabel = 'label',
  listSelected,
  setListSelected,
  node,
  onChange,
  ...props
}: ButtonFilterProps<T> & ButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const selected = useMemo(() => {
    return Array.isArray(listSelected) ? listSelected : listSelected ? [listSelected] : []
  }, [listSelected])
  return (
    <ClickAwayListener
      onClickAway={() => {
        setAnchorEl(null)
      }}
    >
      <Box sx={{ width: 'auto' }}>
        <ButtonFilterStyled
          {...props}
          onClick={handleClick}
          endIcon={<DownIcon />}
        >
          <SpanText>{inputLabel}</SpanText>
        </ButtonFilterStyled>
        <PopperStyled open={Boolean(anchorEl)} anchorEl={anchorEl}>
          <TypographyStyled sx={{ p: 1, pr: 2, pl: 2 }}>
            {node}
          </TypographyStyled>
        </PopperStyled>

        <ListStyled>
          {!isEmpty(selected) &&
            selected.map((chip: BaseRecord, index: number) => {
              return (
                <ChipField
                  label={get(chip, showLabel)}
                  key={index}
                  onDelete={() => {
                    const filterOption = selected.filter(
                      (option: BaseRecord) => {
                        return !isEqual(option, chip)
                      }
                    )
                    onChange?.(filterOption)
                    setListSelected(filterOption as T[])
                  }}
                />
              )
            })}
        </ListStyled>
      </Box>
    </ClickAwayListener>
  )
}

export default ButtonFieldFilter
