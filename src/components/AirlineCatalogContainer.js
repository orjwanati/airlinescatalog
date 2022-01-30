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
import AirlineCatalog from "./AirlineCatalog";

function AirlineCatalogContainer(props) {
    useEffect(() => { 
        console.log("fetching ...")
        props.fetchAirlines('https://api.instantwebtools.net/v1/airlines')
    }, [])
    return <AirlineCatalog {...props}/>
    
}

const mapStatetoProps = (state) => {
    return { airlineList: state.airlineList,
            loading: state.loading,
            error: state.error }
  }
  
  const mapDispatchtoProps = (dispatch) => {
    return {
        fetchAirlines: (url) => dispatch(fetchAirlines(url)),
        // setFavorite: (id) => dispatch(setFavorite(id)),
    }
  }
  
  export default connect(mapStatetoProps, mapDispatchtoProps)(AirlineCatalogContainer); 