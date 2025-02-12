import { expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CompassDevice from './CompassDevice.vue'

test('points to north on default', () => {
  const wrapper = mount(CompassDevice)

  const compassElement = wrapper.find('#compass')

  console.log(compassElement)

  const transformValue = compassElement.element.getAttribute('transform')
  const rotateMatch = transformValue?.match(/rotate\((\d+)\)/)

  expect(rotateMatch[1]).toBe('0')
})

test('set rotation works', () => {
  const wrapper = mount(CompassDevice)
  wrapper.vm.setRotation(30)
  expect(wrapper.vm.rotation).toBe(30)
})

test('points to north even with device orientation', () => {
  window.DeviceOrientationEvent = vi.fn()

  const mockDeviceOrientationEvent = vi.fn(() => {
    const event = new Event('deviceorientation')
    event.alpha = 45
    event.beta = 0
    event.gamma = 0
    return event
  })

  const wrapper = mount(CompassDevice)

  window.dispatchEvent(new mockDeviceOrientationEvent())

  // Check that the component has updated with the new values
  expect(wrapper.vm.rotation).toBe(315)
})
