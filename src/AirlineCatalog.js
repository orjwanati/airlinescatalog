import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { fetchAirlines, setFavorite } from "./actions";
import AirlineCard from "./AirlineCard";
import LoadingPage from "./LoadingPage";
import { FixedSizeGrid as Grid } from 'react-window';
import AirlineDetails from "./AirlineDetails";
import Button from "@restart/ui/esm/Button";
import AutoSizer from "react-virtualized-auto-sizer";

import * as Icon from 'react-bootstrap-icons';

function AirlineCatalog({airlineList, loading, error, fetchAirlines, setFavorite}) {
    const [currentView, setCurrentView] = useState({page:"list", index:0}) // or detail
    let columnCount = 4;
    const gridRef = useRef();

    useLayoutEffect(() => { 
        console.log("fetching ...")
        fetchAirlines()
    }, [])

    const scrollToTop = () =>{
        gridRef.current.scrollTo({ scrollLeft: 0, scrollTop: 0 })
    };
    

    const getIndex = (columnIndex, rowIndex) => (rowIndex*columnCount + columnIndex)

    const goToAirlineDetailsPage = (index) => {
        console.log("go to details page at index" , index)
        setCurrentView({page:"detail", index:index})
    }

    const goBackHere = (index) => {
        console.log("go Back to list page")
        setCurrentView({page:"main", index:0})
    }

    const Cell = ({ columnIndex, rowIndex, style }) => {
            let listIndex = getIndex(columnIndex, rowIndex)
            if(listIndex < airlineList.length) {
                return <AirlineCard style={style} info={airlineList[listIndex]} onClick={()=>goToAirlineDetailsPage(listIndex)}/>
            } else {
                return <p></p>
            }
        }

    if(loading) {
        return <LoadingPage/>
    } else 
    {
        if(currentView.page === "detail") {
            return(<AirlineDetails info={airlineList[currentView.index]} goBack={goBackHere}/>)
        } else {
        return(
            <div style={{width:"100%", height:"100vh"}}>
                  <AutoSizer>
                  {({height, width}) => (<Grid
                    columnCount={columnCount}
                    columnWidth={300}
                    height={height}
                    rowCount={(airlineList.length/columnCount)+1}
                    rowHeight={300}
                    ref={gridRef}
                    width={width}>
                    {Cell}
                </Grid>)}
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
  
  export default connect(mapStatetoProps, mapDispatchtoProps)(AirlineCatalog); 