import { Track } from './track'

export const POINT_A = { lat: 50.061495, lon: 14.425202 } // Prague: near Vysehrad
export const POINT_B = { lat: 50.058621, lon: 14.431561 } // Prague: near Prazskeho Povstani

export const SMALL_TRACK = new Track(
  [
    { position: POINT_A, timeToReachNext: 60 },
    { position: POINT_B, timeToReachNext: 60 },
  ],
  new Date(1739612690546),
)
