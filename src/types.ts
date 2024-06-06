

export type Course = {
    idCourses: string;
    name: string;
    year: number;
    semester: number;
    credits: number;
    description: string;
};


export type QuestionDTO = {
    idQuestion: string;
    questionText: string;
    idExam: string;
    correctAnswers: Array<CorrectAnswer>;
};

export type CorrectAnswersExamCreationDTO = {
    score: number;
}

export type CorrectAnswer = {
    idAnswerExam: string;
    correctAnswer: string;
    score: number;
    idQuestionExam: string;
};

export type QuestionsExamDTO = {
    idQuestionsExam : string;
    questionId : string;
    examId: string;
}

export type StudentExamDTO = {
    idStudentExam: string;
    idStudent: string;
    idExam: string;
    score: number;
    examStatus: number;
};

export type ExamDTO = {
    idExam: string;
    name: string;
    question: Array<QuestionDTO>;
    timeInMinutes: number;
    totalScore: number;
    passingScore: number;
    date: Date;
    courseName: string;
    idTeachers: Array<string>;
    studentExamDTO: Array<StudentExamDTO>;
}

export type ExamCreationDTO = {
    name:string;
    questions: Array<QuestionCreationDTO>;
    timeInMinutes: number;
    totalScore: number;
    passingScore: number;
    date: Date;
    idCourse: string;
    idTeachers: Array<string>;
}

export type QuestionCreationDTO = {
    idQuestion: string;
    questionText: string;
    idExam: string;
}

export type StudentExamFrontDTO = {
    idStudentExam: string;
    idStudent:string;
    studentName : string;
    idExam: string;
    score: number;
    examStatus: number;
}

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

export type UserEditDTO = {
    idUsers: string;
    firstName: string;
    lastName: string;
    facultyEmail: string;
    personalEmail: string;
}

export type Lecture={
    idLecture: string;
    name: string;
    description: string;
    week: number;
    semester: number;
    year: number;
}

export type LectureCreation ={
    name: string;
    description: string;
    week: number;
}

export type Materials = {
   bucketName: string;
   etag: string;
    key: string;
    lastModified: string;
    owner: string;
    size: number;
    storageClass: string;
}

export type materialsDTO = {
    materialType: string;
}

export type MaterialsInfoDTO = {
    idMaterial: string;
    name: string;
}

export type HomeworkAnnouncementsCreationDTO = {
    title: string;
    description: string;
    dueDate: Date | null;
    score: number;
}

export type HomeworkAnnouncements = {
    idHomeworkAnnouncement: string;
    title: string;
    description: string;
    dueDate: string | null | undefined;
    score: number;
    idLecture: string;
    idTeacher: string;
}

export type Homework = {
    idHomework: string;
    idStudent: string;
    nrMatricol: string;
    firstNameStudent: string;
    lastNameStudent: string;
    grade: number;
    uploadDate: Date | null;
    fileName: Array<string>;
}

export type HomeworkGrade = {
    grade: number;
}

export type Note = {
    idNote: string;
    positionX: number;
    positionY: number;
    noteText: string;
}

export type ReviewStudentAnswersDTO = {
    idStudentAnswerExam:string;
    idStudent: string;
    idTeacher: Array<string>;
    idExam: string;
    idQuestion: string;
    question: string;
    studentAnswer: string;
    needsReview: boolean;
}


export type CorrectAnswersExamDTO = {
    idAnswerExam: string;
    correctAnswer: string;
    score: number;
    idQuestionExam: string;
}

export type QuestionAndStudentsAnswersDTO = {
    questionText : string;
    correctAnswer : string;
    studentAnswer : string;
    score : number;
}

export type LecturesDTO = {
    idLecture: string;
    name: string;
    description: string;
    week: number;
    semester: number;
    year: number;
}





