import React, { createContext, useContext, useEffect, useState } from 'react';
import { medicalAlertSubject } from '../../patterns/observer/MedicalAlertSubject';
import { AlertObserver } from '../../patterns/observer/AlertObserver';

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const observer = new AlertObserver((event) => {
      if (event?.type === 'MEDICAL_ALERT' && event.alert) {
        setAlerts((prev) => [event.alert, ...prev].slice(0, 50));
      }
    });
    medicalAlertSubject.attach(observer);
    return () => medicalAlertSubject.detach(observer);
  }, []);

  const triggerAlert = (alert) => medicalAlertSubject.trigger(alert);
  const clearAlerts = () => setAlerts([]);

  return (
    <AlertContext.Provider value={{ alerts, triggerAlert, clearAlerts }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlerts debe usarse dentro de AlertProvider');
  return ctx;
}
