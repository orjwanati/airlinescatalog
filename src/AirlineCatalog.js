import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { fetchAirlines, setFavorite } from "./actions";
import AirlineCard from "./AirlineCard";
import LoadingPage from "./LoadingPage";
import { FixedSizeGrid as Grid } from 'react-window';
import { FixedSizeList as List } from 'react-window';
import AirlineDetails from "./AirlineDetails";
import Button from "@restart/ui/esm/Button";
import AutoSizer from "react-virtualized-auto-sizer";
// import {Collection} from 'react-virtualized';

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
    const getIndex2 = (index, itemsPerRow) => (index*itemsPerRow)

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

        const ListCell = ({ index, style, data, isScrolling }) => {
            // let listIndex = getIndex(columnIndex, rowIndex)
            // if(listIndex < airlineList.length) {
                return <AirlineCard style={style} info={airlineList[index]} onClick={()=>goToAirlineDetailsPage(index)}/>
            // } else {
                // return <p></p>
            // }
        }

        const ListCell2 = ({ index, style }, itemsPerRow) => {
                let airlines = []
                let startColIndex = getIndex2(index, itemsPerRow)
                let endColIndex = startColIndex + itemsPerRow<=airlineList.length?startColIndex + itemsPerRow:airlineList.length
                airlines = airlineList.slice(startColIndex, endColIndex);
                console.log(">>>>", index, startColIndex, endColIndex,itemsPerRow, airlines )
                return (<div  style={style} className="d-flex flex-row ">
                        {airlines.map((item, index) => <AirlineCard style={style} widthPercentage={100/itemsPerRow} info={item} onClick={()=>goToAirlineDetailsPage(startColIndex+index)}/>)}
                        </div>)
        }


        function cellSizeAndPositionGetter({index}) {

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
                  {/* {({height, width}) => 
                  {
                    const ITEM_SIZE = 300
                    let itemsPerRow = Math.floor(width / ITEM_SIZE);
                    if(itemsPerRow === 0 ) itemsPerRow = 1
                    const rowCount = Math.ceil(airlineList.length / itemsPerRow);  
                    console.log(itemsPerRow, rowCount)
                    return (<Grid
                    columnCount={itemsPerRow}
                    columnWidth={ITEM_SIZE}
                    height={height}
                    rowCount={rowCount}
                    rowHeight={ITEM_SIZE}
                    ref={gridRef}
                    overscanCount={100}
                    width={width}>
                    {Cell}
                </Grid>)}} */}
                {({height, width}) => {
                    const ITEM_SIZE = 300
                    let itemsPerRow = Math.floor(width / ITEM_SIZE);
                    if(itemsPerRow === 0 ) itemsPerRow = 1
                    let rowCount = Math.ceil(airlineList.length / itemsPerRow);
                    console.log({itemsPerRow, rowCount})
                    return (<List
                    itemCount={rowCount}
                    // direction="vertical"
                    // columnWidth={300}
                    layout="vertical"
                    height={height}
                    // itemKey={}
                    itemSize={ITEM_SIZE}
                    overscanCount={10}
                    // rowCount={(airlineList.length/columnCount)+1}
                    // rowHeight={300}
                    ref={gridRef}
                    width={width}>
                    {(x)=>ListCell2(x, itemsPerRow)}
                </List>
                )}}
                {/* {({height, width}) => <Collection
                    cellCount={airlineList.length}
                    cellRenderer={ListCell}
                    cellSizeAndPositionGetter={cellSizeAndPositionGetter}
                    height={height}
                    width={width}
                />
                } */}
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