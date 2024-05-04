import React from 'react';
import '../Styles/Home.css';
import {withRouter} from 'react-router-dom';

class QuickSearchItems extends React.Component {
    handleNavigate = (mealtype_id) =>{
        const locationId = sessionStorage.getItem('locationId');
        if(locationId){
            this.props.history.push(`/filter?mealtype=${mealtype_id}&location=${locationId}`);
        }else{
            this.props.history.push(`/filter?mealtype=${mealtype_id}`);
        }
        
    }
    render() {
        const{QuickSearchItemsData}=this.props;
        return (
            
                <div className="col-lg-4 col-sm-12 item" onClick={()=>this.handleNavigate(QuickSearchItemsData.meal_type)}>
                    <div className="image-left">
                        <img src={`./${QuickSearchItemsData.image}`} alt="imagr" height="170px" width="150px" />
                    </div>
                    <div className="right-img">
                        <div className="break">
                           {QuickSearchItemsData.name}
                        </div>
                        <div className="le">
                           {QuickSearchItemsData.content}
                        </div>
                    </div>
                </div>
        
        )
    }
}
export default withRouter(QuickSearchItems);