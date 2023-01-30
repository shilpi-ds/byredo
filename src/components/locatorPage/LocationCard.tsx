import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "..//../types/search/locations";
import Hours from '..//../components/commons/hours';
import Address from "..//../components/commons/Address";
import addressicon from "../../images/marker.svg";
import phone from "../../images/phone.svg";
import watch from "../../images/watch.svg";
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';
import OpenCloseStatus from "..//../components/commons/OpenCloseStatus";
import Today from "../Today";
import GetDirection from "../GetDirection";
import UseMyLocation from "./UseMyLocation";
const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};

const LocationCard: CardComponent<Location> = ({ result }) => {
  console.log(result);
  const { address, hours, mainPhone, timezone, additionalHoursText, } = result.rawData;
  const formattedPhone = formatPhoneNumber(mainPhone);

  const [timeStatus, setTimeStatus] = useState("");
  const onOpenHide = () => {
    if (timeStatus == "") {
      setTimeStatus("active");
    } else {
      setTimeStatus("");
    }
  }

  return (
    <div className={`location result`} id={`result-${result.index}`}>
     
     <div className="relative w-full">
      <h3 className=""><a href={result.rawData.slug}>{result.rawData.name} </a>
      </h3>
      <div className="miles">
          <span className="icon">
            <img src={addressicon} alt="" />
          </span>{" "}
          {metersToMiles(result.distance ?? 0)} mi
        </div>
      </div>

      {/* <p className="text-sm text-slate-700">{address.line1}</p>
      <p className="text-sm text-slate-700">{address.city}, {address.region}, {address.postalCode} </p> */}
      <Address address={address} />
      <div className="icon-row ">
            {" "}
            <span className="icon">
              <img src={phone} />
            </span>
      <h4><a href={`tel:${result.rawData.mainPhone}`}>{result.rawData.mainPhone}</a></h4></div>
      <div className="open-close notHighlight">
          <div className="hours-sec ">
            <div className="OpenCloseStatus notHighlight ">
              {result.rawData.hours ? (
                <>
                  {Object.keys(result.rawData.hours).length > 1 ? (
                    <>
                      <div className="hours-labels icon-row">
                        <span className="icon">
                        <img src={watch}></img>
                        </span>
                        <a
                          className={timeStatus}
                          href="javascript:void(0);"
                          onClick={onOpenHide}
                        >
                          <OpenCloseStatus
                            timezone={timezone}
                            hours={hours}
                          ></OpenCloseStatus>
                        </a>
                        <svg
                          onClick={onOpenHide}
                          icon-row
                          xmlns="http://www.w3.org/2000/svg"
                          width="9.585"
                          height="4.793"
                          viewBox="0 0 9.585 4.793"
                        >
                          <path
                            id="hrd-drop"
                            d="M9,13.5l4.793,4.793L18.585,13.5Z"
                            transform="translate(-9 -13.5)"
                            fill="#00363f"
                          ></path>
                        </svg>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
              {hours ? (
                <>
                  <div className={timeStatus + " daylist"}>
                    <Hours
                      key={result.rawData.id}
                      hours={hours}
                      additionalHoursText={additionalHoursText}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>{" "}
        </div>
      
      <GetDirection buttonText="Get Direction" address={address} latitude={result.rawData?.cityCoordinate?.latitude} longitude={result.rawData?.cityCoordinate?.longitude} label="Get direction"/>
    </div >
  );
}

export default LocationCard;