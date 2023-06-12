import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import { useEffect ,useState} from "react";

function AgeCalculator() {
  const [idRol, setIdRol] = useState("2");


   useEffect(() => {

    let si  = document.querySelector("#root > div.App > div.probarAge > div.rmdp-container > :nth-child(2) ");
    si.style.transform = "translate(-8.05664e-6px, 418.826px)";
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
