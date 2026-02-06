import { useState} from "react";
import axios from "axios";

const StudentForm  = ({ fetchStudents }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        course: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/students", formData);
        setFormData({fullName: "", email: "", course: ""});
        fetchStudents();
    };

    return (
    <form onSubmit={handleSubmit}>
      <input
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}/>

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}/>

      <input
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}/>

      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;