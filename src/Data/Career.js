import ispapp from "../images/ispapp.jpeg"
import oracle from "../images/Oracle.png"

export const Education = [
  {
    year: "2019",
    title: "Bachelor's degree in Physical Science",
    description:
      "Get my Bachelor's degree in Physical Science in High school Abdellah chefchaouni",
    city: "Agadir,  Morocco",
  },
  {
    year: "2021",
    title: "Technical University degree",
    description:
      "Sector : Computer Engineering  Ecole supérieur de technologie Safi  University CADI AYYAD  ",
    city: "SAFI,  Morocco",
  },
  {
    year: "2022",
    title: "Professional license",
    description:
      "Sector: Computer Engineering  Faculté polydesiplinaire University Ibn Zohr  ",
    city: "TAROUDANT ,  Morocco",
  },
  {
    year: "2024",
    title: "Engineer diploma",
    description:
      "Sector: data and software engineer , Institut National des postes et télécommunications  ",
    city: "RABAT ,  Morocco",
  },
]

export const Certificat = [
  {
    year: "2020",
    title: "HTML, JavaScript, & Bootstrap - Certification Course",
    description:
      "Udemy Course HTML, JavaScript, & Bootstrap - Certification Course ",
    provider: "Udemy",
    Link: "UC-ca1cea28-7f29-4450-b1fb-2e98d3b364f2",
  },
  {
    year: "2020",
    title: "javascript course : Complete Guide (step by step)",
    description: "javascript course : Complete Guide (step by step) ",
    provider: "Udemy",
    Link: "UC-343fa959-b0bc-4f2d-b537-c4a13915c2a1",
  },
  {
    year: "2021",
    title: "Front-End Web Development with React",
    description: "ReactJS  Redux API ...",
    provider: "Coursera ",
    Link: "https://www.coursera.org/account/accomplishments/certificate/ZLFSMEXXGCGG",
  },
  {
    year: "2021",
    title: "Node.js, Express, MongoDB & More - TheComplete Bootcamp 2021",
    description: "NodeJs ExpressJs Mongodb Authentication/JWT/Security/Pug...",
    provider: "Udemy ",
  },
  {
    year: "2022",
    title: "Learn Solidity with Blockchain and Ethereum Essentials",
    description: "Learn Solidity with Blockchain and Ethereum Essentials",
    provider: "Udemy ",
  },
  {
    year: "2022",
    title: "  Learn Gatsby JS and React with Projects Experience",
    description: "GatsbyJs ReactJs TailwindCss",
    provider: "Udemy ",
  },
  {
    year: "2022",
    title: "NestJS Zero to Hero - Modern TypeScript Back-end Development",
    description: "NestJS TypeScript GraphQl API",
    provider: "Udemy ",
  },

  {
    year: "2023",
    title: "gRPC [Golang] Master Class: Build Modern API and Microservices",
    description: "exploring gRPC · Go (Programming Language)",
    provider: "O'Reilly",
  },
  {
    year: "2023",
    title: "Up and Running with Concurrency in Go (Golang)",
    description: "exploring Concurrency with Go ",
    provider: "O'Reilly",
  },
  {
    year: "2023",
    title: "Backend Master Class [Golang + Postgres + Kubernetes + gRPC]",
    description: "Golang ,Gin ,  CI/CD  , Kubernetes , docker , AWS  , gRPC ",
    provider: "Udemy , UC-d003538f-08f1-493e-8cbf-6fb1c59a6c41 ",
    Link: "https://www.udemy.com/certificate/UC-d003538f-08f1-493e-8cbf-6fb1c59a6c41/",
  },
  {
    year: "2023",
    title: "Working with Microservices in Go (Golang)",
    description:
      "Golang ,Gin  , microservices, gRPC , rabbitMQ , Kubernetes , docker , docker swarm ",
    provider: "Udemy , UC-ef0e7bc6-d63f-41ec-976a-d59c06b1b398 ",
    Link: "https://www.udemy.com/certificate/UC-ef0e7bc6-d63f-41ec-976a-d59c06b1b398/",
  },
]

export const Professinal_experiences = [
  {
    Contract: "Full-time",
    title: "Software Engineer (Full-Stack → Backend)",
    localisation: "Casablanca, Morocco",
    durée: "September 2024 – Present",
    description:
      "OmniLab by 21Factory — end-to-end ownership of two core microservices, evolving them from a monolithic baseline to a full event-driven architecture: outbox, Debezium CDC, NATS JetStream, webhooks, and async patterns.\n\n" +
      "• Production observability with OpenTelemetry, Prometheus, and DataDog under load.\n" +
      "• Strong consistency with ACID transactions, automated QA and TDD, and gRPC + Google AIP–style inter-service design.\n" +
      "• DDD and hexagonal architecture; React/Next.js frontends aligned with backend services.\n" +
      "• Stack: Go, gRPC, NATS, Debezium, Kubernetes, Docker, MongoDB, Next.js, ClickHouse, GitLab CI, OpenTelemetry, TDD.",
    Company: "OmniLab by 21Factory",
    Competences:
      "Go · EDA · Outbox/CDC · NATS · gRPC · DDD · Hexagonal · Kubernetes · OpenTelemetry · DataDog · React · Next.js · TDD",
  },
  {
    Contract: "Internship",
    title: "Research Assistant (Back-End)",
    localisation: "Casablanca, Morocco",
    durée: "January 2024 – June 2024",
    description:
      "• Improved and automated testing for Graal Cloud Native Guides (graal.cloud/gcn/guides).\n" +
      "• Oracle Labs Data Studio: features and fixes on a notebook data-science platform; Jupyter themes, file access, and embedding via iframes.",
    Company: "Oracle",
    Competences: "TypeScript · JavaScript · Python · Jupyter · Docker · Kubernetes",
    imageUrl: oracle,
  },
  {
    Contract: "Full-time (remote)",
    title: "Full-Stack Developer",
    localisation: "United States (remote)",
    durée: "August 2022 – July 2023",
    description:
      "ISPApp — dashboard to manage MikroTik and related gear from the cloud, with Plotly for real-time network metrics (ping, TCP, wireless APs, and more).",
    Company: "ISPApp",
    Competences: "Next.js · TypeScript · Plotly · Sockets · REST",
    imageUrl: ispapp,
  },
  {
    Contract: "Internship",
    title: "Full-Stack Developer Intern",
    localisation: "Casablanca, Morocco",
    durée: "January 2022 – June 2022",
    description:
      "NextFactoryIT — company portfolio in React/Gatsby/Tailwind; MERN delivery product with Neo4j route optimization, Docker, and Swagger-documented APIs.",
    Company: "NextFactoryIT",
    Competences:
      "React · Node.js · MongoDB · Neo4j · Gatsby · Tailwind · Docker · REST",
  },
]
