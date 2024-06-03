"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCourses = exports.createAllCourses = void 0;
const Service_1 = require("../db/Course/Service");
const commonFunctions_1 = require("../utils/commonFunctions");
const courses = [
    {
        title: "The Complete JavaScript Course 2023",
        image: "https://img-c.udemycdn.com/course/750x422/851712_fc61_5.jpg",
        subtitle: "Master JavaScript with projects, challenges and theory",
        lecturer: "Jonas Schmedtmann",
        description: "Learn JavaScript from scratch with this comprehensive course that covers all the fundamentals and advanced concepts.",
        price: 99.99,
        promotion: 59.99,
        tags: "JavaScript, Web Development, Programming",
        hours: 69.5,
    },
    {
        title: "Python for Data Science and Machine Learning Bootcamp",
        image: "https://img-c.udemycdn.com/course/750x422/903744_8eb2.jpg",
        subtitle: "Learn Python for Data Science and Machine Learning from A-Z",
        lecturer: "Jose Portilla",
        description: "A comprehensive guide to using Python for data science and machine learning with real-world examples.",
        price: 119.99,
        promotion: 29.99,
        tags: "Python, Data Science, Machine Learning",
        hours: 25,
    },
    {
        title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
        image: "https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg",
        subtitle: "Dive in and learn React from scratch!",
        lecturer: "Maximilian Schwarzmüller",
        description: "Learn React.js in-depth with practical examples, hooks, and state management techniques.",
        price: 99.99,
        promotion: 49.99,
        tags: "React, Web Development, JavaScript",
        hours: 48.5,
    },
    {
        title: "The Data Science Course 2023: Complete Data Science Bootcamp",
        image: "https://img-c.udemycdn.com/course/750x422/1754098_e0df_3.jpg",
        subtitle: "Complete Data Science Training: Mathematics, Statistics, Python, Advanced Statistics in Python, Machine & Deep Learning",
        lecturer: "365 Careers",
        description: "Become a Data Scientist and master Data Analysis, Machine Learning & Data Visualization in Python.",
        price: 199.99,
        promotion: 29.99,
        tags: "Data Science, Python, Machine Learning",
        hours: 29,
    },
    {
        title: "Angular - The Complete Guide (2023 Edition)",
        image: "https://img-c.udemycdn.com/course/750x422/756150_c033_2.jpg",
        subtitle: "Master Angular 12 (formerly 'Angular 2') and build awesome, reactive web apps with the successor of Angular.js",
        lecturer: "Maximilian Schwarzmüller",
        description: "Learn how to develop modern, complex, responsive and scalable web applications with Angular.",
        price: 149.99,
        promotion: 59.99,
        tags: "Angular, Web Development, JavaScript",
        hours: 34.5,
    },
    {
        title: "Ultimate AWS Certified Developer Associate 2023",
        image: "https://img-c.udemycdn.com/course/480x270/1921420_384a_14.jpg",
        subtitle: "Pass the AWS Certified Developer - Associate Exam",
        lecturer: "Stephane Maarek",
        description: "Learn AWS with practical examples and prepare for the AWS Certified Developer Associate exam.",
        price: 129.99,
        promotion: 29.99,
        tags: "AWS, Cloud Computing, Certification",
        hours: 22,
    },
    {
        title: "Docker and Kubernetes: The Complete Guide",
        image: "https://img-c.udemycdn.com/course/750x422/1793828_7999.jpg",
        subtitle: "Build, test, and deploy Docker applications with Kubernetes while learning production-style development workflows",
        lecturer: "Stephen Grider",
        description: "Master Docker and Kubernetes with hands-on projects and detailed tutorials.",
        price: 199.99,
        promotion: 49.99,
        tags: "Docker, Kubernetes, DevOps",
        hours: 21,
    },
    {
        title: "The Ultimate MySQL Bootcamp: Go from SQL Beginner to Expert",
        image: "https://img-c.udemycdn.com/course/750x422/1187016_51b3.jpg",
        subtitle: "Become an In-Demand SQL Master by creating complex databases and building reports through real-world projects",
        lecturer: "Colt Steele",
        description: "Learn SQL from scratch and become proficient in creating and managing databases.",
        price: 99.99,
        promotion: 19.99,
        tags: "SQL, Database, MySQL",
        hours: 20,
    },
    {
        title: "The Complete Node.js Developer Course (3rd Edition)",
        image: "https://img-c.udemycdn.com/course/750x422/922484_52a1_8.jpg",
        subtitle: "Learn Node.js by building real-world applications with Node, Express, MongoDB, Jest, and more!",
        lecturer: "Andrew Mead",
        description: "Master Node.js by building real-world applications and gain a deep understanding of server-side JavaScript.",
        price: 149.99,
        promotion: 29.99,
        tags: "Node.js, JavaScript, Web Development",
        hours: 35,
    },
    {
        title: "Kotlin for Java Developers",
        image: "https://img-c.udemycdn.com/course/480x270/1322796_9675.jpg",
        subtitle: "Learn Kotlin the easy way while developing Android Apps",
        lecturer: "Smartherd Developers",
        description: "A complete guide to Kotlin programming for Java developers to build Android applications.",
        price: 109.99,
        promotion: 39.99,
        tags: "Kotlin, Android Development, Java",
        hours: 11,
    },
    {
        title: "Microsoft Excel - Excel from Beginner to Advanced",
        image: "https://img-c.udemycdn.com/course/750x422/950390_270f_3.jpg",
        subtitle: "Excel with this A-Z Microsoft Excel Course",
        lecturer: "Kyle Pew",
        description: "Master Excel from basics to advanced features and become proficient in using Excel for business tasks.",
        price: 139.99,
        promotion: 19.99,
        tags: "Excel, Microsoft Office, Data Analysis",
        hours: 18.5,
    },
    {
        title: "Graphic Design Bootcamp: Photoshop, Illustrator, InDesign",
        image: "https://img-c.udemycdn.com/course/480x270/3396724_d3c1_2.jpg",
        subtitle: "Learn Graphic Design and Adobe Software from Scratch",
        lecturer: "Derrick Mitchell",
        description: "A complete bootcamp to learn graphic design and Adobe software tools like Photoshop, Illustrator, and InDesign.",
        price: 199.99,
        promotion: 39.99,
        tags: "Graphic Design, Photoshop, Illustrator",
        hours: 15,
    },
    {
        title: "Complete Python Bootcamp: Go from zero to hero in Python 3",
        image: "https://img-c.udemycdn.com/course/750x422/567828_67d0.jpg",
        subtitle: "Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games",
        lecturer: "Jose Portilla",
        description: "A comprehensive Python course for beginners to advanced level covering all aspects of Python programming.",
        price: 99.99,
        promotion: 12.99,
        tags: "Python, Programming, Web Development",
        hours: 24,
    },
    {
        title: "Unreal Engine C++ Developer: Learn C++ and Make Video Games",
        image: "https://img-c.udemycdn.com/course/480x270/657932_c7e0_6.jpg",
        subtitle: "Created in collaboration with Epic Games. Learn C++ from basics while making your first 4 video games in Unreal",
        lecturer: "Ben Tristem",
        description: "Learn C++ from scratch and develop video games using Unreal Engine with hands-on projects.",
        price: 199.99,
        promotion: 49.99,
        tags: "Unreal Engine, C++, Game Development",
        hours: 31.5,
    },
];
// ***** CREATE BULK COURSES ***** //
const createAllCourses = async (req, res) => {
    try {
        const createdCourses = await (0, Service_1.bulkCreateCourse)(courses);
        return (0, commonFunctions_1.sendResponse)({
            res,
            status: 201,
            statusText: "Created",
            message: "Courses created successfully",
            success: true,
            data: createdCourses,
        });
    }
    catch (error) {
        console.log("Error>>", error);
        return (0, commonFunctions_1.sendResponse)({
            res,
            status: 500,
            statusText: "Internal Server Error",
            message: "Error while saving courses into database",
            success: false,
        });
    }
};
exports.createAllCourses = createAllCourses;
// ***** READ COURSES **** //
const getAllCourses = async (req, res) => {
    try {
        const courses = await (0, Service_1.getCourses)();
        return (0, commonFunctions_1.sendResponse)({
            res,
            status: 200,
            statusText: "OK",
            message: "Courses retrieved successfully",
            success: true,
            data: courses,
        });
    }
    catch (error) {
        console.log("Error>>", error);
        return (0, commonFunctions_1.sendResponse)({
            res,
            status: 500,
            statusText: "Internal Server Error",
            message: "Error while retrieving courses from database",
            success: false,
        });
    }
};
exports.getAllCourses = getAllCourses;
//# sourceMappingURL=course.js.map