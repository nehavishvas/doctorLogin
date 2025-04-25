import React, { useContext, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Paper, Typography, Divider, Box, Stack } from "@mui/material";
import axios from "axios";
import "./aboutus.css";
import Swal from "sweetalert2";
// import { Footer } from "antd/es/layout/layout";
import { AppContext } from "../context";
import { medicalUrl } from "../BaseUrl/BaseUrl";

const Footer_Details = () => {
  const [aboutheading, setAboutHeading] = useState();
  const [content, setContent] = useState("");

  const { Footer } = useContext(AppContext);

  useEffect(() => {
    // axios.get(`${}get_footer_section`).then((resp) => {
    //   console.log(resp.data.Details.Description);
    //   setContent(resp.data.Details.Description);
    //   setAboutHeading(resp.data.Details.Heading);
    // }).catch((eror)=>console.log(eror));;

    if (Footer) {
      setContent(Footer);
    }
  }, [Footer]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const aboutusupdate = async () => {
    let obj = { Description: content };

    axios
      .post(`${medicalUrl}/cms_footer_section`, obj)
      .then((response) => {
        Swal.fire({
          title: "Updated Successfully",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Updation Failed",
          icon: "error",
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
          Footer Details
        </Typography>
        <Divider />
        <Box height={10} />

        <Stack spacing={2} sx={{ padding: "20px" }}>
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
      <button onClick={aboutusupdate} className="cmsaboutusupdatebtn">
        Update
      </button>
    </div>
  );
};

export default Footer_Details;
