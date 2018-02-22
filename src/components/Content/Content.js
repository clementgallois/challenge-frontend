import React, { Component } from 'react';
import List from '../List';
import './Content.css';

const apiRoute = 'https://raw.githubusercontent.com/hibooapp/challenge-frontend/master/data/';


class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      locations: [],
    };
    this.loadDevices = this.loadDevices.bind(this);
    this.loadLocations = this.loadLocations.bind(this);
    this.setDevice = this.setDevice.bind(this);
  }


  componentDidMount() {
    this.loadDevices();
  }


  setDevice(item) {
    const selected = this.state.devices.find(elem => elem.id === item.id);
    this.loadLocations(selected);
  }

  loadDevices() {
    fetch(`${apiRoute}devices.json`)
      .then(resp => resp.json())
      .then((data) => {
        const devices = data.sort((a, b) => new Date(b.last_seen) - new Date(a.last_seen));
        this.setState({
          devices,
        });
      })
      .catch(() => {

      });
  }

  loadLocations(selected) {
    if (selected) {
      fetch(`${apiRoute}locations.json`)
        .then(resp => resp.json())
        .then((data) => {
          // we filter due to lack of backend (can't query specific id)
          const res = data.filter(elem => elem.device_id === selected.id);

          const locations = res.sort((a, b) => new Date(b.date) - new Date(a.date));
          this.setState({
            locations,
          });
        })
        .catch(() => {

        });
    }
  }

  render() {
    return (
      <div className="Content card">
        <List
          items={this.state.devices}
          titleKey="name"
          descKey="last_seen"
          clickHandler={this.setDevice}
        />
        <div style={{ flex: 2, overflow: 'auto' }}>
          <List
            items={this.state.locations}
            titleKey="address"
            descKey="date"
            size="small"
          />
        </div>
      </div>
    );
  }
}

export default Content;
