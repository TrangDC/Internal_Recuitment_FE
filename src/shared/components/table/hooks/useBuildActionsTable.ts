import { DefineActionTable } from 'features/authorization/domain/interfaces'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

interface IUseBuildActionsTable<Actions extends string, T> {
  actions: DefineActionTable<Actions, T>
}

export interface IUseBuildActionsTableReturn<T> {
  actions: TOptionItem<T>[]
}

export function useBuildActionsTable<Actions extends string, T>(
  props: IUseBuildActionsTable<Actions, T>
): IUseBuildActionsTableReturn<T> {
  const { actions } = props
  const newActionTable: TOptionItem<T>[] = Object.keys(actions).map((key) => {
    const typedKey = key as Actions
    const item = actions[typedKey]
    return {
      ...item,
    }
  })
  return {
    actions: newActionTable,
  }
}
