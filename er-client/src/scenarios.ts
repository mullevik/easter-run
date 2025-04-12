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

export const THE_TRACK = new Track(
  [
    { position: { lat: 50.0504406, lon: 14.4203278 }, timeToReachNext: 75 }, //  <time>2025-04-12T08:54:15Z</time>
    { position: { lat: 50.0484211, lon: 14.4219814 }, timeToReachNext: 120 }, //  <time>2025-04-12T08:55:29Z</time>
    { position: { lat: 50.0492953, lon: 14.4285889 }, timeToReachNext: 68 }, //        2025-04-12T08:57:25Z<
    { position: { lat: 50.0472233, lon: 14.4284253 }, timeToReachNext: 63 }, //        <time>2025-04-12T08:58:37Z</time>
    { position: { lat: 50.0481808, lon: 14.4252764 }, timeToReachNext: 64 }, // 2025-04-12T08:59:40Z<
    { position: { lat: 50.0465275, lon: 14.4227336 }, timeToReachNext: 100 }, // 2025-04-12T09:00:44Z
    { position: { lat: 50.0468786, lon: 14.4183456 }, timeToReachNext: 95 }, // 2025-04-12T09:02:26Z
    { position: { lat: 50.0495106, lon: 14.4177769 }, timeToReachNext: 51 }, // 2025-04-12T09:04:01Z<
    // 2025-04-12T09:04:52Z
  ],
  new Date(1739612690546),
)
