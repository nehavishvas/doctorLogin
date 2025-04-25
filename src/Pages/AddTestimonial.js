import React, { useContext, useEffect, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Paper, Typography, Divider, Box, Stack } from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2';
import {  } from '../BaseUrl/BaseUrl';
import { useNavigate } from 'react-router';
import { AppContext } from '../context';

const AddTestimonial = () => {
  const [content, setContent] = useState("Testimonial Description...");
  const [heading,setHeading]=useState();

  const navigate=useNavigate();

  const {TESTIMONIAL}=useContext(AppContext);


  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };


  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);

  const getimage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setImageFile(file);
    }
  };




  const addtestimonial = async () => {


      const formData = new FormData();
      formData.append("Heading", heading);
      formData.append("Description", content);
      if (imageFile) {
        formData.append("image", imageFile); // Append the image file
      }

      axios
        .post(`${}cms_testimonial`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setHeading("");
          setContent("");
          setImageFile(null);
          setImageUrl("");
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset the file input
          }

          Swal.fire({
            title: "Add Successfully",
            icon:"success",
          });
          navigate("/admin/Our_Testimonial")
          axios
            .get(`${}getAll_testimonial`)
            .then((resp) => {
                TESTIMONIAL(resp.data.all_details);
            }).catch((error)=>{

              console.log(` our testimonial error : ${error}`);

            });
        })
        .catch((error) => {
          console.error("Error posting data:", error);
          Swal.fire({
            title: "Add Testimonial Failed",
            icon :"error",
          });
        });

  };

  return (
    <div>
       <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}

        >
          Our Testimonial
        </Typography>




        <Divider />
        <Box height={10} />
        <Stack spacing={2} sx={{ padding: "20px" }}>
          <input
            type="text"
            value={heading}
            placeholder="Testimonial heading..."
            onChange={(e) => setHeading(e.target.value)}
            className="aboutheading"
          />
          <input
            type="file"
            accept="image/*"
            onChange={getimage}
            className="aboutheading fileinput"
            ref={fileInputRef}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Selected"
              style={{ maxWidth: "10%", marginBottom: "15px" }}
            />
          )}
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={handleEditorChange}
            config={{
              ckfinder: {},
            }}
          />
        </Stack>
      </Paper>
      <button onClick={addtestimonial} className="cmsaboutusupdatebtn">
        Add
      </button>
    </div>
  );
};

export default AddTestimonial;
