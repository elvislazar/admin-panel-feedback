import React, { useEffect, useState } from "react";
import { TextField, Paper, Button, Rating } from "@mui/material";
import axiosInstance from "../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/style.css";

const EditFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  useEffect(() => {
    axiosInstance.get(`/feedback/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const update = async () => {
    await axiosInstance.put(`/feedback/${id}`, form);
    navigate("/dashboard");
  };

  return (
    <Paper className="form-card">
      <TextField label="Course ID" name="courseId" fullWidth value={form.courseId || ""} onChange={e => setForm({ ...form, courseId: e.target.value })} />
      <TextField label="Course Name" name="courseName" fullWidth value={form.courseName || ""} onChange={e => setForm({ ...form, courseName: e.target.value })} />
      <TextField label="Course Duration" name="courseDuration" fullWidth value={form.courseDuration || ""} onChange={e => setForm({ ...form, courseDuration: e.target.value })} />
      <TextField label="Comments" name="comments" multiline fullWidth value={form.comments || ""} onChange={e => setForm({ ...form, comments: e.target.value })} />
      <Rating value={form.rating || 0} onChange={(e,val)=> setForm({ ...form, rating: val })} />
      <Button variant="contained" onClick={update}>Update</Button>
    </Paper>
  );
};

export default EditFeedback;
