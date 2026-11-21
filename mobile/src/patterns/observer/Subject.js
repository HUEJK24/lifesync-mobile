export class Subject {
  constructor() {
    this.observers = new Set();
  }

  attach(observer) {
    this.observers.add(observer);
  }

  detach(observer) {
    this.observers.delete(observer);
  }

  notify(event) {
    this.observers.forEach((observer) => {
      try {
        observer.update(event);
      } catch (e) {}
    });
  }
}
