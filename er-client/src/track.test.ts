import { expect, test } from 'vitest'
import { interpolate, signalStrength, Track } from './track'
import { moveTo } from 'geolocation-utils'

const POINT_A = { lat: 50.061495, lon: 14.425202 } // Prague: near Vysehrad
const POINT_B = { lat: 50.058621, lon: 14.431561 } // Prague: near Prazskeho Povstani

const SMALL_TRACK = new Track(
  [
    { position: POINT_A, timeToReachNext: 60 },
    { position: POINT_B, timeToReachNext: 60 },
  ],
  new Date(1739612690546),
)

test('signal strength decreases with time when stationary', () => {
  const beginDate = SMALL_TRACK.getBeginDate()

  const after5Seconds = new Date(beginDate.getTime() + 5 * 1000)
  const after10Seconds = new Date(beginDate.getTime() + 10 * 1000)
  const after15Seconds = new Date(beginDate.getTime() + 15 * 1000)
  expect(signalStrength(POINT_A, SMALL_TRACK.targetAt(beginDate))).toBe(100)
  expect(signalStrength(POINT_A, SMALL_TRACK.targetAt(after5Seconds))).toBe(54)
  expect(signalStrength(POINT_A, SMALL_TRACK.targetAt(after10Seconds))).toBe(7)
  expect(signalStrength(POINT_A, SMALL_TRACK.targetAt(after15Seconds))).toBe(0)
})

test('signal strength', () => {
  const closeToPointA = moveTo(POINT_A, { distance: 50, heading: 45 })

  expect(signalStrength(POINT_A, POINT_A)).toBe(100)
  expect(signalStrength(POINT_A, POINT_B)).toBe(0)
  expect(signalStrength(POINT_A, closeToPointA)).toBeCloseTo(50)
})

test('track duration is a sum of all timeToReach values', () => {
  expect(SMALL_TRACK.duration()).toBe(120)
})

test('interpolate between two points', () => {
  const closeToPointA = interpolate(POINT_A, POINT_B, 0)
  const closeToPointB = interpolate(POINT_A, POINT_B, 1)
  expect(closeToPointA.lat).toBeCloseTo(POINT_A.lat, 4)
  expect(closeToPointA.lon).toBeCloseTo(POINT_A.lon, 4)
  expect(closeToPointB.lat).toBeCloseTo(POINT_B.lat, 4)
  expect(closeToPointB.lon).toBeCloseTo(POINT_B.lon, 4)

  const inTheMiddle = interpolate(POINT_A, POINT_B, 0.5)
  expect(inTheMiddle.lat).toBeCloseTo(POINT_B.lat + (POINT_A.lat - POINT_B.lat) / 2, 3)
  expect(inTheMiddle.lon).toBeCloseTo(POINT_A.lon + (POINT_B.lon - POINT_A.lon) / 2, 3)
})

test('target at track moves in time', () => {
  const beginning = SMALL_TRACK.targetAt(SMALL_TRACK.getBeginDate())

  expect(beginning.lat).toBeCloseTo(POINT_A.lat, 4)
  expect(beginning.lon).toBeCloseTo(POINT_A.lon, 4)

  const quartTime = new Date(SMALL_TRACK.getBeginDate().getTime() + 30 * 1000)
  const quart = SMALL_TRACK.targetAt(quartTime)
  const inTheMiddle = interpolate(POINT_A, POINT_B, 0.5)

  expect(quart.lat).toBeCloseTo(inTheMiddle.lat, 4)
  expect(quart.lon).toBeCloseTo(inTheMiddle.lon, 4)

  const halfTime = new Date(SMALL_TRACK.getBeginDate().getTime() + 60 * 1000)
  const half = SMALL_TRACK.targetAt(halfTime)
  expect(half.lat).toBeCloseTo(POINT_B.lat, 4)
  expect(half.lon).toBeCloseTo(POINT_B.lon, 4)

  const endTime = new Date(SMALL_TRACK.getBeginDate().getTime() + 120 * 1000)
  const end = SMALL_TRACK.targetAt(endTime)
  expect(end.lat).toBeCloseTo(POINT_A.lat, 4)
  expect(end.lon).toBeCloseTo(POINT_A.lon, 4)
})
