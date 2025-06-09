const mongoose = require('mongoose');
require('dotenv').config({ path: '../../.env' });
const Job = require('../models/Job');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Sample Indian jobs data
const jobsData = [
  {
    title: "Full Stack Developer",
    company: "InfoTech Solutions",
    location: "Bangalore, Karnataka",
    description: "We are looking for a Full Stack Developer to join our dynamic team in Bangalore. You will be responsible for developing and maintaining both front-end and back-end components of our web applications.",
    requirements: [
      "3+ years experience in web development",
      "Proficient in JavaScript, React, and Node.js",
      "Experience with MongoDB or other NoSQL databases",
      "Good understanding of REST APIs"
    ],
    salary: { min: 1200000, max: 2000000 },
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "REST API"],
    isActive: true,
    createdAt: new Date('2023-06-15')
  },
  {
    title: "Data Scientist",
    company: "Analytics India",
    location: "Hyderabad, Telangana",
    description: "Join our data science team to develop machine learning models and extract valuable insights from large datasets to drive business decisions for our clients across India.",
    requirements: [
      "MS or PhD in Computer Science, Statistics, or related field",
      "Strong programming skills in Python or R",
      "Experience with machine learning libraries and frameworks",
      "Knowledge of SQL and NoSQL databases"
    ],
    salary: { min: 1500000, max: 2500000 },
    skills: ["Python", "Machine Learning", "SQL", "Data Analysis", "TensorFlow"],
    isActive: true,
    createdAt: new Date('2023-06-10')
  },
  {
    title: "UX/UI Designer",
    company: "DesignCraft Studios",
    location: "Mumbai, Maharashtra",
    description: "We're seeking a creative UX/UI Designer to craft intuitive user experiences and visually appealing interfaces for our web and mobile applications based in Mumbai.",
    requirements: [
      "Portfolio demonstrating UX/UI design skills",
      "Proficiency in Figma, Adobe XD, or Sketch",
      "Understanding of user-centered design principles",
      "Experience with responsive design"
    ],
    salary: { min: 800000, max: 1500000 },
    skills: ["UI Design", "UX Research", "Figma", "Adobe XD", "Prototyping"],
    isActive: true,
    createdAt: new Date('2023-06-20')
  },
  {
    title: "DevOps Engineer",
    company: "CloudTech India",
    location: "Pune, Maharashtra",
    description: "Looking for a DevOps Engineer to help automate our infrastructure, improve CI/CD pipelines, and maintain cloud-based applications for our growing client base.",
    requirements: [
      "Experience with AWS or Azure cloud services",
      "Knowledge of containerization using Docker and Kubernetes",
      "Familiar with CI/CD tools like Jenkins or GitLab CI",
      "Strong scripting skills (Python, Bash)"
    ],
    salary: { min: 1400000, max: 2200000 },
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Python"],
    isActive: true,
    createdAt: new Date('2023-07-05')
  },
  {
    title: "Product Manager",
    company: "TechStartup Innovations",
    location: "Delhi NCR",
    description: "Lead product development from conception to launch, working closely with design and engineering teams to create user-centered products for the Indian market.",
    requirements: [
      "3+ years of product management experience",
      "Strong analytical and problem-solving skills",
      "Excellent communication and stakeholder management",
      "Agile/Scrum methodology knowledge"
    ],
    salary: { min: 1800000, max: 2800000 },
    skills: ["Product Management", "Agile", "User Stories", "Roadmapping", "Analytics"],
    isActive: true,
    createdAt: new Date('2023-07-12')
  },
  {
    title: "Backend Developer",
    company: "CodeNation Software",
    location: "Chennai, Tamil Nadu",
    description: "Join our backend team to develop robust and scalable API services and database architectures for our growing platform serving clients across South India.",
    requirements: [
      "Strong experience with Node.js or Python",
      "Knowledge of database design and optimization",
      "Experience with cloud services (AWS preferred)",
      "Understanding of microservices architecture"
    ],
    salary: { min: 1000000, max: 1800000 },
    skills: ["Node.js", "Express", "MongoDB", "API Development", "Microservices"],
    isActive: true,
    createdAt: new Date('2023-07-25')
  },
  {
    title: "Frontend Developer",
    company: "Webkart Solutions",
    location: "Kolkata, West Bengal",
    description: "Create engaging user interfaces and help build our next-generation web applications using modern JavaScript frameworks for our clients in Eastern India.",
    requirements: [
      "Strong proficiency in JavaScript, HTML, and CSS",
      "Experience with React or Angular",
      "Knowledge of responsive design principles",
      "Familiarity with testing frameworks"
    ],
    salary: { min: 900000, max: 1500000 },
    skills: ["JavaScript", "React", "HTML5", "CSS3", "Redux"],
    isActive: true,
    createdAt: new Date('2023-08-03')
  },
  {
    title: "Machine Learning Engineer",
    company: "AI Innovations India",
    location: "Gurgaon, Haryana",
    description: "Help build and deploy machine learning models to solve complex problems and enhance our core product offerings for the Indian market.",
    requirements: [
      "Strong background in machine learning and deep learning",
      "Experience with Python and ML frameworks",
      "Knowledge of data processing techniques",
      "Degree in Computer Science, Math, or related field"
    ],
    salary: { min: 1600000, max: 2600000 },
    skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"],
    isActive: true,
    createdAt: new Date('2023-08-10')
  }
];

// Seed function
const seedJobs = async () => {
  try {
    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');
    
    // Insert new jobs
    const result = await Job.insertMany(jobsData);
    console.log(`${result.length} jobs inserted successfully`);
    
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error seeding jobs:', error);
    mongoose.disconnect();
  }
};

// Execute seeding
seedJobs();