import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function Readmore() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogDocRef = doc(db, "blog", id); 
        const blogDocSnapshot = await getDoc(blogDocRef);

        if (blogDocSnapshot.exists()) {
          setBlogData(blogDocSnapshot.data());
        } 
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [id]);

  if (!blogData) {
    // Handle the case where blogData is not available yet (loading state)
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* header */}
      <div className="p-5 bg-orange-300 flex justify-between"> 
      <h1 className="font-sans text-lg capitalize text-[20px] text-white font-bold">full blog</h1>
     
      </div>
      
      
      <div className="flex  w-full  bg-black">
      {/* total body content */}
     <div className="mt-10 ml-24 w-1/3 "> 
     {/* image */}
     <img src={blogData.imgref} alt="" className=" h-[850px]  rounded-md" />
      </div>
      {/* content */}
      <div className="ml-20 mt-7 w-1/2 text-white ">
      <h1 className="font-sans text-[30px] capitalize font-bold">{blogData.Title}</h1>
      <p className="text-md text-slate-500  capitalize ">{blogData.Author}</p>
      <h2 className=" mt-12 font-sans capitalize font-semibold text-[30px]">{blogData.Heading}</h2>
     
      <p className="text-lg mt-4 text-justify">{blogData.Blog}</p>
      </div>
      </div>
     
     
    </div>
  );
}

export default Readmore;
