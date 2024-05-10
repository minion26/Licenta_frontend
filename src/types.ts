

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