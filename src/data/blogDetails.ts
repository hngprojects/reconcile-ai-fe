export interface BlogDetails {
    id: number;
    image: string;
    authorName: string;
    publishedDate: string;
    title: string;
    description: string;
    readTime: string;
    authorProfilePicture: string;
    introText: string;
    sectionOneHeading: string;
    sectionOneText: string;
    sectionTwoText: string;
    sectionTwoHeading: string;
    categoryOneHeading: string;
    categoryOneContent: string;
    categoryTwoHeading: string;
    categoryTwoContent: string;
    categoryThreeHeading: string;
    categoryThreeContent: string;
  }
  
  export const blogData: BlogDetails[] = [
    {
      id: 1,
      image: "https://source.unsplash.com/random/800x600?tech",
      authorName: "John Doe",
      publishedDate: "March 10, 2025",
      title: "AI in Finance: The Future of Automated Reconciliation",
      description: "How artificial intelligence is reshaping financial reconciliation and automating tedious processes.",
      readTime: "5 min read",
      authorProfilePicture: "https://source.unsplash.com/random/200x200?person",
      introText: "Imagine a world where financial reconciliation is effortless and error-free. AI-driven solutions are making this a reality, helping businesses save time and avoid costly mistakes.",
      sectionOneHeading: "The Challenge: Manual Reconciliation is Outdated",
      sectionOneText: "Businesses struggle with manual reconciliation—it's time-consuming, prone to human error, and often leads to compliance issues. Traditional methods simply can't keep up with modern financial demands.",
      sectionTwoHeading: "How AI is Changing the Game",
      sectionTwoText: "AI-powered reconciliation tools analyze vast amounts of financial data in seconds, identifying discrepancies with unparalleled accuracy and efficiency.",
      categoryOneHeading: "Benefits of AI-Powered Reconciliation",
      categoryOneContent: "1. Faster, more efficient financial management\n2. Reduced human errors and compliance risks\n3. Real-time insights for better decision-making",
      categoryTwoHeading: "Who Needs Automated Reconciliation?",
      categoryTwoContent: "Businesses of all sizes, finance teams, and auditors who need accurate, stress-free financial management.",
      categoryThreeHeading: "Embrace the Future of Finance",
      categoryThreeContent: "Automated reconciliation is not a luxury—it's a necessity. Leverage AI to stay ahead and optimize financial workflows."
    },
    {
      id: 2,
      image: "https://source.unsplash.com/random/800x600?business",
      authorName: "Jane Smith",
      publishedDate: "March 15, 2025",
      title: "The Future of Remote Work: How Companies are Adapting",
      description: "Explore how businesses are shifting towards remote work and the tools that make it possible.",
      readTime: "6 min read",
      authorProfilePicture: "https://source.unsplash.com/random/200x200?woman",
      introText: "Remote work is no longer just a trend—it's the future. Companies worldwide are adapting to new models that prioritize flexibility and efficiency.",
      sectionOneHeading: "Why Remote Work is Here to Stay",
      sectionOneText: "With technology enabling seamless collaboration, businesses are rethinking the necessity of physical offices.",
      sectionTwoHeading: "Challenges and Solutions",
      sectionTwoText: "Managing remote teams requires new strategies, from asynchronous communication to productivity monitoring.",
      categoryOneHeading: "Key Benefits of Remote Work",
      categoryOneContent: "1. Increased employee satisfaction and productivity\n2. Cost savings on office space\n3. Access to a global talent pool",
      categoryTwoHeading: "Best Tools for Remote Teams",
      categoryTwoContent: "Platforms like Slack, Zoom, and Asana have revolutionized remote work, making collaboration seamless.",
      categoryThreeHeading: "Embracing the Remote Revolution",
      categoryThreeContent: "Companies that adapt quickly to remote work will gain a competitive edge in attracting top talent."
    },
    {
      id: 3,
      image: "https://source.unsplash.com/random/800x600?cybersecurity",
      authorName: "Michael Johnson",
      publishedDate: "April 2, 2025",
      title: "Cybersecurity in 2025: Protecting Your Business from Threats",
      description: "Cyber threats are evolving—here’s how you can safeguard your company’s data.",
      readTime: "7 min read",
      authorProfilePicture: "https://source.unsplash.com/random/200x200?man",
      introText: "With cyber threats on the rise, businesses must prioritize security. Learn the latest strategies to keep your data safe.",
      sectionOneHeading: "The Growing Threat of Cyber Attacks",
      sectionOneText: "Hackers are using more sophisticated methods, making traditional security measures ineffective.",
      sectionTwoHeading: "How Businesses Can Stay Secure",
      sectionTwoText: "Implementing multi-factor authentication and regular security audits is crucial.",
      categoryOneHeading: "Best Practices for Cybersecurity",
      categoryOneContent: "1. Strong password policies\n2. Regular employee training\n3. Data encryption and backups",
      categoryTwoHeading: "The Role of AI in Cybersecurity",
      categoryTwoContent: "AI-driven security tools can detect and prevent attacks before they happen.",
      categoryThreeHeading: "Investing in a Secure Future",
      categoryThreeContent: "Protecting customer data isn’t just about compliance—it’s about trust and long-term success."
    },
    {
      id: 4,
      image: "https://source.unsplash.com/random/800x600?startup",
      authorName: "Sarah Lee",
      publishedDate: "April 10, 2025",
      title: "From Idea to Startup: How to Build a Successful Business",
      description: "Starting a business is challenging, but with the right strategies, success is achievable.",
      readTime: "8 min read",
      authorProfilePicture: "https://source.unsplash.com/random/200x200?entrepreneur",
      introText: "Turning an idea into a thriving business takes planning, resilience, and the right mindset.",
      sectionOneHeading: "The Startup Journey: Where to Begin",
      sectionOneText: "A great idea is just the start—you need a business plan, funding, and market research.",
      sectionTwoHeading: "Common Pitfalls and How to Avoid Them",
      sectionTwoText: "Many startups fail due to lack of planning and poor financial management. Here’s how to stay on track.",
      categoryOneHeading: "Must-Have Traits of Successful Entrepreneurs",
      categoryOneContent: "1. Resilience and adaptability\n2. Strong leadership and decision-making skills\n3. Ability to pivot when necessary",
      categoryTwoHeading: "Funding Your Startup: What You Need to Know",
      categoryTwoContent: "From bootstrapping to venture capital, understanding funding options is crucial.",
      categoryThreeHeading: "Scaling Your Business for Long-Term Growth",
      categoryThreeContent: "Once established, focus on sustainable growth through innovation and customer loyalty."
    }
  ];
  