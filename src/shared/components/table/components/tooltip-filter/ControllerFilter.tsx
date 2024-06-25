import { ClickAwayListener, Popper } from '@mui/material'
import { useMemo, useState } from 'react'
import ButtonTooltip from './ButtonTooltip'
import FilterContainer from './FilterContainer'
import { isArray } from 'lodash'
import FilterChip from './FilterChip'
import { v4 as uuidv4 } from 'uuid'
import { IOption } from 'shared/components/autocomplete/autocomplete-base/interface'
import {
  ConditionValue,
  FilterCommonProp,
  TooltipFilterProps,
} from '../../interface'

function ControllerFilter<T, Key extends keyof T>({
  title,
  Node,
  keyName,
  control,
}: TooltipFilterProps<T, Key>) {
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

  const hasDataFilter = filter ? Object.keys(filter).length > 0 : false

  const lisOtion = useMemo((): IOption[] => {
    const filterValue = filter?.[keyName]
    if (!filterValue) return []
    if (isArray(filterValue)) return filterValue
    return [filterValue]
  }, [filter, keyName])

  const value = useMemo((): string | string[] => {
    const filterValue = filter?.[keyName]
    if (!filterValue) return ''
    if (isArray(filterValue)) return filterValue.map((o) => o.value)
    return filterValue.value
  }, [filter, keyName])

  const nodeParams: FilterCommonProp<T[Key]> = {
    value,
    onFilter,
  }

  function onFilter(value: ConditionValue<T[Key]> | null) {
    control.onFilter({ keyName: keyName, value })
  }

  function onDelete(value: string) {
    control.onDelete({ value: value, keyName: keyName })
  }
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div style={{ width: 'auto' }}>
        <ButtonTooltip handleClick={handleClick} title={title} />
        {hasDataFilter &&
          lisOtion.map((item) => {
            return (
              <FilterChip
                key={uuidv4()}
                label={item.label}
                handleDelete={() => onDelete(item.value)}
              />
            )
          })}
        <Popper
          id={id}
          placement="bottom"
          disablePortal={false}
          open={open}
          anchorEl={anchorEl}
          sx={{
            zIndex: 1201,
            width: 300,
          }}
        >
          <FilterContainer>{Node(nodeParams)}</FilterContainer>
        </Popper>
      </div>
    </ClickAwayListener>
  )
}

export default ControllerFilter
