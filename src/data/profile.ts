import ProfilePic from '../PersonalPagePP.jpg';
import DCMetroImg from '../DC-Metro.png';
import MovieImg from '../Movie.png';
import TwitterImg from '../Twitter-logo.png';

export interface Skill {
  name: string;
  level: number;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  tags: string[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  demo: string | null;
  tags: string[];
}

export interface Skills {
  programming: Skill[];
  technologies: Skill[];
  soft: Skill[];
  aiTools: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  university: string;
  bio: string[];
  photo: string;
  email: string;
  github: string;
  linkedin: string;
}

export const personalInfo: PersonalInfo = {
  name: 'Johann Antisseril',
  title: 'Software Engineer',
  subtitle: 'Computer Science & Statistics',
  university: 'University of Maryland, College Park',
  bio: [
    "I'm a Software Engineer at State Farm working in a Full Stack capacity with 3+ years building systems that run at real scale. I hold an M.S. in Computer Science (Machine Learning) from Georgia Tech and a B.S. in Computer Science from the University of Maryland.",
    'Most of my work lives in the AWS serverless world — Lambda, DynamoDB, API Gateway, Step Functions, EventBridge — coding primarily in Python on the backend, with React and TypeScript on the frontend, and Terraform for infrastructure.',
    'I\'m drawn to hard problems, new tech, and the satisfaction of building something that didn\'t exist before. Whether it\'s picking up an unfamiliar framework, optimizing a system under pressure, or just figuring out how something works — that\'s where I do my best work.',
  ],
  photo: ProfilePic,
  email: 'jantisseril@gmail.com',
  github: 'https://github.com/johann017',
  linkedin: 'https://www.linkedin.com/in/johannantisseril',
};

export const experience: Experience[] = [
  {
    company: 'State Farm',
    role: 'Software Engineer',
    period: 'June 2023 – Present',
    tags: ['AWS', 'Python', 'Serverless'],
  },
  {
    company: 'State Farm',
    role: 'Software Engineer Intern',
    period: 'May 2022 – June 2023',
    tags: ['Java', 'React', 'REST APIs'],
  },
];

export const skills: Skills = {
  programming: [
    { name: 'Python', level: 95 },
    { name: 'Java', level: 85 },
    { name: 'JavaScript / TypeScript', level: 82 },
    { name: 'React', level: 80 },
    { name: 'PostgreSQL', level: 78 },
    { name: 'Terraform', level: 75 },
    { name: 'CSS / HTML', level: 80 },
  ],
  technologies: [
    { name: 'AWS Lambda', level: 95 },
    { name: 'AWS DynamoDB', level: 95 },
    { name: 'AWS S3', level: 95 },
    { name: 'AWS API Gateway', level: 92 },
    { name: 'AWS RDS / Aurora', level: 78 },
    { name: 'AWS CloudWatch', level: 80 },
    { name: 'AWS Step Functions', level: 78 },
    { name: 'AWS EventBridge', level: 65 },
  ],
  soft: [
    { name: 'Team Player', level: 95 },
    { name: 'Critical Thinking', level: 95 },
    { name: 'Adaptability', level: 95 },
    { name: 'Grit', level: 90 },
    { name: 'Time Management', level: 80 },
  ],
  aiTools: ['GitHub Copilot', 'Claude', 'ChatGPT'],
};

export const projects: Project[] = [
  {
    title: 'Twitter Sentiment Analysis',
    description:
      'NLP pipeline that classifies tweet sentiment using machine learning. Built with Python, scikit-learn, and the Twitter API.',
    image: TwitterImg,
    github: 'https://github.com/johann017/Twitter-Sentiment',
    demo: null,
    tags: ['Python', 'NLP', 'ML'],
  },
  {
    title: 'DC Metro Navigator',
    description:
      'Real-time DC Metro trip planner powered by the WMATA API. Provides live train predictions and route optimization.',
    image: DCMetroImg,
    github: 'https://github.com/johann017/API_Projects',
    demo: null,
    tags: ['Python', 'REST API', 'Flask'],
  },
  {
    title: 'Predicting Movie Revenue',
    description:
      'End-to-end data science project analyzing box office trends and building a regression model to forecast revenue.',
    image: MovieImg,
    github: 'https://johann017.github.io/CMSC320-Final/',
    demo: 'https://johann017.github.io/CMSC320-Final/',
    tags: ['Python', 'Pandas', 'ML'],
  },
];
