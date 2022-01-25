import { useEffect, useLayoutEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchAirlines, setFavorite } from "./actions";
import AirlineCard from "./AirlineCard";
import LoadingPage from "./LoadingPage";
import data from "./test/data";
import { FixedSizeList as List } from 'react-window';
import { FixedSizeGrid as Grid } from 'react-window';
import AirlineDetails from "./AirlineDetails";


function AirlineCatalog({airlineList, loading, error, fetchAirlines, setFavorite}) {
    // const [airlineList, setAirlineList] = useState([]);
    // console.log("in com ...", airlineList.values())

    const [page, setPage] = useState({page:"list", index:0}) // or detail

    // on mount
    useLayoutEffect(() => { 
        // fetch airlines
        console.log("fetching ...")
        fetchAirlines()
    }, [])
    let columnCount = 5;
    const getIndex = (columnIndex, rowIndex) => (rowIndex*columnCount + columnIndex)

    const goToAirlineDetailsPage = (index) => {
        console.log("go to details page at index" , index)
        setPage({page:"detail", index:index})
    }

    const goBackHere = (index) => {
        console.log("go Back to list page")
        setPage({page:"main", index:0})
    }

    const Cell = ({ columnIndex, rowIndex, style }) => {
            let listIndex = getIndex(columnIndex, rowIndex)
            if(listIndex < airlineList.length) {
                return <AirlineCard style={style} info={airlineList[listIndex]} onClick={()=>goToAirlineDetailsPage(listIndex)}/>
            } else {
                return <p></p>
            }
        }
        //  <p style={style}>{"HERE"}</p>
        // <div style={style}>airlineList[index].name {index}</div>


      
 
    // let layout = "horizontal"
    // let layout = "vertical"


    if(loading) {
        return <LoadingPage/>
    } else 
    {
        if(page.page === "detail") {
            return(<AirlineDetails info={airlineList[page.index]} goBack={goBackHere}/>)
        } else {
        return(

            <Grid
                columnCount={columnCount}
                columnWidth={300}
                height={2000}
                rowCount={(airlineList.length/columnCount)+1}
                rowHeight={300}
                width={300*columnCount}
        >
            {Cell}
        </Grid>
//             <List
//     height={600}
//     itemCount={airlineList.length}
//     itemSize={500}
//     layout="horizontal"
//     width={300}
//   >
//     {Column}
//   </List>
            // <List
            //     height={layout === "horizontal"? "80%":800}
            //     itemCount={airlineList.length}
            //     itemSize={100}
            //     layout={layout}
            //     width={layout === "horizontal"? 6000:"90%"}
            // >
            //     {Column}
            // </List>

            // <CardGroup className="d-flex flex-wrap flex-xs-column align">
            // {airlineList.map((item) => <AirlineCard info={item} />)}   
            // </CardGroup>
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