import { useEffect } from "react";
import { Card , Button} from "react-bootstrap";
import data from "./test/data";
import * as Icon from 'react-bootstrap-icons';
import no_image from './images/no_image.png';


function AirlineDetails({info, goBack}) {
    // return (
    //     <p>{info.name}</p>
    // )
    return(
        <div>
        <Button className={"mx-0 my-0 text-black sticky-top btn btn-light" } 
            onClick={goBack} 
            size='lg'>
            <Icon.ArrowLeft className="px-1 bi bi-align-end" color="#FFFFF" size={44}/> 
            Back
        </Button> 

        <Card className="mx-2 my-2 border border-1 border-dark " style={{ width: '90%', height: '90%' }}>
        <Card.Img variant="top" src={info.logo} 
         onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src=no_image;
            }} 
        
        />
        <Card.Body>
            <Card.Title>{info.name}</Card.Title>
            <Card.Title>{info.country}</Card.Title>
            <Card.Title>{info.head_quaters}</Card.Title>
            <Card.Title>{info.slogan}</Card.Title>
            <Card.Title>{info.website}</Card.Title>
            <Card.Title>{info.established}</Card.Title>
            {/* <Card.Text>
            </Card.Text> */}
        </Card.Body>
        </Card>
        </div>
        )
}


export default AirlineDetails;
