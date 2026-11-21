export const PermissionStates = {
  IDLE: 'idle',
  REQUESTING: 'requesting',
  GRANTED: 'granted',
  DENIED: 'denied',
  RESTRICTED: 'restricted',
  UNAVAILABLE: 'unavailable',
};

export class PermissionStateMachine {
  constructor() {
    this.state = PermissionStates.IDLE;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  transition(next) {
    this.state = next;
    this.listeners.forEach((listener) => {
      try { listener(this.state); } catch (e) {}
    });
  }

  async request(requestFn) {
    this.transition(PermissionStates.REQUESTING);
    try {
      const result = await requestFn();
      this.transition(result || PermissionStates.UNAVAILABLE);
    } catch (e) {
      this.transition(PermissionStates.UNAVAILABLE);
    }
    return this.state;
  }

  reset() {
    this.transition(PermissionStates.IDLE);
  }

  isGranted() {
    return this.state === PermissionStates.GRANTED;
  }
}
