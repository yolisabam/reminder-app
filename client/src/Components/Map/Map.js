import React, { Component } from 'react'
import './Map.css';

class MapRender extends Component {
  constructor() {
    super();
    this.state = {
      zoom: 13,
      maptype: 'roadmap',
      place_formatted: '',
      place_id: '',
      place_location: '',
    };
  }

  componentDidMount() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.7749, lng: -122.431297},
      zoom: 10,
      mapTypeId: 'roadmap',
    });

    map.addListener('zoom_changed', () => {
      this.setState({
        zoom: map.getZoom(),
      });
    });

    map.addListener('maptypeid_changed', () => {
      this.setState({
        maptype: map.getMapTypeId(),
      });
    });

    let marker = new window.google.maps.Marker({
      map: map,
      position: {lat: 37.7749, lng: -122.431297},
    });


    // initialize the autocomplete functionality using the #pac-input input box
    let inputNode = document.getElementById('pac-input');
    console.log(inputNode)
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

    autoComplete.addListener('place_changed', () => {
      let place = autoComplete.getPlace();
      let location = place.geometry.location;

      this.setState({
        place_formatted: place.formatted_address,
        place_id: place.place_id,
        place_location: location.toString(),
      });

      // bring the selected place in view on the map
      map.fitBounds(place.geometry.viewport);
      map.setCenter(location);

      marker.setPlace({
        placeId: place.place_id,
        location: location,
      });
    });
  }

  render() {
    return (
      <div id='app'>
        <div id='map' />
         <input id="pac-input" className="controls" type="text" placeholder="Search Box" />


       {/*modal*/}


       



       {/*modal*/}

      </div>
    );
  }
};

export default MapRender;

// import React, { Component } from 'react'
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

// class SimpleForm extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { address: 'San Francisco, CA' }
//     this.onChange = (address) => this.setState({ address })
//   }

//   handleFormSubmit = (event) => {
//     event.preventDefault()

//     geocodeByAddress(this.state.address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => console.log('Success', latLng))
//       .catch(error => console.error('Error', error))
//   }

//   render() {
//     const inputProps = {
//       value: this.state.address,
//       onChange: this.onChange,
//     }

//     return (
//       <div className="col-md-6 float-right">
//         <form onSubmit={this.handleFormSubmit}>
//           <PlacesAutocomplete inputProps={inputProps} />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     )
//   }
// }

// export default SimpleForm;
