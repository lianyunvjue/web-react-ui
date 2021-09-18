import { USER_LOCAL_FIELD } from '@/constants/global';
import Storage from './localStorage';

export function setUser(userInfo: any) {
  if (typeof userInfo === 'undefined') return;
  Storage.setItem(USER_LOCAL_FIELD, JSON.stringify(userInfo));
}

export function getUser(): object | null {
  try {
    // @todo 内容加密，防止篡改
    const user = JSON.parse(Storage.getItem(USER_LOCAL_FIELD));
    return user;
  } catch {
    return null;
  }
}

export function getRoles() {
  const { roles } = (getUser() || {}) as any;
  return roles;
}

export function getToken() {
  const { token } = (getUser() || {}) as any;
  return token;
}

export function getPermissions() {
  const { permissions } = (getUser() || {}) as any;
  return permissions;
}
