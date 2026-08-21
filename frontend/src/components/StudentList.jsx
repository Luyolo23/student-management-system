import axios from "axios";

/**
 * StudentList Component: Displays a list of students.
 * 
 * Props:
 * - students: An array of student objects from the parent (App).
 * - fetchStudents: Function to refresh the list after a deletion.
 * - setEditingStudent: Function to pass a selected student back to the parent for editing.
 */
const StudentList = ({ students, fetchStudents, setEditingStudent }) => {

    /**
     * deleteStudent: Sends a DELETE request to the server.
     * After deleting, it calls fetchStudents() to update the UI.
     */
    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/students/${id}`);
            fetchStudents(); // Refresh the list
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return (
        <div>
            {/* 
              map(): This is how React loops through an array.
              For every 'student' in the 'students' array, it creates a <div> with their details.
            */}
            {students.map((student) => (
                <div key={student.id} className="student-card">
                    <p><strong>Name:</strong> {student.fullName}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Course:</strong> {student.course}</p>

                    {/* 
                      When 'Edit' is clicked, we call setEditingStudent.
                      This "lifts" the student data up to App.js, which then passes it to StudentForm.
                    */}
                    <button onClick={() => setEditingStudent(student)}>Edit</button>

                    {/* When 'Delete' is clicked, we run the deleteStudent function with the student's ID */}
                    <button className="delete" onClick={() => deleteStudent(student.id)}> Delete </button>
                </div>
            ))}
        </div>
    );
};

export default StudentList;