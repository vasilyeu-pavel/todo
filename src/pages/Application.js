import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import ContentHeader from '../components/ContentHeader';
import { List } from '../components/List';
import Alert from '../components/Alert/Alert';

import useConnect from '../hooks/useConnect';
import useConnection from '../hooks/useConnection';

import { isSignIn } from '../actions/auth';
import {
    setLoading,
    subscribeToDb,
    getAllTask,
    syncTasks
} from '../actions/tasks';
import Preloader from '../components/Preloader/Preloader';

let i = 0;

const Application = ({ className }) => {
    const [{ user, loading, isConnected }, actions] = useConnect({
        isSignIn,
        setLoading,
        subscribeToDb,
        getAllTask,
        syncTasks
    });
    // хук для синхронизации состояний после потери конекшена
    useConnection();

    useEffect(() => {
        actions.isSignIn();
    }, []);

    useEffect(() => {
        // при первом рендере запрашиваем таски и показыаем лоадер, пока не ответила база
        if (i < 1) {
            actions.setLoading();

            actions.getAllTask();
        }
        i++;
    }, [user.uid]);

    if (loading) return <Preloader />;

    return (
        <>
            <Alert isConnected={isConnected} />
            <div className={`row pr-3 mt-0 mt-xl-5 ${className}`}>
                <div className="col main-content p-0">
                    <ContentHeader />
                    <List />
                </div>
            </div>
        </>
    );
};

Application.propTypes = {
    className: PropTypes.string.isRequired,
};

const StyledApplication = styled(Application)`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export default StyledApplication;
