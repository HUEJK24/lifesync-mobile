import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'lifesync_jwt';

// En dispositivo se usa el contenedor seguro (Keystore/Keychain).
// En navegador (demo web sin Expo Go) SecureStore no existe: se usa localStorage
// solo para poder demostrar el flujo. No usar este fallback en producción.
async function isSecureStoreAvailable() {
  return SecureStore.isAvailableAsync();
}

export async function saveToken(token) {
  if (await isSecureStoreAvailable()) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } else if (typeof localStorage !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export async function getToken() {
  if (await isSecureStoreAvailable()) {
    return SecureStore.getItemAsync(TOKEN_KEY);
  }
  return typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
}

export async function removeToken() {
  if (await isSecureStoreAvailable()) {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } else if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
}
