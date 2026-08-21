import { useEffect, useState } from "react";
import axios from "axios";

/**
 * StudentForm Component: Handles adding new students and editing existing ones.
 * 
 * Props:
 * - fetchStudents: Function to refresh the list in the parent (App).
 * - editingStudent: The student currently being edited (or null).
 * - setEditingStudent: Function to clear the edit mode.
 */
const StudentForm = ({ fetchStudents, editingStudent, setEditingStudent }) => {
  // useState: Manages the text typed into our input fields.
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    course: "",
  });

  /**
   * useEffect (with dependency array [editingStudent]):
   * This hook "watches" the editingStudent variable. Whenever editingStudent changes
   * (like when you click 'Edit' on a student), this code runs to fill the form 
   * with that student's current information.
   */
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        fullName: editingStudent.fullName,
        email: editingStudent.email,
        course: editingStudent.course,
      });
    }
  }, [editingStudent]);

  /**
   * handleChange: Updates our formData state as the user types.
   * It uses the 'name' attribute of the input to know which field to update.
   */
  const handleChange = (e) => {
    setFormData({
      ...formData, // Keep the other fields as they are
      [e.target.name]: e.target.value, // Only update the field being typed in
    });
  };

  /**
   * handleSubmit: Triggered when the "Submit" or "Update" button is clicked.
   * It decides whether to send a POST (create) or PUT (update) request.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    try {
      if (editingStudent) {
        // If we are editing, send a PUT request to update the specific student
        await axios.put(
          `http://localhost:8080/students/${editingStudent.id}`,
          formData
        );
        setEditingStudent(null); // Exit edit mode
      } else {
        // If not editing, send a POST request to create a new student
        await axios.post("http://localhost:8080/students", formData);
      }

      // Clear the form and tell the parent (App) to refresh the list
      setFormData({ fullName: "", email: "", course: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Inputs are "controlled", meaning their value comes from React state */}
      <input
        name="fullName"
        placeholder="Full Name"
        required
        value={formData.fullName}
        onChange={handleChange} />

      <input
        name="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={handleChange} />

      <input
        name="course"
        placeholder="Course"
        required
        value={formData.course}
        onChange={handleChange} />

      {/* Button text changes based on whether we are editing or adding */}
      <button type="submit">{editingStudent ? "Update Student" : "Add Student"}</button>

      {/* Only show the Cancel button if we are in Edit Mode */}
      {editingStudent && (
        <button
          type="button"
          onClick={() => {
            setEditingStudent(null);
            setFormData({ fullName: "", email: "", course: "" });
          }}>Cancel</button>
      )}
    </form>
  );
};

export default StudentForm;