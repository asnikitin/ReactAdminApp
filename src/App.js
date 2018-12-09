import React from 'react';

import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './posts';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './Dashboard';
import authProvider from './authProvider';

import { UserList } from './users';

import jsonServerProvider from 'ra-data-json-server';

// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
import dataProvider from './dataProvider';



const App = () => (
    <Admin dataProvider={dataProvider} dashboard={Dashboard} authProvider={authProvider}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
        <Resource name="users" list={UserList} icon={UserIcon} />
    </Admin>
);


export default App;
