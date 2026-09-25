export interface Project {
  id: string;
  title: string;
  category: 'AI/ML' | 'Web Creative' | 'Interactive' | 'System';
  tagline: string;
  description: string;
  longDescription: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  stars?: number;
  highlightBadge?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  content: string;
  tags: string[];
  emoji: string;
}

export interface StoryChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  metric: string;
  metricLabel: string;
  interactiveType: 'terminal' | 'galaxy' | 'canvas3d' | 'stats';
  quote?: string;
  badge: string;
}

export const sruProfile = {
  name: 'Srustisri Panda',
  handle: 'sru-codes',
  shortName: 'Sru',
  role: 'B.Tech CSE Student, Builder & Learner',
  college: 'GIET University, Odisha',
  location: 'Khordha, Odisha, India',
  motto: 'I break code so I can learn how to fix it 🤯✨',
  bio: "Hi, I'm Srustisri Panda! 🎓 B.Tech CSE @ GIET | Odisha, India. Exploring, experimenting, evolving — building one repo at a time. I love diving into Backend development, AI/ML, Cloud computing, and crafting adorable, delightful web experiences.",
  github: 'https://github.com/sru-codes',
  linkedin: 'https://www.linkedin.com/in/srustisri-panda/',
  email: 'connect@srucodes.com',
  status: 'Exploring Backend & AI/ML 🌸',
  funFact: 'I once automated an entire GitHub galaxy generator with dynamic constellations just to make READMEs look celestial and cute!',
  stats: {
    repos: '12+',
    stars: '50+',
    contributions: '1,200+',
    coffeeCups: '∞ ☕',
  }
};

export const techStackCategories = [
  {
    category: 'Core Languages',
    icon: '🐍',
    skills: [
      { name: 'Python', level: 'Advanced', cuteColor: 'bg-pink-100 text-pink-700 border-pink-200' },
      { name: 'JavaScript', level: 'Intermediate', cuteColor: 'bg-rose-100 text-rose-700 border-rose-200' },
      { name: 'HTML5', level: 'Experienced', cuteColor: 'bg-pink-50 text-pink-600 border-pink-200' },
      { name: 'CSS3', level: 'Experienced', cuteColor: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' },
      { name: 'C++', level: 'DSA & Systems', cuteColor: 'bg-pink-100 text-pink-800 border-pink-300' },
    ]
  },
  {
    category: 'Web & Backend',
    icon: '🌐',
    skills: [
      { name: 'React', level: 'Modern Hooks', cuteColor: 'bg-pink-100 text-pink-700 border-pink-300' },
      { name: 'Node.js', level: 'Async APIs', cuteColor: 'bg-rose-50 text-rose-700 border-rose-200' },
      { name: 'Express', level: 'REST Microservices', cuteColor: 'bg-pink-50 text-pink-700 border-pink-200' },
      { name: 'TailwindCSS', level: 'Pastel UI Styling', cuteColor: 'bg-pink-100 text-pink-600 border-pink-300' },
      { name: 'GSAP & Lenis', level: 'Smooth Motion', cuteColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300' },
    ]
  },
  {
    category: 'AI / ML & Cloud',
    icon: '🤖',
    skills: [
      { name: 'AI Collaborative Agents', level: 'SIH 2026', cuteColor: 'bg-pink-100 text-pink-700 border-pink-300' },
      { name: 'Scikit-Learn & ML', level: 'Classifiers', cuteColor: 'bg-rose-100 text-rose-800 border-rose-300' },
      { name: 'Docker', level: 'Containers', cuteColor: 'bg-pink-50 text-pink-700 border-pink-200' },
      { name: 'AWS & Cloud', level: 'EC2 & S3', cuteColor: 'bg-pink-100 text-pink-600 border-pink-200' },
      { name: 'Git & GitHub', level: 'Version Control', cuteColor: 'bg-rose-50 text-rose-700 border-rose-200' },
    ]
  }
];

export const projects: Project[] = [
  {
    id: 'orca',
    title: 'ORCA — Marine EcOsystem Reasoning with Collaborative Agents',
    category: 'AI/ML',
    tagline: 'Collaborative Multi-Agent AI system for marine ecology telemetry.',
    description: 'Smart India Hackathon (SIH 2026 PS 26176) project engineering collaborative autonomous agents that analyze oceanic ecosystems, water toxicity levels, and environmental shifts.',
    longDescription: 'ORCA (Marine EcOsystem Reasoning with Collaborative Agents) was built for the Smart India Hackathon 2026. The platform organizes cooperative agent swarms that process multi-spectral sensor feeds, track coral reef health, reason over water contamination vectors, and forecast marine ecosystem degradation in real-time. Built with JavaScript, Python agents, and dynamic visual monitoring panels.',
    techStack: ['JavaScript', 'Python', 'Multi-Agent AI', 'SIH 2026', 'Node.js', 'Telemetry API'],
    metrics: [
      { label: 'Ecosystem Reasoning Accuracy', value: '96.2%' },
      { label: 'Collaborative Agents Swarm', value: '8 Agents' },
      { label: 'Hackathon Track', value: 'SIH 2026' }
    ],
    githubUrl: 'https://github.com/sru-codes/ORCA-Marine-Intelligence',
    liveUrl: 'https://github.com/sru-codes/ORCA-Marine-Intelligence',
    image: '/src/assets/images/neural_artwork_1790238748488.jpg',
    highlightBadge: 'SIH 2026 Featured 🌊'
  },
  {
    id: 'galaxy-generator',
    title: 'Galaxy Telemetry & Constellation Generator',
    category: 'Interactive',
    tagline: 'Interactive celestial SVG generator mapping GitHub telemetry.',
    description: 'Automated workflow engine generating starry galaxy headers, dynamic constellation diagrams, and retro terminal boot animations for GitHub profiles.',
    longDescription: 'Crafted as a custom telemetry engine for GitHub profiles, this project converts raw commit logs and language distributions into interactive celestial SVG maps. Constellations represent projects, star brightness reflects commit frequencies, and an automated GitHub action keeps the galaxy synchronized while rendering retro CRT terminal GIFs.',
    techStack: ['Python', 'SVG Graphics', 'GitHub Actions', 'Dynamic Canvas', 'Math Algorithms'],
    metrics: [
      { label: 'Constellation Stars', value: '150+ Nodes' },
      { label: 'SVG Generation Time', value: '<450ms' },
      { label: 'Profile Views Tracked', value: '10,000+' }
    ],
    githubUrl: 'https://github.com/sru-codes/sru-codes',
    liveUrl: 'https://github.com/sru-codes',
    image: '/src/assets/images/story_backdrop_1790238763038.jpg',
    highlightBadge: 'Celestial Magic 🌌'
  },
  {
    id: 'zyrix-dev',
    title: 'Zyrix Dev — Digital Craft Studio',
    category: 'Web Creative',
    tagline: 'Digital craft studio for 3D interactive web experiences & AI bots.',
    description: 'A modern, high-contrast creative developer portfolio featuring 3D animated cards, bot architectures, and smooth interactive design tools.',
    longDescription: 'Zyrix Dev explores cutting-edge frontend capabilities. With smooth CSS 3D perspectives, tactile feedback animations, custom cursor mechanics, and minimalist layouts, this project demonstrates high-performance web experiences running at 120 FPS without unnecessary dependencies.',
    techStack: ['React', 'TypeScript', 'TailwindCSS', 'GSAP Motion', 'CSS 3D'],
    metrics: [
      { label: 'Animation Smoothness', value: '120 FPS' },
      { label: 'Asset Bundle Size', value: '14.2kb' },
      { label: 'Aesthetic Score', value: '100% Cute' }
    ],
    githubUrl: 'https://github.com/sru-codes/portfolio',
    liveUrl: 'https://github.com/sru-codes/portfolio',
    image: '/src/assets/images/srustisri_chibi_avatar_1790242888033.jpg',
    highlightBadge: 'Creative Studio ✨'
  },
  {
    id: 'email-spam',
    title: 'NLP Email Spam Classifier',
    category: 'AI/ML',
    tagline: 'Machine learning NLP classifier parsing text semantics.',
    description: 'Supervised machine learning pipeline utilizing Naive Bayes and TF-IDF vectorization to filter and detect spam emails with high precision.',
    longDescription: 'Developed to master fundamental machine learning and natural language processing pipelines. This project executes text pre-processing (tokenization, stop-word removal, lemmatization), extracts lexical feature matrices using TF-IDF, and trains multinomial classifiers to accurately detect spam patterns with transparent confusion matrices.',
    techStack: ['Python', 'Jupyter Notebook', 'Scikit-Learn', 'Pandas', 'NLP Tokenizer'],
    metrics: [
      { label: 'Classification Precision', value: '98.7%' },
      { label: 'Feature Extraction', value: 'TF-IDF' },
      { label: 'Dataset Instances', value: '5,572 Rows' }
    ],
    githubUrl: 'https://github.com/sru-codes/email-spam-classifier',
    liveUrl: 'https://github.com/sru-codes/email-spam-classifier',
    image: '/src/assets/images/neural_artwork_1790238748488.jpg',
    highlightBadge: 'Data Science 💌'
  },
  {
    id: 'laptop-price',
    title: 'Laptop Hardware Price Predictor',
    category: 'System',
    tagline: 'Multi-variable machine learning regression valuation model.',
    description: 'Predictive regression model analyzing processor tiers, RAM frequencies, GPU configurations, and form factors to forecast fair hardware valuations.',
    longDescription: 'An end-to-end data science project incorporating exploratory data analysis (EDA), categorical encoding for complex hardware specs, outlier treatment, and regression models (Random Forest, Gradient Boosting) to deliver accurate laptop price estimates.',
    techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib'],
    metrics: [
      { label: 'Regression R² Score', value: '0.89' },
      { label: 'Hardware Features', value: '12 Dimensions' },
      { label: 'Mean Absolute Error', value: 'Low Residual' }
    ],
    githubUrl: 'https://github.com/sru-codes/laptop-price-predictor',
    liveUrl: 'https://github.com/sru-codes/laptop-price-predictor',
    image: '/src/assets/images/story_backdrop_1790238763038.jpg',
    highlightBadge: 'ML Regression 💻'
  }
];

export const storyChapters: StoryChapter[] = [
  {
    id: 'genesis',
    number: '01',
    title: 'The Spark @ GIET Odisha',
    subtitle: 'ACADEMIC ROOTS & CURIOSITY',
    description: 'Starting the B.Tech Computer Science & Engineering journey at GIET University in Khordha, Odisha. Driven by a deep fascination with how software connects the world, Srustisri wrote her first scripts and discovered the excitement of building things.',
    icon: 'Terminal',
    metric: 'GIET University',
    metricLabel: 'Academic Foundation',
    interactiveType: 'terminal',
    quote: '"Every programmer starts with a blank editor and a spark of wonder."',
    badge: 'GIET CSE Genesis 🌱'
  },
  {
    id: 'break-to-fix',
    number: '02',
    title: '"I Break Code to Learn How to Fix It"',
    subtitle: 'PROBLEM SOLVING PHILOSOPHY',
    description: 'Embracing errors as the best teachers. Sharpening Python, diving into complex Data Structures & Algorithms (DSA), building backend APIs with Node.js and Express, and exploring Docker containerization.',
    icon: 'Layers',
    metric: '100+ Bugs Solved',
    metricLabel: 'Debug Mastery',
    interactiveType: 'canvas3d',
    quote: '"I break code so I can learn how to fix it 🤯✨"',
    badge: 'Core Developer Mindset 🛠️'
  },
  {
    id: 'orca-sih',
    number: '03',
    title: 'ORCA & The SIH Hackathon',
    subtitle: 'AI AGENTS & OCEAN INTELLIGENCE',
    description: 'Designing ORCA for Smart India Hackathon (SIH 2026 PS 26176). Engineering collaborative multi-agent systems capable of autonomous reasoning across ocean telemetry data, toxicity tracking, and marine ecosystem preservation.',
    icon: 'Brain',
    metric: 'SIH 2026 PS 26176',
    metricLabel: 'Hackathon Challenge',
    interactiveType: 'galaxy',
    quote: '"Collaborative intelligence is where software truly begins to help the planet."',
    badge: 'SIH 2026 Finalist 🌊'
  },
  {
    id: 'galaxy-telemetry',
    number: '04',
    title: 'Galaxy Constellations & Creative Tech',
    subtitle: 'CELESTIAL CODE & CUTE DESIGNS',
    description: 'Crafting the Galaxy Telemetry Generator, turning GitHub contributions into glowing constellations, and fusing technical depth with adorable, joyful baby-pink user interfaces and doodles.',
    icon: 'Cpu',
    metric: '10k+ Stars Mapped',
    metricLabel: 'Galaxy Engine',
    interactiveType: 'stats',
    quote: '"Technology does not have to be cold and mechanical — it can be charming, cozy, and cute."',
    badge: 'Celestial & Cute Frontiers 🌸'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'sih-orca-multi-agent',
    title: 'Building ORCA: Designing Collaborative Multi-Agent AI for Ocean Telemetry',
    date: 'Sep 2026',
    readTime: '5 min read',
    category: 'AI / Hackathons',
    summary: 'A deep dive into our Smart India Hackathon (SIH 2026 PS 26176) project, explaining how collaborative autonomous agents share environmental observations.',
    emoji: '🌊',
    content: `### Why Multi-Agent Systems for Marine Intelligence?

When dealing with vast oceanic telemetry — from pH sensors and water temperature gradients to satellite chlorophyll imagery — single monolithic models bottleneck quickly.

In our Smart India Hackathon project **ORCA (Marine EcOsystem Reasoning with Collaborative Agents)**, we structured our architecture around specialized micro-agents:

* **Sensing Agent:** Normalizes asynchronous sensor streams and flags sensor anomalies.
* **Correlation Agent:** Links localized temperature spikes to historical seasonal bloom patterns.
* **Toxicity Reasoner:** Predicts chemical spill diffusion rates and identifies safe marine corridors.
* **Synthesizer Agent:** Generates actionable alerts for maritime operators and ecological researchers.

\`\`\`javascript
// Collaborative Agent Message Protocol
const agentBroadcast = {
  agentId: "ORCA-CORAL-REASONER-04",
  timestamp: Date.now(),
  telemetry: { ph: 8.1, tempCelsius: 24.2, dissolvedOxygen: 6.8 },
  confidenceScore: 0.962,
  recommendedAction: "ALERT_REEF_STATION_ALPHA"
};
\`\`\`

The result is a resilient, fault-tolerant network where each agent performs focused reasoning, proving that collaborative multi-agent AI can meaningfully safeguard our natural environment!`,
    tags: ['AI Agents', 'SIH 2026', 'Marine Intelligence', 'Python', 'JavaScript']
  },
  {
    id: 'breaking-code-to-learn',
    title: 'Why Breaking Your Code On Purpose Makes You a 10x Better Developer',
    date: 'Aug 2026',
    readTime: '4 min read',
    category: 'Engineering Philosophy',
    summary: 'My journey at GIET University discovering that intentional failure is the quickest shortcut to deep technical comprehension.',
    emoji: '💡',
    content: `### The Power of "I break code so I can learn how to fix it"

As a B.Tech CSE student at GIET University in Odisha, one of the biggest mental shifts I made was shedding the fear of error traces.

When tutorials work on the first try, you learn almost nothing. But when you deliberately change parameters, break type signatures, and trigger memory leaks, you discover the actual mental model of the runtime:

#### Three Habits That Supercharged My Growth:
* **The "What If I Break This?" Test:** Whenever a script works, deliberately inject edge cases — negative integers, null objects, or race conditions.
* **Traceback Reading as Detective Work:** Instead of immediately searching online, read every line of the stack trace from bottom to top.
* **Building Without Frameworks First:** Before touching heavy abstractions, write a mini HTTP parser or custom state manager using vanilla primitives.

Breaking things with joyful curiosity turns coding from stressful memorization into an adventurous game of discovery! ✨`,
    tags: ['Learning Journey', 'GIET CSE', 'Philosophy', 'DSA', 'Growth']
  },
  {
    id: 'galaxy-svg-constellations',
    title: 'How I Built the Galaxy Telemetry Engine for GitHub Profiles',
    date: 'Jul 2026',
    readTime: '6 min read',
    category: 'Creative Tech',
    summary: 'Transforming raw commit arrays into celestial SVG maps, animated star charts, and retro CRT terminal GIFs.',
    emoji: '🌌',
    content: `### From Commits to Constellations

Your GitHub profile should be a window into your personality and imagination. Instead of boring gray contribution squares, I wanted a celestial sky where each commit is a burning star and each repository is a glowing constellation.

#### Technical Highlights:
* **Parametric Star Math:** Star positions calculated using a Fibonacci spiral algorithm with pseudo-random luminosity jitter.
* **Vector Constellation Links:** Delaunay triangulation connects neighboring project repositories into geometric constellations.
* **Automated GitHub Action Cron:** Generates fresh SVG artifacts every midnight and commits them directly to the asset branch.

\`\`\`python
# Fibonacci Spiral Star Mapping Algorithm
import math

def calculate_star_coordinates(index, total_stars, scale=400):
    golden_angle = math.pi * (3 - math.sqrt(5))
    theta = index * golden_angle
    radius = scale * math.sqrt(index) / math.sqrt(total_stars)
    return radius * math.cos(theta), radius * math.sin(theta)
\`\`\`

Blending mathematics, SVG vectors, and creative aesthetics is what makes programming pure magic! 🌸`,
    tags: ['SVG', 'Python', 'GitHub Actions', 'Creative Code', 'Math']
  }
];
