import React, { useState, useEffect } from "react";
import style from "./PropertySearchPage.module.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Card from "../components/card/Card";
import axios from 'axios';

const MIN = 100;

const MAX = 5000;

const PropertySearchPage = () => {
  const [properties, setProperties] = useState([]);
  const [address, setAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [values, setValues] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/properties")
      .then((response) => {
        setProperties(response.data);
        console.log("Retrieved properties:", response.data);
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const filteredResults = filterProperties(properties, address, suburb);

    setSearchResults(filteredResults);
  };

  const filterProperties = (properties, address, suburb) => {
    return properties.filter((property) => {
      const propertyAddress = property.Address || "";

      const propertySuburb = property.Suburb || "";

      return (
        propertyAddress.toLowerCase().includes(address.toLowerCase()) &&
        propertySuburb.toLowerCase().includes(suburb.toLowerCase())
      );
    });
  };

  const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value);

    setValues([MIN, newValue]);
  };

  return (
    <div className={style.TheMain_page}>
      <div>
        <Header />
      </div>

      <div className={style.main_container}>
        <div className={style.main_container_inner}>
          <div className={style.main_container_left}>
            <img
              src="./images/hero-img.png"
              alt="house"
              width="600"
              height="400"
            />
          </div>

          <div className={style.main_container_right}>
            <h4>Some...breadcrumbs...here</h4>

            <span className={style.right_div_Auckland}>Auckland</span>

            <button className={style.contactOffice_button}>
              Contact Office
            </button>
          </div>
        </div>
      </div>

      <div className={style.mainDiv}>
        <div className={style.card_main_container}>
          <div className={style.container_left}>
            <div className={style.card_inputDiv}>
              <div className={style.card_input_select_region}>
                <form onSubmit={handleSearchSubmit}>
                  <span>Select address...</span>

                  <br />

                  <input
                    type="text"
                    placeholder="EG: Street Name"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />

                  <div className={style.card_input_select_suburb}>
                    <span>Select suburb...</span>

                    <br />

                    <input
                      type="text"
                      placeholder="EG: Browns Bay"
                      value={suburb}
                      onChange={(event) => setSuburb(event.target.value)}
                    />
                  </div>

                  <button type="submit">Search</button>
                </form>
              </div>

              <div className={style.button_container}>
                <button className={style.search_buttons}>Price</button>

                <button className={style.search_buttons}>Bed</button>

                <button className={style.search_buttons}>Bath</button>

                <button className={style.search_buttons}>Pets Allowed</button>
              </div>
            </div>
          </div>

          <div className={style.container_right}>
            <div className={style.button_right_cluster}>
              <button className={style.search_buttons}>Search Map</button>

              <button className={style.search_buttons}>Popular</button>

              <button className={style.search_buttons}>Save Search</button>

              <button className={style.search_buttons}>Random</button>
            </div>
          </div>
        </div>

        <div className={style.popUpmainDiv}>
          <div className={style.popUpcontainer}>
            <div className={style.popUpcontainer_left}>
              <div className={style.popUpsliderDiv}>
                <div className={style.slider_div_main}>
                  {/* SLIDER DIV */}

                  <div className={style.SLIDERmainDiv}>
                    <div className={style.SLIDERsliderMain}>
                      <h3>
                        Price <span>Range</span>
                      </h3>

                      <div className={style.SLIDERslider_value}>
                        $100.00 - $5000.00
                      </div>

                      <small>Current Range: ${values[1]}.00</small>

                      <input
                        type="range"
                        className={style.SLIDERtheslider}
                        onChange={handleSliderChange}
                        value={values[1]}
                        min={MIN}
                        max={MAX}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={style.popUpsliderDiv_buttons}>
                <button className={style.popUpsliderDiv_button_ONE}>
                  CLEAR
                </button>

                <button className={style.popUpsliderDiv_button_TWO}>
                  APPLY
                </button>
              </div>
            </div>

            <div className={style.popUpcontainer_right}>
              <img
                className={style.popUpfeaturedImage}
                src="./images/featured-apartment.jpg"
                alt="featured apartment"
                width="220"
                height="188"
              />

              <span className={style.popUpfeaturedLocation}>
                <span>Featured property in:</span>

                <br />

                <br />

                <span className={style.popUpfeaturedLocation_city}>
                  Auckland
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={style.card_display_container}>
        {searchResults.map((property) => (
          <Card key={property.id} data={property} />
        ))}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PropertySearchPage;
