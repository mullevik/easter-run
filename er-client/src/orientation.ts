function isWebkit(userAgent: string): boolean {
  return userAgent.match(/(iPod|iPhone|iPad)/) !== null && userAgent.match(/AppleWebKit/) != null
}

export function setupOrientation(handleOrientation: (event: DeviceOrientationEvent) => void) {
  if (isWebkit(window.navigator.userAgent)) {
    // cast to any because DeviceOrientationEvent has .requestPermission only on iOS
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    if (
      window.DeviceOrientationEvent &&
      typeof (window.DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      ;(window.DeviceOrientationEvent as any)
        .requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            console.error('permission granted')
            window.addEventListener('deviceorientation', handleOrientation, true)
          } else {
            console.error('IOS device orientation was not granted')
          }
        })
        .catch(() => console.error('IOS device orientation unavailable'))
    } else {
      console.error('IOS device orientation unavailable')
    }
  } else {
    if (!window.DeviceOrientationEvent) {
      console.error('Device orientation not supported')
    } else {
      window.addEventListener('deviceorientationabsolute', handleOrientation)
      console.debug('Orientation handling mounted')
    }
  }
}

export function cleanOrientation(handleOrientation: (event: DeviceOrientationEvent) => void) {
  if (isWebkit(window.navigator.userAgent)) {
    window.removeEventListener('deviceorientation', handleOrientation)
  } else {
    window.removeEventListener('deviceorientationabsolute', handleOrientation)
  }
}
