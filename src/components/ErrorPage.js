
import React from 'react';
import { Alert } from 'react-bootstrap';


export default function ErrorPage({msg="UNKNOWN"}) {
    return (
        <div className="d-flex justify-content-center align-items-center h-100" >
                    <Alert variant={"danger"}>
                        <Alert.Heading>Something Went Wrong!</Alert.Heading>
                        <p> Message:"{msg}" </p>
                        <p> Please Try Again!</p>
                    </Alert> 
            
            </div>
    ) 
}


