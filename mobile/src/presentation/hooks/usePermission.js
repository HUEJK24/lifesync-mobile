import { useEffect, useMemo, useState } from 'react';
import { PermissionStateMachine, PermissionStates } from '../../patterns/stateMachine/PermissionStateMachine';
import { requestCameraPermission, requestLocationPermission } from '../../core/permissions/permissionService';

export function usePermission(type) {
  const machine = useMemo(() => new PermissionStateMachine(), []);
  const [state, setState] = useState(machine.state);

  useEffect(() => machine.subscribe(setState), [machine]);

  const request = async () => {
    const fn = type === 'camera' ? requestCameraPermission : requestLocationPermission;
    return machine.request(fn);
  };

  return {
    state,
    request,
    granted: state === PermissionStates.GRANTED,
    requesting: state === PermissionStates.REQUESTING,
  };
}
