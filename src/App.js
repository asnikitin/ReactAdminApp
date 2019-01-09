import React from 'react';

import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './posts';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import AnalyticsIcon from '@material-ui/icons/PieChart';
import CommentsIcon from '@material-ui/icons/Comment';
import HistoryIcon from '@material-ui/icons/History';
import ProductIcon from '@material-ui/icons/ShoppingBasket';
import TasksIcon from '@material-ui/icons/ViewList';
import PageIcon from '@material-ui/icons/Note';
import PieIcon from '@material-ui/icons/Power';
import PhotoIcon from '@material-ui/icons/ViewCarousel';
import Dashboard from './Dashboard';


import authProvider from './authProvider';

import { fetchUtils } from 'react-admin';

import { UserList } from './users';

import jsonServerProvider from 'ra-data-json-server';


import simpleRestProvider from 'ra-data-simple-rest';
import addUploadFeature from './addUploadFeature';
import Login from './Login';


import customRoutes from './customRoutes';




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



const App = () => (
    <Admin customRoutes={customRoutes} dataProvider={uploadCapableDataProvider} dashboard={Dashboard} authProvider={authProvider} loginPage={Login}>
        <Resource name="media" list={PostList} edit={PostEdit} create={PostCreate} icon={PhotoIcon} />
        <Resource name="pages" list={PostList} edit={PostEdit} create={PostCreate} icon={PageIcon} />
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
        <Resource name="users" list={UserList} icon={UserIcon} />
        <Resource name="comments" list={UserList} icon={CommentsIcon} />
        <Resource name="products" list={UserList} icon={ProductIcon} />
        <Resource name="tasks" list={UserList} icon={TasksIcon} />
        <Resource name="analytics" list={UserList} icon={AnalyticsIcon} />
        <Resource name="settings" list={UserList} icon={SettingsIcon} />
    </Admin>
);

export default App;
