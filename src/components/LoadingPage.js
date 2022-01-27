
import React from 'react';
import LoadingScreen from 'react-loading-screen'


export default function LoadingPage() {
 
    return (

        <LoadingScreen
            loading={true}
            bgColor='white'
            spinnerColor='black'
            textColor='black'
            text='loading'
        >
            <p>..</p>
        </LoadingScreen>
    ) 
}


