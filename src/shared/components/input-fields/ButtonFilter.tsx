import {
  Button,
  ButtonProps,
  Typography,
  Popper,
  ClickAwayListener,
  styled,
} from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'
import DownIcon from '../icons/DownIcon'
import { findKey, get, isEmpty, isEqual } from 'lodash'
import ChipField from './ChipField'
import AutoCompleteField from './AutoCompleteField'
import { SpanText } from '../form/styles'

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
}))

const PopperStyled = styled(Popper)(({ theme }) => ({
  zIndex: 1300,
}))

const ListStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '10px',
}))

type ButtonFilterProps<T> = {
  listData: T[]
  inputLabel: string
  showLabel?: string
  multiple?: boolean
  keySelect?: string
  size?: 'small' | 'medium'
  limitTags?: number
  callbackChange?: (value: any) => void;
}

const ButtonFilter = <T extends object>({
  inputLabel,
  listData,
  showLabel = 'name',
  multiple = true,
  keySelect = 'id',
  size = 'small',
  limitTags = 2,
  callbackChange,
  ...props
}: ButtonFilterProps<T> & ButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [valueMultiple, setValueMultiple] = useState<T[]>([])
  const [valueNonMultiple, setValueNonMultiple] = useState<T>()

  const selected = useMemo<T | T[] | undefined>(() => {
    return multiple ? valueMultiple : valueNonMultiple
  }, [multiple, valueMultiple, valueNonMultiple])

  const listSelected = useMemo<(T | undefined)[]>(() => {
    return multiple ? valueMultiple : !isEmpty(valueNonMultiple) ? [valueNonMultiple] : []
  }, [multiple, valueMultiple, valueNonMultiple])

  const setSelected = useCallback((value: T | T[]) => {
    return multiple ? setValueMultiple(value as T[]) : setValueNonMultiple(!isEmpty(value) ? value as T : undefined)
  }, [multiple])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const getKeyLabel = (object: any, key: string): string => {
    const lowerKey = key.toString().toLowerCase()

    //check if the key is exists in the object
    const isExistKey = findKey(object, (value, keyObj) => {
      return keyObj.toString().toLowerCase() === lowerKey
    })
    if (isExistKey) return isExistKey

    //check if the key is includes in the object
    const isIncludeKey = findKey(object, (value, keyObj) => {
      return keyObj.toString().toLowerCase().includes(lowerKey)
    })
    if (isIncludeKey) return isIncludeKey

    return Object.keys(object)[0]
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        setAnchorEl(null)
      }}
    >
      <div>
        <ButtonFilterStyled
          {...props}
          variant="outlined"
          size="small"
          onClick={handleClick}
          endIcon={<DownIcon />}
        >
          <SpanText>{inputLabel}</SpanText>
        </ButtonFilterStyled>
        <PopperStyled open={Boolean(anchorEl)} anchorEl={anchorEl}>
          <TypographyStyled sx={{ p: 1, pr: 2, pl: 2 }}>
            <AutoCompleteField<T>
              open
              options={listData}
              value={selected}
              onChange={(event, value, reason) => {
                setSelected(value as T[])
                callbackChange && callbackChange(value)
              }}
              multiple={multiple}
              inputProps={{
                label: inputLabel,
                autoFocus: true,
              }}
            />
          </TypographyStyled>
        </PopperStyled>

        <ListStyled>
          {!isEmpty(listSelected) &&
            listSelected.map((chip, index: number) => {
              return (
                <ChipField
                  label={get(chip, getKeyLabel(chip, showLabel))}
                  key={index}
                  onDelete={(e: Event) => {
                    const filterOption = listSelected.filter((option) => {
                      return !isEqual(option, chip)
                    })
                    callbackChange && callbackChange(filterOption)
                    setSelected(filterOption as T[])
                  }}
                />
              )
            })}
        </ListStyled>
      </div>
    </ClickAwayListener>
  )
}

export default ButtonFilter
