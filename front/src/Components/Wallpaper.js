import React from 'react';
import '../Styles/Home.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';



class Wallpaper extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            inputText: undefined,
            suggestions: []
        }
    }
    handleLocationChange = (event) => {
        const locationId = event.target.value;
        sessionStorage.setItem('locationId', locationId);
        axios({
            url: `http://localhost:8989/restuarants/${locationId} `,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurants })
        }

        ).catch(err => {
            console.log(err)
        })

    }
    handleInput = (event) => {
        const { restaurants } = this.state;
        const inputText = event.target.value;
        let suggestions = [];
        suggestions = restaurants.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ inputText, suggestions })
    }
    selectingRestaurant = (resObj) => {
        this.props.history.push(`/details?restaurants=${resObj._id}`)
    }

    showSuggestion = () => {
        const { suggestions, inputText } = this.state;

        if (suggestions.length == 0 && inputText == undefined) {
            return null;
        }
        if (suggestions.length > 0 && inputText == '') {
            return null;
        }
        if (suggestions.length == 0 && inputText) {
            return <ul >
                <li>No Search Results Found</li>
            </ul>
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectingRestaurant(item)}>{`${item.name} -   ${item.locality},${item.city}`}</li>))
                }
            </ul>
        );

    }
    render() {

        const { locationsdata } = this.props;
        return (
            <div>
                <div>
                    <div className="image">
                        <img src="./Assets/homepageimg.png" alt="homepageimg" width="100%" height="480px" />
                    </div>
                    <div className="over-img-top">
                        <div className="logo-home">e!</div>
                        <div className="over-img-mid">
                            Find best resturents, cafes and bars
                        </div>

                        <div className="over-img-bottom">
                            {/*  <input type="text" className="over-img-bottom-left" placeholder="please type a location" />
                          */}
                            <div className=" over-img-bottom-left">
                                <select className="locationDropdown" onChange={this.handleLocationChange}>
                                    <option value="0">Select</option>
                                    {locationsdata.map((item) => {
                                        return <option value={item.location_id}>{`${item.name},${item.city}`}</option>
                                    })}

                                </select>
                            </div>
                            {/*  <span className="fab fa-searchengin search-icon"></span>
                            <input type="text" placeholder="search for resturents" className="over-img-bottom-right"/>
                        */}
                            <div>
                                {/*  <span className="glyphicon glyphicon-search search "></span>*/}
                                <div id="notebooks">
                                    <input id="query" className="restaurantsinput" type="text"
                                        placeholder="Please Enter Restaurant Name" onChange={this.handleInput} />
                                    {this.showSuggestion()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        )
    }



}
export default withRouter(Wallpaper);
