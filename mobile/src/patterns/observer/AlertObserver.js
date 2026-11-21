import { Observer } from './Observer';

export class AlertObserver extends Observer {
  constructor(onUpdate) {
    super();
    this.onUpdate = onUpdate;
  }

  update(event) {
    this.onUpdate?.(event);
  }
}
