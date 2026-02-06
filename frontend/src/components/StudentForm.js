import { useState} from "react";
import axios from "axios";

const StudentForm  = ({ fetchStudents }) => {
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
        if (editingStudent) {
      
            await axios.put(
            `http://localhost:5000/students/${editingStudent._id}`,
            formData
            );
            setEditingStudent(null);
            } else {
                await axios.post("http://localhost:5000/students", formData);
            }
            setFormData({ fullName: "", email: "", course: "" });
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

      <button type="submit">{editingStudent ? "Update Student" : "Add Student"}</button>
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