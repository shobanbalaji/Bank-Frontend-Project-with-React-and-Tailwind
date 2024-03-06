import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { imgdb } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Adminpath() {
  const [update, setupdate] = useState(false);
  const [upload, setupload] = useState("");
  const [add, setadd] = useState(false);
  const [form, setform] = useState({
    Title: "",
    Author: "",
    Heading: "",
    Blog: "",
    imgref: "",
  });

  const [data, setData] = useState([]);
  const [editedItemId, setEditedItemId] = useState(null); // State for tracking the currently edited item's ID

  function handleclick() {
    setadd(!add);
    console.log("work");
  }

  async function handlesubmit(e) {
    e.preventDefault();

    try {
      // Upload the image to Firebase Storage
      const imgRef = ref(imgdb, `files/${form.imgref}`);
      await uploadBytes(imgRef, upload);
      const imgURL = await getDownloadURL(imgRef);
      const formDataWithImage = { ...form, imgref: imgURL };
        await addDoc(collection(db, "blog"), formDataWithImage);
        console.log("Data added to Firestore successfully!");

      // Clear the image upload state
      setupload(null);
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
    }

    // Clear the form fields
    setform({
      Title: "",
      Author: "",
      Heading: "",
      Blog: "",
      imgref: "",
    });
    setadd(false);
  }

  function handlechange(e) {
    const { name, value } = e.target;
    setform((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handledel(item) {
    console.log("delete function", item);
    await deleteDoc(doc(db, "blog", item));
  }

  // When the "edit" button is clicked, set the form state and editedItemId state
  function handleEdit(id) {
    
    const editedItem = data.find((item) => item.id === id);
    if (editedItem) {
      setform(editedItem);
      setEditedItemId(id);
      setupdate(true); // Set update mode
    }
  }

  // When the "update" button is clicked, update the corresponding Firestore document
  async function handleUpdate(e) {
    e.preventDefault();
  
    if (editedItemId) {
      try {
        // Upload the new image to Firebase Storage (if a new image was selected)
        if (upload) {
          const imgRef = ref(imgdb, `files/${form.imgref}`);
          await uploadBytes(imgRef, upload);
          const imgURL = await getDownloadURL(imgRef);
          form.imgref = imgURL; // Update the imgref field in the form
        }
  
        const updatedData = {
          Title: form.Title,
          Author: form.Author,
          Heading: form.Heading,
          Blog: form.Blog,
          imgref: form.imgref,
        };
  
        console.log("Updated Data:", updatedData);
  
        await updateDoc(doc(db, "blog", editedItemId), updatedData);
        console.log("Data updated in Firestore successfully!");
  
        // Clear the form fields and reset the state
        setform({
          Title: "",
          Author: "",
          Heading: "",
          Blog: "",
          imgref: "",
        });
        // Reset update mode
        setupdate(false);
      } catch (error) {
        console.error("Error updating data in Firestore:", error);
      }
    }
  }
  
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
    <div className=" h-screen">
      <div className="flex justify-between hover:bg-white bg-gradient-to-r from-green-400 to-teal-400  ">
        <h1 className="text-4xl font-sans font-bold  m-10 ">Admin Panel</h1>
        <button
          onClick={handleclick}
          className="rounded-full bg-white h-10 w-20 mr-7 hover:brightness-105 text-black mt-10"
        >
          +Add
        </button>
      </div>

      {add && (
        <div className="flex  justify-center z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white rounded-2xl mx-auto  mt-16  w-2/4 place-items-center p-4 bg ">
          <form onSubmit={handlesubmit}>
            <div className="mt-3 pt-4 pb-5 ">
              <h1 className="text-left font-sans font-bold  text-4xl mt-3  text-green-400">
                Blog
              </h1>
              <p className="capitalize text-left font-sans text-sm font-normal mb-10 pt-6">
                Make blogging easier and publish your blog all <br />
                in one place.!!
              </p>
            </div>

            <h1 className=" my-4 font-sans text-xl">Title</h1>
            <input
              name="Title"
              value={form.Title}
              onChange={(e) => handlechange(e)}
              className="border rounded  h-10 w-[600px] border-green-400 pl-4"
            />
            <h1 className="my-2 font-sans text-xl">Author</h1>
            <input
              name="Author"
              value={form.Author}
              onChange={(e) => handlechange(e)}
              className="border rounded  h-10 w-[600px] border-green-400 pl-4"
            />
            <h1 className="my-2 font-sans text-xl">Heading</h1>
            <input
              name="Heading"
              value={form.Heading}
              onChange={(e) => handlechange(e)}
              className="border rounded  h-10 w-[600px] border-green-400 pl-4"
            />

            <h1 className=" my-2 font-sans text-xl">Write a Blog</h1>

            <input
              type="text"
              name="Blog"
              value={form.Blog}
              onChange={(e) => handlechange(e)} 
              className="border rounded mb-3 h-20 w-[600px] p-4 border-green-400 pl-4"
            />   
            <h1  className=" my-2 font-sans text-xl"> upload image</h1>
            <input type="file" accept="image/*" onChange={(e)=>{ handlechange(e) ;setupload(e.target.files[0])}}   name="imgref"
              value={form.imgref}
              className="mb-3"/>
            <br /> 
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-green-400 to-teal-400 h-10 w-20 text-white ml-[250px]"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Content of admin blog */}
      <div>
        <h1 className="text-3xl font-sans font-bold ml-9 mt-16 ">Your Blogs</h1>
        <div>
          <div className="grid grid-cols-3 mr-9">
            {data.map((item) => (
              <div
                key={item.id}
                className="rounded-md  shadow-[0_8px_30px_rgb(0,0,0,0.12)] ml-9 mt-14 p-5  "
              >
                <h1 className="text-2xl mt-4 ml-5">{item.Title}</h1>
                <p className="ml-5 mt-1 text-slate-500 text-md"> {item.Author}</p>
                <h1 className="mt-5 ml-5 uppercase text-xl font-bold">
                  {item.Heading}
                </h1>
                <div>
                  <p className="text-lg ml-5 text-left line-clamp-2 mx-3 ">
                    {" "}
                    {item.Blog}
                  </p>
                  <img src={item.imgref} alt="" className=" h-[200px] w-full rounded-md "  />
                </div>

                <div className="flex justify-center my-3">
                  <button
                    className="bg-green-400 p-1 w-14 rounded-full hover:text-white mr-4"
                    onClick={() => handledel(item.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="bg-red-400 p-1 w-14 rounded-full hover:text-white"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {update && (
          <div className="flex  justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white rounded-2xl mx-auto  mt-16  w-2/4 place-items-center p-4 bg ">
            <form onSubmit={handleUpdate}>
              <div className="mt-3 pt-4 pb-5 ">
                <h1 className="text-left font-sans font-bold  text-4xl mt-3  text-green-400">
                  Blog
                </h1>
                <p className="capitalize text-left font-sans text-sm font-normal mb-10 pt-6">
                  Make blogging easier and publish your blog all <br />
                  in one place.!!
                </p>
              </div>

              <h1 className=" my-4 font-sans text-xl">Title</h1>
              <input
                name="Title"
                value={form.Title}
                onChange={(e) => handlechange(e)}
                className="border rounded  h-10 w-[600px] border-green-400 pl-4"
              />
              <h1 className="my-2 font-sans text-xl">Author</h1>
              <input
                name="Author"
                value={form.Author}
                onChange={(e) => handlechange(e)}
                className="border rounded  h-10 w-[600px] border-green-400 pl-4"
              />
              <h1 className="my-2 font-sans text-xl">Heading</h1>
              <input
                name="Heading"
                value={form.Heading}
                onChange={(e) => handlechange(e)}
                className="border rounded  h-10 w-[600px] border-green-400 pl-4"
              />

              <h1 className=" my-2 font-sans text-xl">Write a Blog</h1>

              <input
                type="text"
                name="Blog"
                value={form.Blog}
                onChange={(e) => handlechange(e)} 
                className="border rounded mb-3 h-20 w-[600px] p-4 border-green-400 pl-4"
              />   
              <h1  className=" my-2 font-sans text-xl"> upload image</h1>
              <input type="file" accept="image/*" onChange={(e)=>{ handlechange(e) ;setupload(e.target.files[0])}}   name="imgref"
             
              
                className="mb-3"/>
              <br /> 
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-green-400 to-teal-400 h-10 w-20 text-white ml-[230px]"
              >
                Update
              </button>
              <button onClick={()=>setupdate(!update)}
                className="rounded-full bg-gradient-to-r from-green-400 to-teal-400 h-10 w-20 text-white  ml-10"
              >
                close
              </button>
            </form>
          </div> 
        )}
      </div>
    </div>
  );
}

export default Adminpath;
