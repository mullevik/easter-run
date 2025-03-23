import { mount } from '@vue/test-utils'
import assert from 'assert'
import { beforeEach, describe, expect, it, test, vi } from 'vitest'
import CompassDevice from './CompassDevice.vue'

test('points to north on default', () => {
  const wrapper = mount(CompassDevice)

  const compassElement = wrapper.find('#compass')

  console.log(compassElement)

  const transformValue = compassElement.element.getAttribute('transform')
  const rotateMatch = transformValue?.match(/rotate\((\-?\d+) deg\)/)
  assert(rotateMatch)
  expect(rotateMatch[1]).toBe('0')
})

test('set rotation works', () => {
  const wrapper = mount(CompassDevice)
  wrapper.vm.rotation = 30
  expect(wrapper.vm.rotation).toBe(30)
})

class DeviceOrientationEvent extends Event {
  readonly alpha: number
  readonly beta: number
  readonly gamma: number
  readonly absolute: boolean
  readonly webkitCompassHeading: number

  constructor(
    type: string,
    init: {
      alpha: number
      beta: number
      gamma: number
      absolute: boolean
      webkitCompassHeading: number
    },
  ) {
    super(type, { bubbles: true, cancelable: true })
    this.alpha = init.alpha
    this.beta = init.beta
    this.gamma = init.gamma
    this.absolute = init.absolute
    this.webkitCompassHeading = init.webkitCompassHeading
  }
}

test('points to north even with device orientation', () => {
  window.DeviceOrientationEvent = vi.fn()

  const mockDeviceOrientationEvent = vi.fn(() => {
    const event = new DeviceOrientationEvent('deviceorientationabsolute', {
      alpha: 45,
      beta: 0,
      gamma: 0,
      absolute: true,
      webkitCompassHeading: 0,
    })

    return event
  })

  const wrapper = mount(CompassDevice)

  window.dispatchEvent(new mockDeviceOrientationEvent())

  // Check that the component has updated with the new values
  expect(wrapper.vm.rotation).toBe(360 - 45)
})

describe('iOS behavior', () => {
  beforeEach(() => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('iPhone, AppleWebKit')
  })

  it('should mock user agent', () => {
    expect(window.navigator.userAgent).toBe('iPhone, AppleWebKit')
  })

  it('should point to north on deviceorientation', async () => {
    window.DeviceOrientationEvent = vi.fn()
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    ;(window.DeviceOrientationEvent as any).requestPermission = vi.fn().mockResolvedValue('granted')  

    const mockDeviceOrientationEvent = vi.fn(() => {
      const event = new DeviceOrientationEvent('deviceorientation', {
        alpha: 45,
        beta: 0,
        gamma: 0,
        absolute: false,
        webkitCompassHeading: 315,
      })

      return event
    })

    const wrapper = mount(CompassDevice)

    // makes sure that the "granted" promise gets resolved
    await new Promise(process.nextTick)
    // send the dispatch event only after the promise has been resolved
    window.dispatchEvent(new mockDeviceOrientationEvent())

    expect(wrapper.vm.rotation).toBe(360 - 45)
  })

  // todo: test the behavior
})
// test('points to north even with device orientation on IOS', () => {

//   navigator

//   DeviceOrientationEvent
//   // TODO: mock iOS stuff
//   // Check that the component has updated with the new values
//   // expect(wrapper.vm.rotation).toBe(360 - 45)
// })
