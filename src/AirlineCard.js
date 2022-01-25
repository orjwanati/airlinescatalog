
import { useState } from "react";
import { Card , Button} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { setFavorite } from "./actions";
import no_image from './images/no_image.png';


function AirlineCard({style , info, setFavorite, onClick}) {
    const [isFavorite, toggleFavorite] = useState(false)

    return(
        <div style={style} >
        <Card className="mx-2 my-2 border border-1 border-dark " style={{ width: '90%', height: '90%', cursor: "pointer" }}>
            <Button className={"position-absolute btn btn-light" } 
                onClick={()=>toggleFavorite(!isFavorite)} >
                {!isFavorite?<Icon.PlusSquare color="#FFFFF" size={25}/>:<Icon.HeartFill  color="#FF0000" size={22}/>} 
            </Button> 
            <Card.Img className=".card-img-top" tag="a" onClick={onClick} variant="top" src={info.logo} 
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src=no_image;
                }} 
                />
                <Card.Title tag="a" onClick={onClick}>{info.name}</Card.Title>
                <Card.Subtitle tag="a" onClick={onClick}>{"HQ:" + info.country}</Card.Subtitle>
                <Card.Link target="_blank"  href={'http://' + info.website}>{"Check Website"}</Card.Link>
        </Card>
        </div>
    )
}


export default AirlineCard;
