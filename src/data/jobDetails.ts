type JobListing = {
  id: number;
  title: string;
  location: string;
  description: string;
  salary: string;
  deadline?: string;
  workMode: "Remote" | "On-site" | "Hybrid";
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship";
  experienceLevel: string;
  keyResponsibilities: string[];
  qualifications: string[];
  benefits: string[];
};

export type JobListings = JobListing[];

export const jobListings = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "London, United Kingdom",
    description:
      "As a Frontend Developer at ReconXi, you will build interactive interfaces to enhance the user experience of our platform.",
    salary: "$500K - $900K",
    workMode: "On-site",
    jobType: "Full-time",
    experienceLevel: "2-5 years",
    keyResponsibilities: [
      "Develop responsive web interfaces using modern JavaScript frameworks",
      "Implement UI/UX designs with pixel-perfect accuracy",
      "Optimize application performance and loading times",
      "Collaborate with backend developers to integrate APIs",
      "Write clean, maintainable, and well-documented code",
      "Perform cross-browser testing and debugging",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in frontend development",
      "Proficiency in HTML, CSS, JavaScript, and modern frameworks (React, Vue, or Angular)",
      "Experience with responsive design and mobile-first approaches",
      "Knowledge of version control systems (Git)",
      "Understanding of web performance optimization techniques",
    ],
    benefits: [
      "Competitive salary and benefits",
      "Flexible working hours and remote work options",
      "Professional development opportunities",
      "Collaborative team environment",
    ],
  },
  {
    id: 2,
    title: "DevOps Engineer",
    location: "London, United Kingdom",
    description:
      "As a DevOps Engineer, you will ensure smooth deployment processes, infrastructure reliability, and system security.",
    salary: "$500K - $900K",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "3-5 years",
    keyResponsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage cloud infrastructure (AWS, Azure, or GCP)",
      "Automate deployment processes and system configurations",
      "Monitor system performance and security",
      "Implement disaster recovery solutions",
      "Collaborate with development teams to improve delivery processes",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science, Engineering, or related field",
      "3+ years of experience in DevOps or SRE roles",
      "Proficiency with cloud platforms and infrastructure as code",
      "Experience with containerization technologies (Docker, Kubernetes)",
      "Knowledge of monitoring and logging tools",
      "Understanding of security best practices",
    ],
    benefits: [
      "Competitive salary and benefits",
      "Flexible working arrangements",
      "Professional certifications support",
      "Collaborative work culture",
    ],
  },
  {
    id: 3,
    title: "Product Designer",
    location: "Remote/On-site",
    description:
      "We are looking for a talented and passionate Product Designer to join our dynamic team. As a Product Designer at the Company, you will play a critical role in shaping the user experience and visual design of our products. You will collaborate closely with cross-functional teams, including product managers, engineers, and marketers, to create intuitive and aesthetically pleasing designs that meet user needs and business goals.",
    salary: "$500K - $900K",
    deadline: "July 19th, 2024",
    workMode: "On-site",
    jobType: "Internship",
    experienceLevel: "2-3 years",
    keyResponsibilities: [
      "Conduct user research and gather insights to inform design decisions",
      "Create wireframes, prototypes, and high-fidelity mockups for new features and product enhancements",
      "Collaborate with the product team to define design requirements and ensure alignment with business objectives",
      "Develop and maintain design systems to ensure consistency across all products",
      "Conduct usability testing and iterate on designs based on user feedback",
      "Stay up-to-date with industry trends and best practices in design and user experience",
    ],
    qualifications: [
      "Bachelor's degree in Design, Human-Computer Interaction, or a related field",
      "3+ years of experience in product design or a similar role",
      "Proficiency in design tools such as Figma, Sketch, Adobe XD, or similar",
      "Strong portfolio showcasing your design process, problem-solving skills, and final products",
      "Excellent communication and collaboration skills",
      "Ability to think critically and solve complex design challenges",
      "Knowledge of HTML, CSS, and JavaScript is a plus",
    ],
    benefits: [
      "Competitive salary and benefits",
      "Flexible working hours and remote work options",
      "Opportunities for professional growth and development",
      "A collaborative and inclusive work environment",
    ],
  },

  {
    id: 4,
    title: "Product Manager",
    location: "London, United Kingdom",
    description:
      "As a Product Manager, you will oversee product strategy, roadmap execution, design and engineering teams.",
    salary: "$500K - $900K",
    workMode: "On-site",
    jobType: "Full-time",
    experienceLevel: "4-6 years",
    keyResponsibilities: [
      "Define product vision, strategy, and roadmap",
      "Gather and prioritize product requirements",
      "Work closely with design and engineering teams",
      "Analyze market trends and competition",
      "Define success metrics and monitor product performance",
      "Present product plans to stakeholders and executives",
    ],
    qualifications: [
      "Bachelor's degree in Business, Engineering, or related field",
      "4+ years of experience in product management",
      "Strong analytical and problem-solving skills",
      "Excellent communication and presentation abilities",
      "Experience with agile methodologies",
      "Technical background or understanding of software development",
    ],
    benefits: [
      "Competitive compensation package",
      "Professional development opportunities",
      "Flexible working arrangements",
      "Inclusive and collaborative work environment",
    ],
  },
  {
    id: 5,
    title: "Backend Engineer",
    location: "London, United Kingdom",
    description:
      "As a Backend Engineer at ReconXi, you will develop robust server-side applications and APIs that power our platform.",
    salary: "$500K - $900K",
    workMode: "Remote",
    jobType: "Full-time",
    experienceLevel: "3-5 years",
    keyResponsibilities: [
      "Design and develop scalable backend services and APIs",
      "Implement database designs and data models",
      "Optimize application performance and scalability",
      "Implement security best practices and data protection measures",
      "Write clean, testable, and maintainable code",
      "Collaborate with frontend developers and other team members",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in backend development",
      "Proficiency in backend languages (Node.js, Python, Java, etc.)",
      "Experience with databases (SQL and NoSQL)",
      "Knowledge of API design and development",
      "Understanding of cloud services and serverless architectures",
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Remote work flexibility",
      "Continuous learning opportunities",
      "Collaborative team environment",
    ],
  },
  {
    id: 6,
    title: "Marketing Specialist",
    location: "London, United Kingdom",
    description:
      "As a Marketing Specialist, you will drive brand awareness and optimize customer engagement strategies.",
    salary: "$500K - $900K",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "2-4 years",
    keyResponsibilities: [
      "Develop and implement marketing campaigns across multiple channels",
      "Create engaging content for social media, email, and website",
      "Analyze marketing metrics and optimize strategies",
      "Conduct market research and competitor analysis",
      "Collaborate with design team on marketing materials",
      "Manage and grow the company's social media presence",
    ],
    qualifications: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "2+ years of experience in digital marketing",
      "Knowledge of SEO, SEM, and content marketing",
      "Experience with marketing analytics tools",
      "Strong writing and communication skills",
      "Creativity and attention to detail",
    ],
    benefits: [
      "Competitive salary and performance bonuses",
      "Flexible working arrangements",
      "Professional development opportunities",
      "Collaborative and dynamic work environment",
    ],
  },
];
