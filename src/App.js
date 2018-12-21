import React from 'react';

import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './posts';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './Dashboard';
import authProvider from './authProvider';

import { UserList } from './users';

import jsonServerProvider from 'ra-data-json-server';

<<<<<<< HEAD

import simpleRestProvider from 'ra-data-simple-rest';
import addUploadFeature from './addUploadFeature';

import bitcoinSaga from './bitcoinSaga';


import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
  },
});




const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
      const token = localStorage.getItem('token');
      options.headers.set('Authorization', `Bearer ${token}`);

    // if (!options.user) {
    //           options.user = {
    //          authenticated: true,
    //          token: 'SRTRDFVESGNJYTUKTYTHRG'
    //      }
    // }
    // add your own headers here
    //options.headers.set('X-Custom-Header', 'foobar');
    return fetchUtils.fetchJson(url, options);
}



let link = 'http://localhost:3001'

const dataProvider = jsonServerProvider(link, httpClient);
const uploadCapableDataProvider = addUploadFeature(dataProvider);
=======
// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
import dataProvider from './dataProvider';
>>>>>>> parent of 96ef567... v1.1.1



const App = () => (
<<<<<<< HEAD
    <Admin dataProvider={uploadCapableDataProvider} dashboard={Dashboard} customSagas={[ bitcoinSaga ]} theme={theme} authProvider={authProvider}>
=======
    <Admin dataProvider={dataProvider} dashboard={Dashboard} authProvider={authProvider}>
>>>>>>> parent of 96ef567... v1.1.1
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
        <Resource name="users" list={UserList} icon={UserIcon} />
    </Admin>
);


export default App;
