import { expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CompassDevice from './CompassDevice.vue'
import assert from 'assert'

test('points to north on default', () => {
  const wrapper = mount(CompassDevice)

  const compassElement = wrapper.find('#compass')

  console.log(compassElement)

  const transformValue = compassElement.element.getAttribute('transform')
  const rotateMatch = transformValue?.match(/rotate\((\d+)\)/)
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

  constructor(
    type: string,
    init: { alpha: number; beta: number; gamma: number; absolute: boolean },
  ) {
    super(type, { bubbles: true, cancelable: true })
    this.alpha = init.alpha
    this.beta = init.beta
    this.gamma = init.gamma
    this.absolute = init.absolute
  }
}

test('points to north even with device orientation', () => {
  window.DeviceOrientationEvent = vi.fn()

  const mockDeviceOrientationEvent = vi.fn(() => {
    const event = new DeviceOrientationEvent('deviceorientation', {
      alpha: 45,
      beta: 0,
      gamma: 0,
      absolute: true,
    })

    return event
  })

  const wrapper = mount(CompassDevice)

  window.dispatchEvent(new mockDeviceOrientationEvent())

  // Check that the component has updated with the new values
  expect(wrapper.vm.rotation).toBe(360 + 45)
})
