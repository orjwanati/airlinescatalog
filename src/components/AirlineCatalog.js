import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { fetchAirlines, setFavorite } from "../actions/actions";
import AirlineCard from "./AirlineCard";
import LoadingPage from "./LoadingPage";
import { FixedSizeList as List } from 'react-window';
import AirlineDetails from "./AirlineDetails";
import AutoSizer from "react-virtualized-auto-sizer";

import * as Icon from 'react-bootstrap-icons';
import ErrorPage from "./ErrorPage";
import { Button } from "react-bootstrap";

function AirlineCatalog({airlineList, loading, error}) {
    const [currentView, setCurrentView] = useState({page:"list", index:0}) // or detail
    const gridRef = useRef();
    const itemSize = 300

    

    const scrollToTop = () =>{
        gridRef.current.scrollTo({ scrollLeft: 0, scrollTop: 0 })
    };


    const goToAirlineDetailsPage = (index) => {
        console.log("go to details page at index" , index)
        setCurrentView({page:"detail", index:index})
    }

    const goBackHere = (index) => {
        console.log("go Back to list page")
        setCurrentView({page:"main", index:0})
    }

    const ListCell = ({ index, style }, itemsPerRow) => {
        let startColIndex = (index*itemsPerRow)
        let endColIndex = startColIndex + itemsPerRow
        endColIndex = endColIndex<=airlineList.length?endColIndex:airlineList.length;
        let airlines = airlineList.slice(startColIndex, endColIndex);

        return (
            <div key={index} style={style} className="d-flex flex-row ">
                {airlines.map((item, idx) => <AirlineCard key={idx} index={idx} style={style} widthPercentage={100/itemsPerRow} info={item} onClick={()=>goToAirlineDetailsPage(startColIndex+idx)}/>)}
            </div>
        )
    }

    console.log(loading, error)
    if(loading) {
        return <LoadingPage/>
    } else if(error) {
        return <ErrorPage msg={error.msg}/>
    } else {
        if(currentView.page === "detail") {
            return(<AirlineDetails info={airlineList[currentView.index]} goBack={goBackHere}/>)
        } else { 
            return(
                <div style={{width:"100%", height:"100vh"}}>
                  <AutoSizer>
                        {({height, width}) => {
                            let itemsPerRow = Math.floor(width / itemSize);
                            if(itemsPerRow === 0 ) {
                                itemsPerRow = 1
                            }
                            
                            let rowCount = Math.ceil(airlineList.length / itemsPerRow);
                            
                            return (
                                <List
                                    itemCount={rowCount}
                                    layout="vertical"
                                    height={height}
                                    itemSize={itemSize}
                                    overscanCount={10}
                                    ref={gridRef}
                                    width={width}
                                    >
                                    {(x)=>ListCell(x, itemsPerRow)}

                                </List>)}}
                    </AutoSizer>
                    <Button  onClick={scrollToTop}
                        style={{backgroundColor:'#0c9c9c', height:"50"}}
                        className="mx-10 fixedBottomRight border border-0 rounded-pill">
                        <Icon.ArrowUpCircle className="p-1" size={28}/>
                        Go Top
                    </Button>
                </div>
            )
        }
    }
}

export default AirlineCatalog;