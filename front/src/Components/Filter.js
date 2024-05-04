import React from "react";
import queryString from "query-string";
import axios from "axios";
import ReactPaginate from "react-paginate";

import "../Styles/Filter.css";

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      locations: [],

      mealtype: undefined,
      location: undefined,
      cuisine: [],
      lcost: undefined,
      hcost: undefined,
      page: 1,
      pageCount: Number,
      sort: 1,
    };
  }
  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    const { mealtype, location } = qs;
    const filterObj = {
      mealtype: mealtype,
      location: location,
    };

    axios({
      url: "http://localhost:8989/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((res) => {
        this.setState({
          restaurants: res.data.restaurants,
          mealtype: mealtype,
          location,
          pageCount: res.data.Data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      url: "http://localhost:8989/locations",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        this.setState({ locations: res.data.locations });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleSorting = (sort) => {
    const { mealtype, location, cuisine, lcost, hcost, page } = this.state;
    const filterObj = {
      mealtype: mealtype,
      location: location,
      cuisine: cuisine.length > 0 ? cuisine : undefined,
      lcost,
      hcost,
      sort: sort,
      page,
    };

    axios({
      url: "http://localhost:8989/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((res) => {
        this.setState({
          restaurants: res.data.restaurants,
          sort,
          pageCount: res.data.Data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleCost = (lcost, hcost) => {
    const { mealtype, location, cuisine, sort, page } = this.state;
    const filterObj = {
      mealtype: mealtype,
      location: location,
      cuisine: cuisine.length > 0 ? cuisine : undefined,
      lcost: lcost,
      hcost: hcost,
      sort: sort,
      page,
    };
    axios({
      url: "http://localhost:8989/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((res) => {
        this.setState({
          restaurants: res.data.restaurants,
          lcost,
          hcost,
          pageCount: res.data.Data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleCuisine = (cuisineId) => {
    const { mealtype, location, page, cuisine, sort, lcost, hcost } =
      this.state;

    const index = cuisine.indexOf(cuisineId);
    if (index >= 0) {
      cuisine.splice(index, 1);
    } else {
      cuisine.push(cuisineId);
    }
    const filterObj = {
      mealtype: mealtype,
      location: location,
      cuisine: cuisine.length > 0 ? cuisine : undefined,

      lcost,
      hcost,
      page,
      sort,
    };

    axios({
      url: "http://localhost:8989/filter",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: filterObj,
    })
      .then((res) => {
        this.setState({
          restaurants: res.data.restaurants,

          cuisine,
          pageCount: res.data.Data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleLocatiomChange = (event) => {
    const location = event.target.value;
    const { mealtype, cuisine, lcost, hcost, sort, page } = this.state;
    const filterObj = {
      mealtype: mealtype,
      location: location,
      cuisine: cuisine.length > 0 ? cuisine : undefined,
      lcost: lcost,
      hcost: hcost,
      sort: sort,
      page,
    };
    axios({
      url: "http://localhost:8989/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((res) => {
        this.setState({
          restaurants: res.data.restaurants,
          location,
          pageCount: res.data.Data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handlePageClick = (data) => {
    const pageNo = data.selected + 1;
    const { mealtype, lcost, hcost, cuisine, sort, location } = this.state;
    const filterObj = {
      mealtype: mealtype,
      location: location,
      cuisine: cuisine.length > 0 ? cuisine : undefined,
      lcost: lcost,
      hcost: hcost,
      sort: sort,
      page: pageNo,
    };
    axios({
      url: "http://localhost:8989/filter",
      method: "POST",
      headers: { "content-Type": "application/json" },
      data: filterObj,
    })
      .then((res) => {
        this.setState({ restaurants: res.data.restaurants });
      })
      .catch((err) => console.log(err));
  };

  handleRestaurants = (resId) => {
    this.props.history.push(`/details?restaurants=${resId}`);
  };

  render() {
    const { restaurants, locations, pageCount } = this.state;

    return (
      <div>
        <div className="container">
          <div className="con">Breakfast places in Mumbai</div>
          <div className="row">
            <div className="col-sm-12 col-md-3 col-lg-3 filter-options">
              <div className="a">
                Filters
                <span
                  className="glyphicon glyphicon-chevron-down toggle-span ram"
                  data-toggle="collapse"
                  data-target="#filter"
                ></span>
              </div>
              <div id="filter" className="collapse show">
                <div className="a1">Select Location</div>
                <select
                  name=""
                  id=""
                  className="b"
                  onChange={this.handleLocatiomChange}
                >
                  <option value="">Select Location</option>
                  {locations.map((item) => {
                    return (
                      <option
                        value={item.location_id}
                      >{`${item.name},${item.city}`}</option>
                    );
                  })}
                </select>
                <div className="c">cuisine</div>
                <div className="d">
                  <input
                    type="checkbox"
                    name="ni"
                    onChange={() => this.handleCuisine(1)}
                  />
                  <label for="ni">North Indian</label>
                </div>
                <div className="d">
                  <input
                    type="checkbox"
                    name="ni"
                    onChange={() => this.handleCuisine(2)}
                  />
                  <label for="ni">South Indian</label>
                </div>
                <div className="d">
                  <input
                    type="checkbox"
                    name="ni"
                    onChange={() => this.handleCuisine(3)}
                  />
                  <label for="ni">Chinease</label>
                </div>
                <div className="d">
                  <input
                    type="checkbox"
                    name="ni"
                    onChange={() => this.handleCuisine(4)}
                  />
                  <label for="ni">Fast Food</label>
                </div>
                <div className="d">
                  <input
                    type="checkbox"
                    name="ni"
                    onChange={() => this.handleCuisine(5)}
                  />
                  <label for="ni">Street Food</label>
                </div>
                <div className="e">Cost for Two</div>
                <div className="f">
                  <input
                    type="radio"
                    name="one"
                    onChange={() => this.handleCost(1, 500)}
                  />
                  <label for="" className="d">
                    less than 500
                  </label>
                </div>
                <div className="f">
                  <input
                    type="radio"
                    name="one"
                    onChange={() => this.handleCost(500, 999)}
                  />
                  <label for="">500-999</label>
                </div>
                <div className="f">
                  <input
                    type="radio"
                    name="one"
                    onChange={() => this.handleCost(1000, 1499)}
                  />
                  <label for="">1000-1499</label>
                </div>
                <div className="f">
                  <input
                    type="radio"
                    name="one"
                    onChange={() => this.handleCost(1500, 2499)}
                  />
                  <label for="">1500-2499</label>
                </div>
                <div className="f">
                  <input
                    type="radio"
                    name="one"
                    onChange={() => this.handleCost(2500, 22499)}
                  />
                  <label for="">2500+</label>
                </div>
                <div className="g">Sort</div>
                <div className="h">
                  <input
                    type="radio"
                    name="two"
                    onChange={() => this.handleSorting(1)}
                  />
                  <label for="">price low to high</label>
                </div>
                <div className="h">
                  <input
                    type="radio"
                    name="two"
                    onChange={() => this.handleSorting(-1)}
                  />
                  <label for="">price high to low</label>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-9 col-lg-9">
              {restaurants.length != 0 ? (
                restaurants.map((item) => {
                  return (
                    <div
                      className="right-top"
                      onClick={() => this.handleRestaurants(item._id)}
                    >
                      <div className="right-left">
                        <img
                          src="./Assets/lunch.jpg"
                          alt="image"
                          height="120px"
                          width="100px"
                        />
                      </div>
                      <div className="right-right">
                        <div className="i">{item.name}</div>
                        <div className="j">{item.locality}</div>
                        <div className="k">{item.city}</div>
                      </div>
                      <hr />
                      <div className="right-top-low">
                        <div className="l">
                          <div className="m">Cuisins:</div>
                          <div className="n">cost for two:</div>
                        </div>
                        <div className="o">
                          <div className="p">
                            {item.cuisine.map((cuisine) => `${cuisine.name}, `)}
                          </div>
                          <div className="q">&#8377;{item.min_price}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-res"> No Results Found</div>
              )}

              {restaurants.length > 0 && pageCount > 1 ? (
                <ReactPaginate
                  previousLabel={"pre"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
