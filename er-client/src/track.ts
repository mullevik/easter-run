import { headingDistanceTo, moveTo, type LatLon } from 'geolocation-utils'

const MAX_DST_METERS = 100

type Seconds = number
type Milliseconds = number
type Meters = number

export interface TrackPoint {
  position: LatLon
  timeToReachNext: Seconds
}

export class Track {
  private pts: TrackPoint[]
  private beginAt: Date

  constructor(pts: TrackPoint[], beginAt: Date) {
    if (pts.length < 1) {
      throw Error('Track must have at least 1 TrackPoint')
    }
    this.pts = pts
    this.beginAt = beginAt
  }

  public getBeginDate(): Date {
    return this.beginAt
  }

  public duration(): Seconds {
    return this.pts.reduce((prev, curr) => prev + curr.timeToReachNext, 0)
  }

  public targetAt(date: Date): LatLon {
    const timeDiff: Milliseconds = Math.abs(this.beginAt.getTime() - date.getTime())

    const remainder: Milliseconds = timeDiff % Math.round(this.duration() * 1000)

    let currentIdx = 0
    let accTime = 0
    while (true) {
      const prev = this.pts[currentIdx % this.pts.length]
      const next = this.pts[(currentIdx + 1) % this.pts.length]
      const timeFromPrevToNext: Milliseconds = prev.timeToReachNext * 1000
      accTime += timeFromPrevToNext
      if (accTime > remainder) {
        const timeWithinPrevAndNext = remainder - (accTime - timeFromPrevToNext)

        const ratioFromPrevToNext = timeWithinPrevAndNext / timeFromPrevToNext
        return interpolate(prev.position, next.position, ratioFromPrevToNext)
      }
      currentIdx += 1
    }
  }
}

export function signalStrength(distance: Meters): number {
  if (distance > MAX_DST_METERS) {
    return 0
  }
  return Math.round(MAX_DST_METERS - distance)
}

export function interpolate(a: LatLon, b: LatLon, percentFromAToB: number) {
  const dstHeading = headingDistanceTo(a, b)
  return moveTo(a, { distance: dstHeading.distance * percentFromAToB, heading: dstHeading.heading })
}
