import React from "react";
import { Link } from "react-router-dom";
import Easyheader from "./Easyheader";
import Adminpath from "./Adminpath";
import { useEffect, useState} from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

function Blog() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blog"));
        const documents = [];

        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        setData(documents);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between fixed w-full bg-white p-4 px-28 top-0">
        <div className="flex h-[20px] justify-center mt-3">
          <img
            src=" https://easybank-web.vercel.app/images/logo.svg"
            className=""
            alt=""
          />
        </div>

        <div className="flex gap-10 ">
          <Link to="/home">
            <button>
              <h1 className=" mt-[10px] text-lg text-slate-500 underline-offset-8 hover:underline decoration-4 decoration-green-400 ">
                Home
              </h1>
            </button>
          </Link>

          <button className=" text-lg text-slate-500 underline-offset-8 hover:underline decoration-4 decoration-green-400 ">
            {" "}
            <h1>About</h1>
          </button>

          <button className=" text-lg text-slate-500 underline-offset-8 hover:underline decoration-4 decoration-green-400 ">
            <h1>Contact</h1>
          </button>

          <Link to="/blog">
            <button className=" text-lg text-slate-500 underline-offset-8 hover:underline decoration-4 decoration-green-400  mt-3">
              <h1>Blog</h1>
            </button>
          </Link>

          <button className=" text-lg text-slate-500 underline-offset-8 hover:underline decoration-4 decoration-green-400  mt-1">
            <h1>Careers</h1>
          </button>
        </div>

        <div className="mr-20 ">
          <button className="text-md bg-gradient-to-r from-green-400 to-teal-400 h-12 w-48  object-right  rounded-full  text-white hover:brightness-105 ">
            Request Invite
          </button>
        </div>
      </div>
      <h1 className="ml-5 mt-40 text-4xl font-sans font-semibold text-left">
        Blog Page
      </h1>

      <div className="grid grid-cols-3 mr-9 ">
        {data.map((item) => (
          <div
            key={item.id} 
            className=" rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] ml-9 mt-14 p-5 capitalize"
          >
            <h1 className="text-2xl mt-4 font-bold ">{item.Title} </h1>
                  <p className=" mt-1  text-slate-500"> {item.Author}</p>
                 <h1 className="mt-5  uppercase text-xl font-semibold">{item.Heading}</h1>
                  <p className="text-lg mb-3 text-left line-clamp-3  mt-4" > {item.Blog}</p>
                  <img src={item.imgref} alt="" className=" h-[200px] w-full rounded-md" />
                  <Link
  to={{
    pathname: `/blog/${item.id}`,
    state: { blogData: item }
  }}
>
  <button className="p-2 rounded-full bg-gradient-to-r from-green-400 to-teal-400  mt-2 hover:brightness-105 text-white">
    Read More
  </button>
</Link>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
