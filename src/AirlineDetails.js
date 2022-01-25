import { useEffect } from "react";
import { Card , Button} from "react-bootstrap";
import data from "./test/data";
import * as Icon from 'react-bootstrap-icons';
import no_image from './images/no_image.png';


function AirlineDetails({info, goBack}) {
 
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
                <Card.Title>Airline Name: {info.name}</Card.Title>
                <Card.Text><b>Country:</b> {info.country}</Card.Text>
                <Card.Text><b>Head Quarters:</b> {info.head_quaters}</Card.Text>
                <Card.Text><b>Established on: </b> {info.established}</Card.Text>
                <Card.Text><b>Slogan: </b>{info.slogan}</Card.Text>
                <Card.Link target="_blank"  href={'http://' + info.website}>{"Check Website"}</Card.Link>
            </Card.Body>
        </Card>
        </div>
        )
}


export default AirlineDetails;
