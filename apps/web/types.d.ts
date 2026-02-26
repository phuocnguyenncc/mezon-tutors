import { config } from '@mezon-tutors/app'

export type Conf = typeof config

declare module '@mezon-tutors/app/ui' {
  interface TamaguiCustomConfig extends Conf {}
}
