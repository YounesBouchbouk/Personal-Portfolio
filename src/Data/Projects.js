import nms from "../images/ispapp/adminLog.png"
import nms2 from "../images/ispapp/dashboad.png"
import nms3 from "../images/ispapp/dashboad2.png"
import nms4 from "../images/ispapp/routerList.png"
import nms5 from "../images/ispapp/routerchart.png"
import nms6 from "../images/ispapp/routersam.png"

import simplebank1 from "../images/simple_bank/cource.png"
import simplebank2 from "../images/simple_bank/evans.png"
import simplebank3 from "../images/simple_bank/giserver.png"
import simplebank4 from "../images/simple_bank/githubAction.png"

import SignUpUSer from "../images/Deliverynet/SignUpUSer.jpg"
import SignUpDelivery from "../images/Deliverynet/SignUpDelivery.jpg"
import ResetPassowrdDemander from "../images/Deliverynet/ResetPassowrdDemander.jpg"
import confiméemailAlert from "../images/Deliverynet/confiméemailAlert.jpg"
import Adresses from "../images/Deliverynet/Adresses.jpg"
import phones from "../images/Deliverynet/phones.jpg"
import findZone from "../images/Deliverynet/Review.jpg"
import DashServices from "../images/Deliverynet/DashServices.jpg"

import factoryIt from "../images/factoryIt.png"
import factoryIt1 from "../images/factoryIt1.png"
import factoryIt2 from "../images/factoryIt2.png"
import factoryIt3 from "../images/factoryIt3.png"
import factoryIt4 from "../images/factoryIt4.png"

import mindHome from "../images/mindmeet/Homepage.png"
import mindDialog from "../images/mindmeet/Dialog.png"
import mindArticles from "../images/mindmeet/Articles.png"

import portfolio from "../images/portfolio.png"
import part0 from "../images/part0.png"

export const ProjectsData = [
  {
    title: "JOYO: mental health & self-awareness platform",
    description:
      "Backend for a public launch: DDD-shaped services, Sqlc, PostgreSQL on GCP, and an LLM-driven self-exploration flow that personalizes prompts from engagement history. TDD, lean Docker images, and caching/query work to keep latency predictable.",
    technologies: [
      "Go",
      "PostgreSQL",
      "Sqlc",
      "Docker",
      "OpenAI API",
      "DDD",
      "GCP",
    ],
    images: [mindHome, mindDialog, mindArticles],
    whatfor: "",
    context: ["top", "Self-Learning"],
    github: "",
    link: "",
  },
  {
    title: "ResumeForge AI (microservices monorepo)",
    description:
      "Distributed resume stack in a monorepo: auth, profiles, and AI matching as separate services. gRPC for internal calls, REST for clients, Node and Go where each fits best.",
    technologies: [
      "Go",
      "Node.js",
      "Next.js",
      "gRPC",
      "MongoDB",
      "Redis",
    ],
    images: [portfolio, part0, simplebank1],
    whatfor: "",
    context: ["top", "Self-Learning"],
    github: "",
    link: "",
  },
  {
    title: "SimpleBank: high-consistency financial backend",
    description:
      "Go banking API with strong isolation, ACID transfers, sqlc, gRPC + HTTP via gRPC-gateway, Swagger, Redis, and a GitHub Actions path to AWS EKS.",
    technologies: [
      "Golang",
      "Gin",
      "gRPC",
      "postgres",
      "Sqlc",
      "Docker",
      "Kubernetes",
      "AWS",
      "Swagger",
      "Redis",
    ],
    images: [simplebank1, simplebank2, simplebank3, simplebank4],
    whatfor: "",
    context: ["Self-Learning", "top"],
    github:
      "https://github.com/YounesBouchbouk/SimpleBank_-Golang-Postgres-Kubernetes-gRPC-",
    link: "",
  },
  {
    title: "SENDIT: full-stack delivery network (MERN + Neo4j)",
    description:
      "Logistics app with Neo4j for shortest paths across 50+ cities and multi-hop routing across providers, balancing time and cost.",
    technologies: [
      "ReactJs",
      "NodeJS",
      "MongoDB",
      "Neo4j",
      "Rest Api",
      "Docker",
    ],
    images: [
      SignUpUSer,
      SignUpDelivery,
      ResetPassowrdDemander,
      confiméemailAlert,
      Adresses,
      phones,
      findZone,
      DashServices,
    ],
    whatfor: "",
    context: ["Internships", "top"],
    github: "",
    link: "",
  },
  {
    title: "ISPApp: network management dashboard",
    description:
      "Cloud dashboard to configure and monitor fleets of MikroTik and mixed gear: real-time metrics with Plotly, maps, and REST/sockets. (Earlier remote engagement.)",
    technologies: [
      "NextJs",
      "TypeScript",
      "tailwindcss",
      "sockets",
      "Leaflet",
      "Plotly",
      "Rest Api",
    ],
    images: [nms, nms2, nms3, nms4, nms5, nms6],
    whatfor: "",
    context: ["top"],
    github: "",
    link: "https://dash.ispapp.co",
  },
  {
    title: "NextFactoryIT company portfolio (Gatsby)",
    description:
      "Marketing site for an IT company: Gatsby, React, Tailwind, and GraphQL-driven content with motion and responsive layouts.",
    technologies: [
      "ReactJS",
      "GatsbyJs",
      "TailwindCss",
      "GraphQL",
    ],
    images: [factoryIt, factoryIt1, factoryIt2, factoryIt3, factoryIt4],
    whatfor: "",
    context: ["Internships", "top"],
    github: "",
    link: "",
  },
]
