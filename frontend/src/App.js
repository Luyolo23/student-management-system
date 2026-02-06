import { useEffect, useState } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:5000/students");
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Student Management System</h1>
      <StudentForm fetchStudents={fetchStudents} editingStudent={editingStudent} setEditingStudent={setEditingStudent}/>
      <StudentList students={students} fetchStudents={fetchStudents} setEditingStudent={setEditingStudent}/>
      <footer className="footer">Created by <strong>Luyolo Tuta</strong></footer>
    </div>
  );
}

export default App;
