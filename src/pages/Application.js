import React from 'react';

import { StateProvider } from '../providers/store/store';

import ContentHeader from '../components/ContentHeader';
import { List } from '../components/List';

const Application = () => {
    return (
        <StateProvider>
            <ContentHeader />
            <List />
        </StateProvider>
    );
};

export default Application;
