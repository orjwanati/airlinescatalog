
import { useState } from "react";
import { Card , Button} from "react-bootstrap";
import { HeartFill, PlusSquare } from "react-bootstrap-icons";
// import * as Icon from 'react-bootstrap-icons';
import no_image from '../images/no_image.png';

function AirlineCard({style , index, info, widthPercentage, setFavorite, onClick}) {
    const [isFavorite, toggleFavorite] = useState(false)


    return(
            <Card 
            tag="a" onClick={onClick} 
                className="mx-2 px-2 my-2 border border-1 border-dark " 
                style={{ width: widthPercentage+'%', height: '90%', cursor: "pointer" }}>
                <Button className={"position-absolute btn btn-light"} onClick={(event)=>{
                        event.stopPropagation();
                        toggleFavorite(!isFavorite)}} >

                    {!isFavorite?<PlusSquare color="#FFFFF" size={25}/>:<HeartFill  color="#FF0000" size={22}/>} 
                </Button>

                <Card.Img className="card-img-top" variant="top" src={info.logo} 
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src=no_image;
                    }} 
                />
                
                <Card.Title >{info.name}</Card.Title>
                
                <Card.Subtitle >{"HQ:" + info.country}</Card.Subtitle>
                
                <Card.Text  tag="a"  onClick={(event)=>{
                        event.stopPropagation();
                    }} >
                    <a target="_blank"  href={'http://' + info.website}>{"Check Website"}</a>
                </Card.Text>

            </Card>
    )
}


export default AirlineCard;
