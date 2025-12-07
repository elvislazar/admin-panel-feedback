import React, { useState } from "react";
import { TextField, Paper, Button, Rating } from "@mui/material";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const AddFeedback = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    courseId: "",
    courseName: "",
    courseDuration: "",
    comments: "",
    rating: 0,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    await axiosInstance.post("/feedback", form);
    navigate("/dashboard");
  };

  return (
    <Paper className="form-card">
      <TextField label="Course ID" name="courseId" fullWidth onChange={handleChange} />
      <TextField label="Course Name" name="courseName" fullWidth onChange={handleChange} />
      <TextField label="Course Duration" name="courseDuration" fullWidth onChange={handleChange} />
      <TextField label="Comments" name="comments" multiline fullWidth onChange={handleChange} />
      <Rating value={form.rating} onChange={(e,val)=> setForm({ ...form, rating: val })} />
      <Button variant="contained" onClick={submit}>Save Feedback</Button>
    </Paper>
  );
};

export default AddFeedback;
