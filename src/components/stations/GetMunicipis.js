import React from 'react';
import '../../stylesheets/stylesModalStations.css';
import { useRef, useState, useEffect, render } from "react";
import Select from 'react-select';
import stg from '../../utils/stg';

/* LIBERIA AXIOS */
import axios from "../../api/axios";

const STATIONS_URL = '/backendstations.php';


class GetMunicipis extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.id)
        this.state = {
            "selectOptions": [],
            "location": '',
            "method": 'none',
            "id": props.id
           // id : {id}
        }

    }

    async getAllMunicipis() {

        const method = 'readmunicipis';
        //const location = 'Barcelona';
        const setErrorMessage = '';
        //const errorRef = useRef();
        //const [success, setSuccess] = useState(false);
        var response = '';
        
        response = await axios.post(
            STATIONS_URL,
            JSON.stringify({ method: method }),
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: false
            },
            { timeout: 4 }
        ).then(response => {
            if (response.data.readmunicipis) {
                console.log(response.data);

                const data = response.data[0];

                const options = data.map(x => ({
                    "value": x.municipi,
                    "label": x.municipi
                }))

                this.setState({ "selectOptions": options });

            } else {
                setErrorMessage(response);
            }
        })

            .catch(err => {
                console.log(err);
            })
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
        this.getAllMunicipis();
    }


    handleChange(e) {
        const location = e.value;
        const stationMethod = 'readstationmunicipi';
        this.setState({ "location": location });
        this.setState({ "method": stationMethod })
        
    }

/*     changeLocationInParent(props) {
        console.log(props);
        console.log(this.state);
        console.log(this.state.location);
        props.changeLocation(this.state.location);
    } */

    render() {
        console.log(this.state);
        console.log(this.state.location);
        return (
            <>
                <h3 id={this.state.id}>
                    MUNICIPIO:
                </h3>
                <Select
                    locationMunicipi={this.state.location}
                    methodMunicipi={this.state.method}
                    options={this.state.selectOptions}
                    onChange={this.handleChange.bind(this)}
                    className="select-station" >
                    </Select>

            </>
        );
    }
}
export default GetMunicipis;
