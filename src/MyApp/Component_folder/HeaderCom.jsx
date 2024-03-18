import React, { useState, useEffect } from "react";

const myTS = new Date().getTime() / 1000;

function extractTimeIn12hr(timestamp) {
    const newTimeStamp = timestamp * 1000;  //in milliseconds
    const dateFromTimestamp = new Date(newTimeStamp);

    const meridianTimeString = dateFromTimestamp.toLocaleTimeString('en-us');
    return meridianTimeString;
}

const HeaderCom = () => {

    const [api, setApi] = useState({});                                 // for api object
    const [newIcon, setNewIcon] = useState({});                         // for icon object
    const [city, setCity] = useState("New Delhi");                      // for city
    const [input, setInput] = useState("");                             // for input field
    const [currTime, setCurrTime] = useState(extractTimeIn12hr(myTS));  // for time state

    setInterval(
        () => {
            const tempTS = new Date().getTime() / 1000;
            const myNewTime = extractTimeIn12hr(tempTS);
            setCurrTime(myNewTime);
        }, 1000
    );

    useEffect(() => {
        async function getMyNewLocation(lat, lon) {

            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=a7552f7021bdee6a6923ab1d0889fb1b`
            let res = await fetch(url);
            let myDataLoc = await res.json();

            const { temp, humidity, pressure } = myDataLoc.main;
            const { main, description, icon } = myDataLoc.weather[0];
            const { name } = myDataLoc;
            const { speed } = myDataLoc.wind;
            const { country, sunrise, sunset } = myDataLoc.sys;

            const tempFl = Math.floor(temp);
            const speedkmh = Math.floor(speed * (18 / 5));
            const sunRise = extractTimeIn12hr(sunrise);
            const sunSet = extractTimeIn12hr(sunset);

            setApi((preValue) => {
                return { ...preValue, tempFl, humidity, pressure, main, description, icon, name, speedkmh, country, sunRise, sunSet }
            })

            if (icon === "01d" || icon === "01n") {
                setNewIcon({
                    des: description,
                    icons: "fa-solid fa-sun "
                })
            }
            else if (icon === "02d" || icon === "02n") {
                setNewIcon({
                    des: description,
                    icons: "fa-solid fa-cloud-sun "
                })
            }
            else if (icon === "03d" || icon === "03n") {
                setNewIcon({
                    des: description,
                    icons: "fa-solid fa-cloud fa-fade"
                })
            }
            else if (icon === "04d" || icon === "04n") {
                setNewIcon({
                    des: description,
                    icons: "fa-solid fa-cloud "
                })
            }
            else if (icon === "09d" || icon === "09n") {
                setNewIcon({
                    des: description,
                    icons: "fa-solid fa-cloud-showers-heavy "
                })
            }
            else if (icon === "10d" || icon === "10n") {
                setNewIcon({
                    des: description,
                    icons: "fa-solid fa-cloud-sun-rain "
                })
            }
            else if (icon === "11d" || icon === "11n") {
                setNewIcon({
                    des: description,
                    icons: "fa-solid fa-cloud-bolt"
                })
            }
            else if (icon === "13d" || icon === "13n") {
                setNewIcon({
                    des: description,
                    icons: "fa-solid fa-snowflake "
                })
            }
            else if (icon === "50d" || icon === "50n") {
                setNewIcon({
                    des: description,
                    icons: "fa-solid fa-align-center "
                })
            }

        }

        async function sucessResult(position) {
            await getMyNewLocation(position.coords.latitude, position.coords.longitude);
        }

        function failedResult(error) {
            alert(error.message);
        }

        navigator.geolocation.getCurrentPosition(sucessResult, failedResult);

    }, [])

    useEffect(() => {
        const ApiData = async () => {
            try {

                let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a7552f7021bdee6a6923ab1d0889fb1b`;
                const res = await fetch(url);
                const myData = await res.json();

                // console.log(myData);

                const { temp, humidity, pressure } = myData.main;
                const { main, description, icon } = myData.weather[0];
                const { name } = myData;
                const { speed } = myData.wind;
                const { country, sunrise, sunset } = myData.sys;

                const tempFl = Math.floor(temp);
                const speedkmh = Math.floor(speed * (18 / 5));
                const sunRise = extractTimeIn12hr(sunrise);
                const sunSet = extractTimeIn12hr(sunset);

                setApi((preValue) => {
                    return { ...preValue, tempFl, humidity, pressure, main, description, icon, name, speedkmh, country, sunRise, sunSet }
                })

                if (icon === "01d" || icon === "01n") {
                    setNewIcon({
                        des: description,
                        icons: "fa-solid fa-sun "
                    })
                }
                else if (icon === "02d" || icon === "02n") {
                    setNewIcon({
                        des: description,
                        icons: "fa-solid fa-cloud-sun "
                    })
                }
                else if (icon === "03d" || icon === "03n") {
                    setNewIcon({
                        des: description,
                        icons: "fa-solid fa-cloud fa-fade"
                    })
                }
                else if (icon === "04d" || icon === "04n") {
                    setNewIcon({
                        des: description,
                        icons: "fa-solid fa-cloud "
                    })
                }
                else if (icon === "09d" || icon === "09n") {
                    setNewIcon({
                        des: description,
                        icons: "fa-solid fa-cloud-showers-heavy "
                    })
                }
                else if (icon === "10d" || icon === "10n") {
                    setNewIcon({
                        des: description,
                        icons: "fa-solid fa-cloud-sun-rain "
                    })
                }
                else if (icon === "11d" || icon === "11n") {
                    setNewIcon({
                        des: description,
                        icons: "fa-solid fa-cloud-bolt"
                    })
                }
                else if (icon === "13d" || icon === "13n") {
                    setNewIcon({
                        des: description,
                        icons: "fa-solid fa-snowflake "
                    })
                }
                else if (icon === "50d" || icon === "50n") {
                    setNewIcon({
                        des: description,
                        icons: "fa-solid fa-align-center "
                    })
                }

            }
            catch (error) {
                console.log(error);
            }
        };
        ApiData();
    }, [city]);

    const eventsItem = (e) => {
        setInput(e.target.value);
    };

    const searchItem = () => {
        if (!input) {
            alert("Search Valid city");
        }
        else {
            setCity(input);
            setInput("");
        }


        console.log("api :", api)
        // console.log("newIcon :", newIcon)
        // console.log("city :", city)
        // console.log("input :", input)
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            searchItem();
        }
    }



    const { tempFl, humidity, pressure, name, speedkmh, country, sunRise, sunSet } = api;
    const { icons, des } = newIcon;

    return (

        <>
            <section className="main-section">
                <div className="container ">

                    <div className="row ps-2 pe-2 d-flex flex-column justify-content-center align-items-center">
                        <div className="col-10 col-md-8 col-lg-6">
                            <div className="center-div ">
                                <div className="container">

                                    <div className="container">
                                        <div className="row dis-flx">
                                            <div className="col-10 col-md-8 col-lg-6 mt-5">
                                                <div className="d-flex for-input-div">
                                                    <input className=" for-input-field" type="search" placeholder="Search" aria-label="Search" onKeyUp={handleKeyPress} onChange={eventsItem} value={input} />
                                                    <button className="btn  for-input-button" title="search" type="submit" onClick={searchItem}><i className="fa-solid fa-magnifying-glass"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col-6 mt-5 dis-flx">
                                                <div className="for-icons bg-color">
                                                    <h2><i className={icons}></i></h2>
                                                    <p>{des}</p>
                                                </div>
                                            </div>
                                            <div className="col-6 mt-5 dis-flx">
                                                <div className="for-city bg-color">
                                                    <h2>{tempFl}<span>℃</span></h2>
                                                    <p> {name},{country}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col-6 mt-5">
                                                <div className="bg-color">
                                                    <div className="text-center p-2">
                                                        <h3>Sunrise</h3>
                                                        <p className="m-0">{sunRise}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6 mt-5">
                                                <div className="bg-color">
                                                    <div className="text-center">
                                                        <h3>Sunset</h3>
                                                        <p className="m-0">{sunSet}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12 mt-5">
                                                <div className="bg-color for-Time">
                                                    <h2 className="text-center">Current Time</h2>
                                                    <p className="text-center m-0">{currTime}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row mb-5 d-flex flex-wrap">
                                            <div className="col-6 mt-5">
                                                <div className=" bg-color p-4 p-lg-0">
                                                    <div className="row for-box-data">
                                                        <div className="col-3 displ-flx">
                                                            <i className="fa-solid fa-wind"></i>
                                                        </div>
                                                        <div className="col-9">
                                                            <h2>Speed</h2>
                                                            <p>{speedkmh} km/h</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 mt-5">
                                                <div className=" bg-color p-4 p-lg-0">
                                                    <div className="row for-box-data">
                                                        <div className="col-3 displ-flx">
                                                            <i className="fa-solid fa-gauge"></i>
                                                        </div>
                                                        <div className="col-9">
                                                            <h2>Pressure</h2>
                                                            <p>{pressure} hPa</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 mt-5 mb-5">
                                                <div className=" bg-color p-4 p-lg-0">
                                                    <div className="row for-box-data">
                                                        <div className="col-3 displ-flx">
                                                            <i className="fa-solid fa-droplet"></i>
                                                        </div>
                                                        <div className="col-9">
                                                            <h2>Humidity</h2>
                                                            <p>{humidity} %</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default HeaderCom;