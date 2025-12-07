import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddFeedback from "./pages/AddFeedback";
import EditFeedback from "./pages/EditFeedback";
import { CssBaseline, Container } from "@mui/material";

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-feedback" element={<AddFeedback />} />
          <Route path="/edit-feedback/:id" element={<EditFeedback />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
