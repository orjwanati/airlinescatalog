
import React from 'react';
import LoadingScreen from 'react-loading-screen'


export default function ErrorPage() {
 
    return (

        <LoadingScreen
            loading={true}
            bgColor='white'
            spinnerColor='black'
            textColor='red'
            text='loading'
        >
            <p>Error</p>
        </LoadingScreen>
    ) 
}


