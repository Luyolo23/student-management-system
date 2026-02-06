import axios from "axios";

const StudentList = ({ students, fetchStudents, setEditingStudent}) => {
    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:5000/students/${id}`);
        fetchStudents();
    };

    return (
        <div>
            {students.map((student) => (
                <div key={student._id} className="student-card">
                    <p><strong>Name:</strong> {student.fullName}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Course:</strong> {student.course}</p>

                    <button onClick={() => setEditingStudent(student)}>Edit</button>
                    <button className="delete" onClick={() => deleteStudent(student._id)}> Delete </button>
                    </div>
            ))}
        </div>
    );
};

export default StudentList;