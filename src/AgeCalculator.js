import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import { useEffect } from "react";

function AgeCalculator() {

  useEffect(() => {

    let si  = document.querySelector("#root > div.App > div.probarAge > div.rmdp-container > :nth-child(2) ");
    si.style.transform = "translate(118.277px, 377.053px)";
    si.style.left = "auto";
    si.style.right = "auto";
    si.style.bottom = "0px";
  },[])

  
  


   return (
    <div className="probarAge" id="he">
      <DatePicker />
    
      
    </div>

  )

}

export default AgeCalculator;
