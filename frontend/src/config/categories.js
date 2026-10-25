/**
 * DevKnowledge Categories & Taxonomy Configuration
 * 
 * Defines the 10 platform categories, descriptions, concrete examples,
 * key distinctions between similar domains, featured tags for blog filtering,
 * and legacy mapping for backward compatibility.
 */

export const ARTICLE_CATEGORIES = [
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    tagline: 'Code craft, design patterns, testing, refactoring & API development',
    description:
      'Focuses on application-level programming, language mechanics, clean code principles, refactoring, unit and integration testing, and maintainable software development practices.',
    examples:
      'Design patterns (SOLID, Factory, Observer), Clean Architecture, REST & GraphQL API design, unit testing with Vitest/Jest, and maintainable codebases.',
  },
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    tagline: 'LLMs, machine learning, neural networks, agents & embeddings',
    description:
      'Covers applied AI, machine learning engineering, deep learning models, prompt engineering, agentic workflows, model fine-tuning, and LLM integrations.',
    examples:
      'RAG pipelines, vector embeddings, LangChain/LlamaIndex, OpenAI and Gemini SDKs, PyTorch neural networks, and prompt engineering.',
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    tagline: 'App security, authentication, cryptography, vulnerability mitigation & DevSecOps',
    description:
      'Explores security engineering, defense-in-depth, identity management, encryption, threat modeling, vulnerability auditing, and hardening web architectures.',
    examples:
      'OAuth 2.0 / OIDC, JWT security, password hashing (bcrypt, Argon2), OWASP Top 10 mitigation, and DevSecOps pipelines.',
  },
  {
    id: 'devops-cloud',
    name: 'DevOps & Cloud',
    tagline: 'CI/CD, containerization, Kubernetes, cloud platforms & IaC',
    description:
      'Dedicated to deployment pipelines, cloud architecture (AWS, GCP, Azure), container orchestration, automated delivery, and infrastructure as code.',
    examples:
      'Docker containerization, Kubernetes clusters, GitHub Actions CI/CD, Terraform IaC, and serverless deployments.',
  },
  {
    id: 'architecture-design',
    name: 'Architecture & Design',
    tagline: 'System architecture, microservices, distributed structures & DDD',
    description:
      'High-level system topology, domain-driven design, service boundaries, asynchronous event-driven flows, scalability trade-offs, and microservices decomposition.',
    examples:
      'Event-driven systems, CQRS & Event Sourcing, monolith to microservices migration, message brokers (Kafka/RabbitMQ), and domain-driven design.',
  },
  {
    id: 'data-databases',
    name: 'Data & Databases',
    tagline: 'SQL, NoSQL, data modeling, query optimization & caching layers',
    description:
      'Database engine internals, schema design, relational and non-relational storage, indexing, query optimization, ACID transactions, and caching solutions.',
    examples:
      'PostgreSQL query indexing, Redis caching strategies, MongoDB schema modeling, Spring Data JPA / Prisma, and database sharding.',
  },
  {
    id: 'networks-distributed-systems',
    name: 'Networks & Distributed Systems',
    tagline: 'Network protocols, consensus algorithms, edge routing & distributed state',
    description:
      'Focuses on multi-node coordination, consensus algorithms, network protocols, low-level transport mechanisms, consistent hashing, and fault tolerance across nodes.',
    examples:
      'Raft & Paxos consensus, WebSocket & gRPC protocols, HTTP/3, CDN edge routing, and consistent hashing algorithms.',
  },
  {
    id: 'systems-infrastructure',
    name: 'Systems & Infrastructure',
    tagline: 'OS internals, memory management, Linux systems, kernel & hardware performance',
    description:
      'Deep dives into operating system internals, bare-metal infrastructure, memory safety, Linux system administration, concurrency primitives, and hardware-near optimizations.',
    examples:
      'Linux eBPF tracing, memory management in Rust/C++, process scheduling, thread concurrency, and low-level system calls.',
  },
  {
    id: 'algorithms-computer-science',
    name: 'Algorithms & Computer Science',
    tagline: 'Data structures, algorithmic complexity, graph theory & computation',
    description:
      'Explores fundamental computer science, data structures, Big-O algorithmic complexity, dynamic programming, tree traversals, and mathematical problem-solving.',
    examples:
      'Graph algorithms (Dijkstra, A*), Big-O complexity analysis, balanced search trees, and dynamic programming memoization.',
  },
  {
    id: 'ui-ux-product-design',
    name: 'UI/UX & Product Design',
    tagline: 'Interface design, accessibility (a11y), design systems & user experience',
    description:
      'Front-end ergonomics, user interface aesthetics, accessible web standards (WCAG), interactive design systems, animations, and product usability.',
    examples:
      'Design tokens in CSS/Figma, WCAG accessibility compliance, component libraries, fluid layouts, and micro-interactions.',
  },
];

export const CATEGORY_DISTINCTIONS = [
  {
    pair: 'Software Engineering vs. Architecture & Design',
    comparison:
      'Software Engineering focuses on code-level craft, functions, refactoring, and implementation logic. Architecture & Design focuses on high-level system topology, service boundaries, and structural scalability.',
  },
  {
    pair: 'Artificial Intelligence vs. Algorithms & Computer Science',
    comparison:
      'Artificial Intelligence focuses on statistical learning, neural networks, LLMs, and probabilistic reasoning. Algorithms & Computer Science focuses on deterministic computational problem-solving, Big-O complexity, and classic data structures.',
  },
  {
    pair: 'DevOps & Cloud vs. Systems & Infrastructure',
    comparison:
      'DevOps & Cloud focuses on delivery pipelines, cloud services, and orchestration tooling (CI/CD, Docker, K8s). Systems & Infrastructure focuses on operating system internals, Linux kernel, memory layout, and bare-metal performance.',
  },
  {
    pair: 'Data & Databases vs. Networks & Distributed Systems',
    comparison:
      'Data & Databases focuses on data storage engines, queries, schemas, and caching layers. Networks & Distributed Systems focuses on node communication protocols, consensus protocols, and transport layers.',
  },
  {
    pair: 'Architecture & Design vs. UI/UX & Product Design',
    comparison:
      'Architecture & Design is about backend and full-stack software system topology and data flows. UI/UX & Product Design is about the end-user experience, interface design systems, and visual accessibility.',
  },
];

/**
 * Featured Blog Tags (exactly 7 entries including 'All')
 */
export const BLOG_FEATURED_TAGS = [
  'All',
  'Software Engineering',
  'Artificial Intelligence',
  'Cybersecurity',
  'DevOps & Cloud',
  'Architecture & Design',
  'Data & Databases',
];

/**
 * Backward compatibility mapping for legacy article tags
 */
export const CATEGORY_LEGACY_MAP = {
  'Software Engineering': ['software engineering', 'backend', 'frontend', 'typescript', 'react'],
  'Artificial Intelligence': ['artificial intelligence', 'ai', 'machine learning'],
  'Cybersecurity': ['cybersecurity', 'security'],
  'DevOps & Cloud': ['devops & cloud', 'devops', 'cloud'],
  'Architecture & Design': ['architecture & design', 'architecture'],
  'Data & Databases': ['data & databases', 'database', 'databases', 'data'],
};

/**
 * Matches an article tag against an active filter, taking legacy mappings into account.
 */
export const matchArticleTag = (articleTag, activeTag) => {
  if (!activeTag || activeTag === 'All') return true;
  if (!articleTag) return activeTag === 'Architecture & Design' || activeTag === 'Software Engineering';

  const normalizedArt = articleTag.trim().toLowerCase();
  const normalizedAct = activeTag.trim().toLowerCase();

  if (normalizedArt === normalizedAct) return true;

  const legacyList = CATEGORY_LEGACY_MAP[activeTag];
  if (legacyList && legacyList.includes(normalizedArt)) {
    return true;
  }

  return false;
};
