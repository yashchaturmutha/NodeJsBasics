import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App2() {
  const [listOfVideos, setListOfVideos] = useState([]);
  const [name, setName] = useState("");
  const [myvideo, setmyvideo] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/uploadVideo").then((response) => {
      console.log(response);
      setListOfVideos(response.data);
    });
  }, []);

  const createUser = (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('myvideo', selectedVideo);
    formData.append('name', name);
    console.log(formData);
    console.log(formData.file);

    axios.post(
        "http://localhost:5000/uploadVideo",
        formData,
        {
        headers: {
        "Content-Type": "multipart/form-data",
        }}).then((response) => {
        console.log(response.data.myvideo);
        setmyvideo(response.data.myvideo);
        // console.log(response.data.name);

        setListOfVideos([
        ...listOfVideos,
        {
        myvideo,
          name
        },
      ]);
    }).catch((err)=>console.log(err));
  };

  return (
    <div className="App">

        <label htmlFor="myvideo">Choose Video</label>

        <input id="files" type="file" name="myvideo" accept="video/mp4,video/x-m4v,video/*" onChange={(e)=>{
          setSelectedVideo(e.target.files[0]);
          console.log(e.target.files[0]);
          }}/>

        <input type="text" placeholder="name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>

        <button onClick={createUser}> Create User </button>

        <br />

        <div style={{display:'flex' ,flexDirection: 'column'}}>
        {listOfVideos.map((item,i)=>{

             return <video width="320" height="240" controls>
            <source src={require(`../../server/src/video/${item.myvideo}`)} type="video/mp4"/>
            <source src={require(`../../server/src/video/${item.myvideo}`)} type="video/ogg"/>
            <source src={require(`../../server/src/video/${item.myvideo}`)} type="video/webm"/>
            Your browser does not support the video tag.
           </video>
       })
       }
       </div>
    </div>
  );
}

export default App2;