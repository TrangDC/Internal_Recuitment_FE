import { IMenuSideBar, INavigation } from 'layouts/layout-parts/navigation'
import { useAuthorization } from './useAuthorization'

interface ICheckPermissions {
  navigation: INavigation[]
}

export function usePermissionSidebar(props: ICheckPermissions): INavigation[] {
  const { role } = useAuthorization()
  const { navigation } = props
  if (!role) return []
  const menuItems = navigation.filter((item) => {
    if (item.type === 'label') {
      return true
    }
    const module = (item as IMenuSideBar).module
    if (module && role[module]) {
      if (module === 'SKILLS') {
        const skill =
          role['SKILLS'].VIEW.everything ||
          role['SKILLS'].VIEW.ownedOnly ||
          role['SKILLS'].VIEW.teamOnly
        const skillType =
          role['SKILL_TYPES'].VIEW.everything ||
          role['SKILL_TYPES'].VIEW.ownedOnly ||
          role['SKILL_TYPES'].VIEW.teamOnly
        return skill || skillType
      }
      return (
        role[module].VIEW.everything ||
        role[module].VIEW.ownedOnly ||
        role[module].VIEW.teamOnly
      )
    }

    return true
  })

  return menuItems
}