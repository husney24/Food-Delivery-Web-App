import React from 'react';
import "../Styles/Home.css";
import QuickSearchItems from './QuickSearchItems';

class QuickSearch extends React.Component{
    render(){
        const{mealtypesData}=this.props;
        return(
        
        <div className="container">
        <div className="s">Quick Searches</div>
        <div className="discover">Discover resturents by type of meals</div>
        
            <div className="row">
                {mealtypesData.map((item)=>{
                    return  <QuickSearchItems QuickSearchItemsData={item}/>
                })}
               
               
                {/*
               
                <div className="col-lg-4 col-sm-12 item">
                    <div className="image-left">
                        <img src="./Assets/drinks.png" alt="imagr" height="170px" width="150px"/>
                    </div>
                    <div className="right-img">
                        <div className="break">
                            drinks
                        </div>
                        <div className="le">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-12 item">               <div className="image-left">
                    <img src="./Assets/lunch.jpg" alt="imagr" height="170px" width="150px"/>
                </div>
                <div className="right-img">
                    <div className="break">
                        lunch
                    </div>
                    <div className="le">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                </div></div>
                <div className="col-lg-4 col-sm-12 item">               <div className="image-left">
                    <img src="./Assets/dinner.png" alt="imagr" height="170px" width="150px"/>
                </div>
                <div className="right-img">
                    <div className="break">
                        dinner
                    </div>
                    <div className="le">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                </div></div>
                <div className="col-lg-4 col-sm-12 item">               <div className="image-left">
                    <img src="./Assets/snacks.jpg" alt="imagr" height="170px" width="150px"/>
                </div>
                <div className="right-img">
                    <div className="break">
                        snacks
                    </div>
                    <div className="le">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                </div></div>
                <div className="col-lg-4 col-sm-12 item">               <div className="image-left">
                    <img src="./Assets/nightlife.png" alt="imagr" height="170px" width="150px"/>
                </div>
                <div className="right-img">
                    <div className="break">
                        nightlife
                    </div>
                    <div className="le">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                </div></div>
*/}

            
                </div>
    
            </div>

        )
    }
}

export default QuickSearch;