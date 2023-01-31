/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps
} from "@yext/pages";
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import Banner from "../components/banner";
import Details from "../components/details";
import Hours from "../components/hours";
import List from "../components/list";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import BreadCrumbs from "../components/layouts/BreadCrumbs";
import StaticMap from "../components/static-map";
import Accordion from "../components/Accordion";
import HeaderBanner from "../components/commons/HeaderBanner";
import GetDirection from "../components/GetDirection";
import PhotoSlider from "../components/locationDetails/PhotoSlider";
import OpenCloseStatus from "../components/commons/OpenCloseStatus";
import watch from "../images/watch.svg";
import phone from "../images/phone.svg";
import Address from "../components/commons/Address";
import addressicon from "../images/marker.svg";
import Faqs from "../components/locationDetails/Faqs";
import { nearByLocation } from "../types/nearByLocation";
import NearByLocations from "../components/locationDetails/NearByLocations";
//import { accordionData } from './utils/content';
import "../index.css";
import {
  slugify,
  radius,
  baseApiUrl,
  liveAPIKey,
  savedFilterId,
  entityTypes,
} from "../types/constants";

import { useSearchState } from "@yext/search-headless-react";
//import PhotoGallery from "../components/photo-gallery";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "byredo",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "photoGallery",
      "geocodedCoordinate",
      "services",
      "c_relatedFaqs.question",
      "c_relatedFaqs.answer",
      "c_title",
      "c_image",
      "c_bannerTitle",
      "c_bannerDescription",
      "c_bannerImage",
      "c_headerMenus",
      "c_byradoLogo",
      "c_footerHelpSection",
    "c_servicesFooter",
    "c_footerStoreLocator",
      "timezone",
        "additionalHoursText",
      
      
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : document.id.toString();
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: 'icon',
          type: 'image/x-icon',
          //href: Favicon
        },
      }
    ],
  };
};



/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */




const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  externalApiData,

  path,
  document,
}) => {
  const {
    _site,
    id,
    name,
    address,
    openTime,
    hours,
    photoGallery,
    mainPhone,
    geocodedCoordinate,
    services,
    description,
    c_bannerTitle,
    c_bannerDescription,
    c_bannerImage,
    c_headerMenus,
    c_byradoLogo,
    c_footerHelpSection,
    c_servicesFooter,
    c_footerStoreLocator,
    c_relatedFaqs,
    c_title,
    c_image,
    timezone,
    additionalHoursText,
   
       
        //photoGallery,
  } = document;


  const [timeStatus, setTimeStatus] = useState("");
  const onOpenHide = () => {
    if (timeStatus == "") {
      setTimeStatus("active");
    } else {
      setTimeStatus("");
    }
  }

  return (
    <>
      <Header ByredoLogo={_site.c_byradoLogo} ByredoLinks={_site.c_headerMenus}/>
        <HeaderBanner title={_site.c_bannerTitle} description={_site.c_bannerDescription} himage={_site.c_bannerImage.url} />
       <div className="container-section">
      <div className="containers">
      <div className="store-info">
              <Address address={address} />
                <div className="icon-row ">
            {" "}
            <span className="icon">
              <img src={phone} />
            </span>
      <h4><a href={`tel:${mainPhone}`}>{mainPhone}</a></h4></div>
      <div className="open-close notHighlight">
          <div className="hours-sec ">
            <div className="OpenCloseStatus notHighlight ">
              {hours ? (
                <>
                  {Object.keys(hours).length > 1 ? (
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
                      key={id}
                      hours={hours} additionalHoursText={additionalHoursText}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div></div>{" "}
          <GetDirection buttonText="Get Direction" address={address} latitude={geocodedCoordinate?.latitude} longitude={geocodedCoordinate?.longitude} label="Get direction"/>
  
        </div>
        <div className="store-hours">
                {hours && <Hours title={"Restaurant Hours"} hours={hours} />}
              </div>
              <div className="static-map">
              {geocodedCoordinate && (
                <StaticMap
                  latitude={geocodedCoordinate.latitude}
                  longitude={geocodedCoordinate.longitude}
                ></StaticMap>
              )}
       </div>
        </div>
        <div className="about-content">
                <div className="about-image"><img src={c_image.url} height={500} width={500}/></div>
                <div className="about-data">
                <div className="about-title">{c_title}</div>
                <p className="about-description">{description}</p>
                </div>
              </div>
              <div className="featured">
              <h2>Featured Products</h2>
              <div className="photo-slider">{photoGallery && <PhotoSlider photoGallery={photoGallery}/> }</div>
      </div>
      <div className="faq-content">
        <div className="faq-title">How can we help ?</div>
        <div className="faqs"><section className="faq-container">{c_relatedFaqs && <Accordion content={c_relatedFaqs}/> }</section></div>
        </div>
        
      </div>
      <Footer ByredoHelp={_site.c_footerHelpSection} ByredoServices={_site.c_servicesFooter} ByredoLocator={_site.c_footerStoreLocator}/>
    </>
  );
};

export default Location;
