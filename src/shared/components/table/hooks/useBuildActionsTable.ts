import { DefineActionTable } from 'features/authorization/domain/interfaces'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

interface IUseBuildActionsTable<K extends string, T> {
  actions: DefineActionTable<K, T>
}

export interface IUseBuildActionsTableReturn<K extends string, T> {
  actions: TOptionItem<T>[]
}

export function useBuildActionsTable<K extends string, T>(
  props: IUseBuildActionsTable<K, T>
): IUseBuildActionsTableReturn<K, T> {
  const { actions } = props
  const newActionTable: TOptionItem<T>[] = Object.keys(actions).map((key) => {
    const typedKey = key as K
    const item = actions[typedKey]
    return {
      ...item,
    }
  })
  return {
    actions: newActionTable,
  }
}
