import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [listOfImages, setListOfImages] = useState([]);
  const [name, setName] = useState("");
  const [myimage, setmyimage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/upload").then((response) => {
      console.log(response);
      setListOfImages(response.data);
    });
  }, []);

  const createUser = (e) => {
    e.preventDefault();
    // console.log(myimage.substring(myimage.indexOf('IMG'),myimage.length));

    const formData = new FormData()
    formData.append('myimage', selectedFile);
    formData.append('name', name);
    console.log(formData);
    console.log(formData.file);

    // const headers = {
    //     // "Content-Type": "form-data",
    //     "encType":"multipart/form-data"
    //   };

    axios.post(
        "http://localhost:8080/upload",
        formData,
        {
        headers: {
        "Content-Type": "multipart/form-data",
        }}).then((response) => {
        console.log(response.data.myimage);
        setmyimage(response.data.myimage);
        // console.log(response.data.name);

        setListOfImages([
        ...listOfImages,
        {
          myimage,
          name
        },
      ]);
    }).catch((err)=>console.log(err));
  };

  return (
    <div className="App">

        <label htmlFor="myimage">Choose Image</label>
        {/* <form action="/upload" method="post"> */}

        <input id="files" type="file" name="myimage" accept="image/*" onChange={(e)=>{
          setSelectedFile(e.target.files[0]);
          console.log(e.target.files[0]);
          }}/>
        {/* <label for="file">Choose File</label> */}
        <input type="text" placeholder="name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>

        <button onClick={createUser}> Create User </button>
        {/* <input type="submit" value="Submit"/> */}
        {/* </form> */}

        <br />

        <div style={{display:'flex' ,flexDirection: 'column'}}>
        {listOfImages.map((item,i)=>{
            // console.log(item);

            return   <img key={i} src={require(`../../server/src/image/${item.myimage}`)}
            alt="Simply Easy Learning" width="200"
            height="200"/>
        })
        }
        </div>
    </div>
  );
}

export default App;