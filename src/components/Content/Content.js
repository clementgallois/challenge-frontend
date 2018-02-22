import React, { Component } from 'react';
import DeviceList from '../DeviceList';
import './Content.css';

const apiRoute = 'https://raw.githubusercontent.com/hibooapp/challenge-frontend/master/data/';


class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      locations: [],
      selected: null,
    };
    this.loadDevices = this.loadDevices.bind(this);
    this.loadLocations = this.loadLocations.bind(this);
    this.setDevice = this.setDevice.bind(this);
  }


  componentDidMount() {
    this.loadDevices();
  }


  setDevice(id) {
    const selected = this.state.devices.find(elem => elem.id === id);
    console.log(selected);
    this.loadLocations(selected);
  }

  loadDevices() {
    fetch(`${apiRoute}devices.json`)
      .then(resp => resp.json())
      .then((data) => {
        this.setState({
          devices: data,
        });
      })
      .catch((error) => {
        console.log('there was an error fetching the data');
        console.log(error);
      });
  }

  loadLocations(selected) {
    if (selected) {
      fetch(`${apiRoute}locations.json`)
        .then(resp => resp.json())
        .then((data) => {
          this.setState({
            // we filter due to lack of backend (can't query specific id)
            locations: data.filter(elem => elem.device_id === selected.id),
            selected,
          });
        })
        .catch((error) => {
          console.log('there was an error fetching the data');
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="Content card">
        <DeviceList
          devices={this.state.devices}
          setDevice={this.setDevice}
        />
        <div style={{ flex: 2 }} />
      </div>
    );
  }
}

export default Content;
