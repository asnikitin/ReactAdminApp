import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, email, password } = params;

        const request = new Request('http://localhost:3001/validation', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        if (!email) {
          return fetch(request)
              .then(response => {
                  if (response.status < 200 || response.status >= 300) {
                      throw new Error(response.statusText);
                  }
                  return response.json();
              })
              .then(({ token }) => {
                  localStorage.setItem('token', token);
              });
        } else  {
          const request = new Request('http://localhost:3001/registration', {
              method: 'POST',
              body: JSON.stringify({ username, email, password }),
              headers: new Headers({ 'Content-Type': 'application/json' }),
          })
          return fetch(request)
              .then(response => {
                  if (response.status < 200 || response.status >= 300) {
                      throw new Error(response.statusText);
                  }
                  return response.json();
              })
              .then(({ token }) => {
                  localStorage.setItem('token', token);
              });


        }
    }

    if (type === AUTH_LOGOUT) {
     localStorage.removeItem('token');
     return Promise.resolve();
 }

 // called when the API returns an error
 if (type === AUTH_ERROR) {
   const status  = params.status;
   if (status === 401 || status === 403) {
       localStorage.removeItem('token');
       return Promise.reject();
   }
   return Promise.resolve();
 }
 // called when the user navigates to a new location
 if (type === AUTH_CHECK) {
   return localStorage.getItem('token') ? Promise.resolve() : Promise.reject({ redirectTo: '/login' });
 }


    return Promise.resolve();
}
