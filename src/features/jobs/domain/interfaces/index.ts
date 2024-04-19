export type Job = {
    id: string,
    name: string,
    requester: string,
    location: string,
    hired: number,
    team: string,
    createdAt: string,
    numbers: number,
  }

export type TEAM = {
  id: number,
  name: string,
}

export type LOCATION = {
  id: number,
  name: string,
}

export type CURRENCY = {
  id: number,
  name: string,
}