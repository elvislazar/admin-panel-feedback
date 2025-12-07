import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const Dashboard = () => {
  const [data, setData] = useState([]); // Ensure array default
  const [deleteId, setDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await axiosInstance.get("/feedback");

      // Ensure safe array input
      if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        console.error("API did not return an array:", res.data);
        setData([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setData([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const askDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setDeleteId(null);
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/feedback/${deleteId}`);
      loadData();
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <>
      <Paper className="dashboard-card">
        <div className="dashboard-table-wrapper">
          <Table>
            <TableHead>
              <TableRow className="table-head">
                <TableCell>Course ID</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item._id} className="dashboard-row">
                    <TableCell data-label="Course ID">{item.courseId}</TableCell>
                    <TableCell data-label="Course Name">
                      {item.courseName}
                    </TableCell>
                    <TableCell data-label="Duration">
                      {item.courseDuration}
                    </TableCell>
                    <TableCell data-label="Rating">
                      <Rating value={item.rating} readOnly size="small" />
                    </TableCell>
                    <TableCell
                      data-label="Actions"
                      className="dashboard-actions"
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          navigate(`/edit-feedback/${item._id}`)
                        }
                      >
                        <Edit color="primary" fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => askDelete(item._id)}
                      >
                        <Delete color="error" fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No feedback found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Feedback</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this feedback? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
