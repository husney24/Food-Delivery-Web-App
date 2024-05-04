import React from 'react';
import '../Styles/Home.css';
import Wallpaper from './Wallpaper';
import QuickSearch from './Quicksearch';
import axios from 'axios';

class Home extends React.Component {
    constructor(){
        super();
        this.state={
            locations:[],
            mealtypes:[]
        }
    }
    componentDidMount(){
        sessionStorage.clear();
        axios({
            url:'http://localhost:8989/locations',
            method:'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res =>{
            this.setState({locations:res.data.locations})
        }

        ).catch(err=>{
            console.log(err)
        })
        axios({
            url:'http://localhost:8989/mealtypes',
            method:'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res =>{
            this.setState({mealtypes:res.data.mealtypes})
        }

        ).catch(err=>{
            console.log(err)
        })
    }
    render() {
        const{locations,mealtypes}=this.state;
        return (
            <div>
                <Wallpaper locationsdata={locations}/>
                <QuickSearch mealtypesData = {mealtypes} />


            </div>

        )
    }

}

export default Home;
