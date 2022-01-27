import { useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { fetchAirlines, setFavorite } from "./actions";
import AirlineCard from "./AirlineCard";
import LoadingPage from "./LoadingPage";
import { FixedSizeList as List } from 'react-window';
import AirlineDetails from "./AirlineDetails";
import Button from "@restart/ui/esm/Button";
import AutoSizer from "react-virtualized-auto-sizer";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import * as Icon from 'react-bootstrap-icons';
import ErrorPage from "./ErrorPage";


const images = [
    "https://picsum.photos/200/300?image=1050",
    "https://picsum.photos/400/400?image=1039",
    "https://picsum.photos/400/400?image=1080",
    "https://picsum.photos/200/200?image=997",
    "https://picsum.photos/500/400?image=287",
    "https://picsum.photos/400/500?image=955",
    "https://picsum.photos/200/300?image=916",
    "https://picsum.photos/300/300?image=110",
    "https://picsum.photos/300/300?image=206",
  ]
  
  


function AirlineMasonary({airlineList, loading, error, fetchAirlines, setFavorite}) {
    const [currentView, setCurrentView] = useState({page:"list", index:0}) // or detail
    const gridRef = useRef();
    const itemSize = 300
    const masonryOptions = {
        transitionDuration: 0,
        // itemSelector: ".grid-image",
        columnWidth: 300,
        fitWidth: true
      };
    useLayoutEffect(() => { 
        console.log("fetching ...")
        fetchAirlines()
    }, [])

    const scrollToTop = () =>{
        gridRef.current.scrollTo({ scrollLeft: 0, scrollTop: 0 })
    };
    
    const PageIndex = () => (
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}>
          <Masonry columnsCount={4} gutter="10px">
            {airlineList.map((item, idx) => (
            //   <img
            //     key={i}
            //     src={image}
            //     alt=""
            //     style={{width: 300, height:300, display: "block"}}
            //   />
            
            <AirlineCard index={idx} style={{}} widthPercentage={100} info={item} onClick={()=>goToAirlineDetailsPage(idx)}/>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )

    const goToAirlineDetailsPage = (index) => {
        console.log("go to details page at index" , index)
        setCurrentView({page:"detail", index:index})
    }

    const goBackHere = (index) => {
        console.log("go Back to list page")
        setCurrentView({page:"main", index:0})
    }


    const itemKey = (index, data, itemsPerRow) => {
 
        // let startColIndex = (index*itemsPerRow)
        // let endColIndex = startColIndex + itemsPerRow
        // endColIndex = endColIndex<=airlineList.length?endColIndex:airlineList.length;
        // let airlines = airlineList.slice(startColIndex, endColIndex);
        let key = "" + index + "##" +  itemsPerRow
        // airlines.map((item) => {
        //     key = key + item.id
        // }
        // )
        console.log("key => ", key)
        // return uniqueId()
        return key.toString()
    }
    const uniqueId = ()=> Date.now().toString(36) + Math.random().toString(36).substring(2);

    // const ListCell = ({ index, style }, itemsPerRow) => {
        
        
    //     let startColIndex = (index*itemsPerRow)
    //     let endColIndex = startColIndex + itemsPerRow
    //     endColIndex = endColIndex<=airlineList.length?endColIndex:airlineList.length;
    //     let airlines = airlineList.slice(startColIndex, endColIndex);

    //     return (
    //         <div key={startColIndex.toString() + endColIndex.toString()} style={style} className="d-flex flex-row ">
    //             {airlines.map((item, idx) => <AirlineCard index={idx} style={style} widthPercentage={100/itemsPerRow} info={item} onClick={()=>goToAirlineDetailsPage(startColIndex+idx)}/>)}
    //         </div>
    //     )
    // }

    const ListCell = (item, idx) => {
        return <AirlineCard index={idx} style={{}} widthPercentage={100} info={item} onClick={()=>goToAirlineDetailsPage(idx)}/>
    }


    if(loading) {
        return <LoadingPage/>
    } else if(error) {
        return <ErrorPage/>
    } else {
        return PageIndex()

        if(currentView.page === "detail") {
            return(<AirlineDetails info={airlineList[currentView.index]} goBack={goBackHere}/>)
        } else { 
            return(
                
                    <>
                      <Masonry className="grid" elementType="ul" options={masonryOptions}>
                        {airlineList.map((item, index) => ListCell(item, index))}
                      </Masonry>
                    </>
                  
            )
        }
    }
}

const mapStatetoProps = (state) => {
    return { airlineList: state.airlineList,
            loading: state.loading,
            error: state.error }
  }
  
  const mapDispatchtoProps = (dispatch) => {
    return {
        fetchAirlines: () => dispatch(fetchAirlines()),
        // setFavorite: (id) => dispatch(setFavorite(id)),
    }
  }
  
  export default connect(mapStatetoProps, mapDispatchtoProps)(AirlineMasonary); 