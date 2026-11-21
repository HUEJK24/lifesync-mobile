import { Subject } from './Subject';

class MedicalAlertSubject extends Subject {
  trigger(alert) {
    this.notify({ type: 'MEDICAL_ALERT', alert, at: new Date().toISOString() });
  }
}

export const medicalAlertSubject = new MedicalAlertSubject();
