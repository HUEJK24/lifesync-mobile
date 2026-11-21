function mapStatus(status) {
  if (status === 'granted') return 'granted';
  if (status === 'denied') return 'denied';
  if (status === 'restricted') return 'restricted';
  return 'unavailable';
}

export async function requestCameraPermission() {
  try {
    const mod = await import('expo-camera');
    const Camera = mod.Camera || mod.default?.Camera || mod.default;
    const result = await Camera.requestCameraPermissionsAsync();
    return mapStatus(result?.status);
  } catch (e) {
    return 'unavailable';
  }
}

export async function requestLocationPermission() {
  try {
    const mod = await import('expo-location');
    const Location = mod.Location || mod.default?.Location || mod.default;
    const result = await Location.requestForegroundPermissionsAsync();
    return mapStatus(result?.status);
  } catch (e) {
    return 'unavailable';
  }
}
