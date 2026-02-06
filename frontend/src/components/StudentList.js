import axios from "axios";

const StudentList = ({ students, fetchStudents}) => {
    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:5000/students/${id}`);
        fetchStudents();
    };

    return (
        <div>
            {students.map((student) => (
                <div key={student._id}>
                    <p>
                        {student.fullName} - {student.course}
                    </p>
                    <button onClick={() => deleteStudent(student._id)}> Delete </button>
                    </div>
            ))}
        </div>
    );
};

export default StudentList;