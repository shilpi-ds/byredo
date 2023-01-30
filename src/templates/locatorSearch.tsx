import * as React from "react";
import "../index.css";
import { GetPath, Template, TemplateProps, TemplateRenderProps, TemplateConfig, GetHeadConfig,
  HeadConfig } from "@yext/pages";
import { SearchHeadlessProvider, useSearchActions } from "@yext/search-headless-react";
import Header from "../components/layouts/header";
import SearchLayout from "../components/locatorPage/SearchLayout";
import {  AnswerExperienceConfig  } from "../config/globalConfig";
import PageLayout from "../components/page-layout";
import HeaderBanner from "../components/commons/HeaderBanner";
import Footer from "../components/layouts/footer";
export const getPath: GetPath<TemplateProps> = () => {
  return `index.html`;
};

/*
export const config: TemplateConfig = {
  stream: {
    $id: "locatorSearch",
    localization: {
      locales: ["en"],
      primary: false,
    },
    filter: {},
    fields: []
  },
};
*/

export const config: TemplateConfig = {
  stream: {
    $id: "byredo-locator",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_bannerTitle",
      "c_bannerDescription",
      "c_bannerImage",
      "c_headerMenus",
      "c_byradoLogo",
      "c_footerHelpSection",
    "c_servicesFooter",
    "c_footerStoreLocator"
      //"PhotoGallery",
    ],
    filter: {
      entityIds: ["global-data"],
    },
    // Defines the scope of entities that qualify for this stream.
   // filter: {
     // entityTypes: ["location"],
  //  },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({relativePrefixToRoot, path, document}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: document.description,
        },
      },
    ],
  };
};

const locatorSearch: Template<TemplateRenderProps> = ({relativePrefixToRoot, path, document}) => {

const {
   _site,
   c_bannerTitle,
   c_bannerDescription,
   c_bannerImage,
   c_headerMenus,
   c_byradoLogo,
   c_footerHelpSection,
    c_servicesFooter,
    c_footerStoreLocator


} = document;

const providerOptions: google.maps.MapOptions = {
  disableDefaultUI: true
}

return (
    <>
   <Header ByredoLogo={_site.c_byradoLogo} ByredoLinks={_site.c_headerMenus}/>
        <HeaderBanner title={_site.c_bannerTitle} description={_site.c_bannerDescription} himage={_site.c_bannerImage.url} />
       
   
        <SearchHeadlessProvider
            experienceKey={AnswerExperienceConfig.experienceKey}
            locale={AnswerExperienceConfig.locale}
            apiKey={AnswerExperienceConfig.apiKey}               
            verticalKey={AnswerExperienceConfig.verticalKey}
            experienceVersion={AnswerExperienceConfig.experienceVersion}
            sessionTrackingEnabled={AnswerExperienceConfig.sessionTrackingEnabled}  
            endpoints={AnswerExperienceConfig.endpoints}         
        >
           <SearchLayout/>           
        </SearchHeadlessProvider>  
        <Footer ByredoHelp={_site.c_footerHelpSection} ByredoServices={_site.c_servicesFooter} ByredoLocator={_site.c_footerStoreLocator}/>
    </>
  );
};

export default locatorSearch;