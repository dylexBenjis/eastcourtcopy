'use client'

import { useEffect } from "react";
import Aos from "aos";


const Post_property_intro=()=>{
    useEffect(() => {
        Aos.init({
          easing: "ease-in-sine",
          duration: 200,
        });
      }, []);
    return(
        <div       data-aos="zoom-in" data-aos-once="true" data-aos-duration="500"
        data-aos-easing="ease-in-sine">
                landlord or agent
        </div>
    )
}