import { useEffect, useState } from "react";
import axios from "axios";


const StudentForm = ({ fetchStudents, editingStudent, setEditingStudent }) => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    course: "",
  });


  useEffect(() => {
    if (editingStudent) {
      setFormData({
        fullName: editingStudent.fullName,
        email: editingStudent.email,
        course: editingStudent.course,
      });
    }
  }, [editingStudent]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingStudent) {
        await axios.put(
          `http://localhost:8080/students/${editingStudent.id}`,
          formData
        );
        setEditingStudent(null);
      } else {

        await axios.post("http://localhost:8080/students", formData);
      }


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