import React, { Component } from 'react';
import List from '../List';
import Map from '../Map';
import SortButton from '../SortButton';
import './Content.css';

const apiRoute = 'https://raw.githubusercontent.com/hibooapp/challenge-frontend/master/data/';

const DESC = false;

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      deviceOrder: {
        key: '',
        order: DESC,
      },
      locations: [],
    };
    this.loadDevices = this.loadDevices.bind(this);
    this.loadLocations = this.loadLocations.bind(this);
    this.setDevice = this.setDevice.bind(this);
    this.sortDevices = this.sortDevices.bind(this);
  }


  componentDidMount() {
    this.loadDevices();
  }


  sortDevices(key = this.state.deviceOrder.key){
    //shallow copy
    let devices = this.state.devices.slice();
    let order = (this.state.deviceOrder.key === key ? !this.state.deviceOrder.order : DESC);

    devices = devices.sort((a, b) => {
      if (a[key] > b[key]){
        return -1;
      }
      else if (a[key] < b[key]){
        return 1;
      }
      return 0;
    });
    if (order){
      devices = devices.reverse();
    }
    this.setState({
      devices,
      deviceOrder: {
        key,
        order,
      }
    });
  }

  setDevice(item) {
    const selected = this.state.devices.find(elem => elem.id === item.id);
    this.loadLocations(selected);
  }


  loadDevices() {
    fetch(`${apiRoute}devices.json`)
      .then(resp => resp.json())
      .then((data) => {
        this.setState({
          devices: data,
        }, () => this.sortDevices('last_seen'));
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
    const {
      devices,
      locations,
    } = this.state;
    return (
      <div className="Content card">
        <div className="Devices">
          <div className="ListHeader">
            <SortButton
              itemKey="name"
              onClick={this.sortDevices}
              order={this.state.deviceOrder}
            />
            <SortButton
              itemKey="last_seen"
              onClick={this.sortDevices}
              order={this.state.deviceOrder}
            />
          </div>
          <List
            items={devices}
            titleKey="name"
            descKey="last_seen"
            clickHandler={this.setDevice}
            setSort={this.sortDevices}
          />
        </div>
        <div className="Map">
          <Map markers={locations} />
        </div>
        <div className="Locations">
          <div className="test">
            <List
              items={locations}
              titleKey="address"
              descKey="date"
              size="small"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
