import { SchemaInputNote } from "shared/schema";

export type Hiring = {
  id: string,
  name: string,
  work_email: string,
  team: string,
  created_at: string,
  updated_at: string,
}

export type HiringInput = {
  id: string,
  name: string,
  email: string,
  team: string,
}

export type DeleteHiringInput = SchemaInputNote;