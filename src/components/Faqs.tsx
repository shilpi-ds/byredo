import { Link } from "@yext/pages/components";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
//import { svgIcons } from "../../svgIcon";
type Faq = {
  prop: any;
};

const Faq = (faqData: Faq) => {
  console.log(Faq);
  const [faq_Data, setFaq_Data] = useState([]);
  const [faqClass, setFaqClass] = useState("");
  const [leftFaqLen, setLeftFaqLen] = useState(0);
  const [rightFaqLen, setRightFaqLen] = useState(0);
  const [selected, setselected] = useState(null);
  const { t, i18n } = useTranslation();
  const isShowContent = (e: any, index: any) => {
    setselected(index);
    let parent = e.target.parentNode;
    let parent2 = e.target.parentNode.parentNode;

    if (
      parent.classList.contains("opened") ||
      parent2.classList.contains("opened")
    ) {
      setFaqClass("");
    } else {
      var acc = document.getElementsByClassName("faq-block");
      for (let s = 0; s < -1; s++) {
        acc[s].classList.remove("opened");
      }
      setFaqClass("opened");
    }
  };

  useEffect(() => {
    setFaq_Data(faqData.prop);
    let left = Math.round(faqData.prop.length / 2);
    let right = faqData.prop.length - left;
    setLeftFaqLen(left);
    setRightFaqLen(right);
  });

  return (
    <>
      <div className="faq-sec bg-light">
        <div className="container mx-auto">
          <div className="heading text-center">
            <h3 className="sec_heading">{t("Frequently Asked Questions")}</h3>
          </div>
          <div className="faq-blocks">
            {faq_Data.map((i: any, index: any) => {
              return (
                <div
                  id={index}
                  className={
                    selected == index ? `faq-block ${faqClass}` : "faq-block"
                  }
                  key={index}
                >
                  <h4
                    className="faq-title"
                    onClick={(e) => isShowContent(e, index)}
                  >
                    {i.question} <span className="faq-icon"></span>
                  </h4>
                  <>
                    <div className="faq-content">
                      <p>{i.answer}</p>
                    </div>
                  </>
                </div>
              );
            })}

            <div
              className="text-center mt-4"
              style={{ justifyContent: " center", width: "100%" }}
            >
              <Link
                className="button"
                href="#"
                rel="noopener noreferrer"
                eventName={`FaqReadMore`}
              >
                {" "}
                {t("Read more")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Faq;
