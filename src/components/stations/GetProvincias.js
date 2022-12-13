import React from 'react';
import '../../stylesheets/stylesModalStations.css';
import { useRef, useState, useEffect, render } from "react";
import Select from 'react-select';
import stg from '../../utils/stg';

/* LIBERIA AXIOS */
import axios from "../../api/axios";
import GetMunicipis from './GetMunicipis';

const STATIONS_URL = '/backendstations.php';



class GetProvincias extends React.Component {

    constructor(props) {
      
        super(props)    
        this.state = {
            "selectOptions": [],
            "location": '',
            "method": 'none',
            "id": props.id
        }
    }

    
    async getAllProvincias() {

        const method = 'readprovincias';
        const location = 'Barcelona';
        const setErrorMessage = '';
        //const errorRef = useRef();
        //const [success, setSuccess] = useState(false);
        var response = '';


        response = await axios.post(
            STATIONS_URL,
            JSON.stringify({ method: method }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            },
            { timeout: 4 }
        ).then(response => {
            console.log(response.data);
            if (response.data.readprovincias) {
                const data = response.data[0];

                const options = data.map(x => ({
                    "value": x.provincia,
                    "label": x.provincia
                }))

                this.setState({ "selectOptions": options });
            } else {
                setErrorMessage(response);
            }
        })

            .catch(err => {
                console.log(err);
            });
        /*
                if (response.data.readstationsmunicipi) {
        
                    for (let i = 0; i < response.data[0].length; i++) {
                        let lat = Number(parseFloat(response.data[0][i].latitud));
                        let lng = Number(parseFloat(response.data[0][i].longitud));
                        data.push(response.data[0][i]);
        
                        coordenates.push({ lat: Number(parseFloat(lat)), lng: Number(parseFloat(lng)) });
        
                    }
                    setMarkers(coordenates)
                    setStationsData(data);
        
                } else {
                    console.log(response)
                } */


}

    componentDidMount() {
        this.getAllProvincias();
    }


    handleChange(e) {

        const location = e.value;
        const stationMethod = 'readstationprovincia';
        this.setState({ "location": location });
        this.setState({ "method": stationMethod });
    }


    render() {
        console.log(this.state);
        return (
            <>
                <h3>
                    PROVINCIA:
                </h3>
                <Select
                    location={this.state.location}
                    method={this.state.method}
                    options={this.state.selectOptions}
                    onChange={this.handleChange.bind(this)}
                    className="select-station" > </Select>
            </>
        );
    }
}
export default GetProvincias;
