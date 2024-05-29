

export type Course = {
    idCourses: string;
    name: string;
    year: number;
    semester: number;
    credits: number;
    description: string;
};


export type Question = {
    idQuestion: string;
    questionText: string;
    idExam: string;
    correctAnswers: Array<CorrectAnswer>;
};

export type CorrectAnswer = {
    idAnswerExam: string;
    correctAnswer: string;
    score: number;
    idQuestionExam: string;
};

export type StudentExamDTO = {
    idStudentExam: string;
    idStudent: string;
    idExam: string;
    score: number;
    examStatus: number;
};

export type ExamType = {
    idExam: string;
    name: string;
    questions: Array<Question>;
    timeInMinutes: number;
    totalScore: number;
    passingScore: number;
    date: string;
    courseName: string;
    idTeachers: Array<string>;
    studentExamDTO: Array<StudentExamDTO>;
};

export type StudentName = {
    firstName: string;
    lastName: string;
    idUsers: string;
}

export type Student = {
    idUsers: string;
    firstName: string;
    lastName: string;
    facultyEmail: string;
    personalEmail: string;
    nrMatriculation: string;
    yearOfStudy: number;
    semester: number;
    groupOfStudy: string;
};

export type TeacherName = {
    firstName: string;
    lastName: string;
    idUsers: string;
}

export type Teacher = {
    idUsers: string;
    firstName: string;
    lastName: string;
    facultyEmail: string;
    personalEmail: string;
    idTeacher: string;
    degree: string;
};

export type AdminName = {
    firstName: string;
    lastName: string;
    idUsers: string;
};

export type TeacherDidactic = {
    idDidactic: string;
    teacherName: string;
    courseName: string;
};

export type StudentFollowCourse = {
    idStudentFollowCourse: string;
    studentName: string;
    courseName: string;
};

export type User = {
    idUsers: string;
    firstName: string;
    lastName: string;
    facultyEmail: string;
    personalEmail: string;
    password: string;
    role: string;
};




