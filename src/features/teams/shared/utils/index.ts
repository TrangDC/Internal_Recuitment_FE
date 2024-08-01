import { HiringTeamApprove } from 'shared/schema/database/hiring_team';
import { v4 as uuidv4 } from 'uuid'

export const convertApproves = (
  approves: { id?: string; user_id: string; uid: string }[]
) => {
  return approves.map((item, idx) => {
    return {
      order_id: idx + 1,
      id: item.id ?? '',
      user_id: item.user_id,
    }
  })
}

export const transformApprove = (approves: HiringTeamApprove[]) => {
  return approves.map((item, idx) => {
    return {
      uid: uuidv4(),
      id: item.id,
      user_id: item.user_id,
    }
  })
}
