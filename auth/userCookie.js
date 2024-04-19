import cookies from 'js-cookie';

export const getUserFromCookie = () => {
  const cookie = cookies.get('auth');
  if (!cookie) {
    return;
  }
  return JSON.parse(cookie);
};

export const setUserCookie = user => {
  const in30Minutes = 1/48;
  cookies.set('auth', user, {
    expires: in30Minutes
  });
};

export const removeUserCookie = () => cookies.remove('auth');
