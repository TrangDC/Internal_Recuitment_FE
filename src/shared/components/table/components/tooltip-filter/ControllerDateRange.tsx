import { ClickAwayListener, Popper } from '@mui/material'
import { useMemo, useState } from 'react'
import ButtonTooltip from './ButtonTooltip'
import FilterContainer from './FilterContainer'
import { isArray } from 'lodash'
import FilterChip from './FilterChip'
import {
  ConditionValue,
  FilterDateRangeCommonProp,
  TooltipDateRangeFilterProps,
} from '../../interface'
import { IOption } from 'shared/components/autocomplete/autocomplete-base/interface'

function ControllerDateRange<T, From extends keyof T, To extends keyof T>({
  title,
  Node,
  keyNameFrom,
  keyNameTo,
  control,
}: TooltipDateRangeFilterProps<T, From, To>) {
  const { filter } = control
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => !prev)
  }
  const canBeOpen = open && Boolean(anchorEl)
  const id = canBeOpen ? 'transition-popper' : undefined
  function onClickAway() {
    setOpen(false)
  }

  const from = useMemo((): IOption | null => {
    const filterValue = filter?.[keyNameFrom]
    if (!filterValue || isArray(filterValue)) return null
    return filterValue
  }, [filter, keyNameFrom])

  const to = useMemo((): IOption | null => {
    const filterValue = filter?.[keyNameTo]
    if (!filterValue || isArray(filterValue)) return null
    return filterValue
  }, [filter, keyNameTo])

  const nodeParams: FilterDateRangeCommonProp<T[From], T[To]> = {
    fromValue: from?.value ?? '',
    toValue: to?.value ?? '',
    onFilterFrom,
    onFilterTo,
  }

  function onFilterFrom(from: ConditionValue<T[From]> | null) {
    control.onFilter({ keyName: keyNameFrom, value: from })
  }

  function onFilterTo(to: ConditionValue<T[To]> | null) {
    control.onFilter({ keyName: keyNameTo, value: to })
  }

  function onDelete(value: string, keyName: keyof T) {
    control.onDelete({ value: value, keyName: keyName })
  }

  const fromLabel = `From ${from?.label}`
  const fromTo = `To ${to?.label}`

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div style={{ width: 'auto' }}>
        <ButtonTooltip handleClick={handleClick} title={title} />
        {from && (
          <FilterChip
            label={fromLabel}
            handleDelete={() => onDelete(from.value, keyNameFrom)}
          />
        )}
        {to && (
          <FilterChip
            label={fromTo}
            handleDelete={() => onDelete(to.value, keyNameTo)}
          />
        )}
        <Popper
          id={id}
          placement="bottom"
          disablePortal={false}
          open={open}
          anchorEl={anchorEl}
          sx={{
            zIndex: 1201,
            width: 400,
          }}
        >
          <FilterContainer maxWidth="100%">{Node(nodeParams)}</FilterContainer>
        </Popper>
      </div>
    </ClickAwayListener>
  )
}

export default ControllerDateRange
