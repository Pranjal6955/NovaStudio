import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.admin.findFirst();
  if (existingAdmin) {
    console.log("⚠️  Data already exists — skipping seed.");
    return;
  }

  console.log("🌱 Seeding database...\n");

  const adminPassword = await bcryptjs.hash("admin123", 10);
  await prisma.admin.create({
    data: {
      name: "Pranjal Negi",
      email: "admin@novastudio.com",
      password: admin123,
    },
  });
  console.log("✅ Admin seeded successfully");

  await prisma.service.createMany({
    data: [
      {
        title: "Web Development",
        description:
          "Custom websites and web applications built using modern technologies.",
      },
      {
        title: "UI/UX Design",
        description:
          "Beautiful and user-friendly interfaces focused on conversion and usability.",
      },
      {
        title: "Mobile App Development",
        description:
          "Cross-platform mobile applications for Android and iOS.",
      },
      {
        title: "Cloud Solutions",
        description:
          "Deploy, scale, and manage applications on modern cloud infrastructure.",
      },
      {
        title: "AI Integration",
        description:
          "Integrate AI features, chatbots, and automation into your business workflows.",
      },
      {
        title: "DevOps & Automation",
        description:
          "CI/CD pipelines, Docker, Kubernetes, and infrastructure automation.",
      },
    ],
  });
  console.log("✅ Services seeded successfully");

  await prisma.project.createMany({
    data: [
      {
        title: "E-Commerce Platform",
        category: "Web Development",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        techStack: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
        description:
          "A full-stack e-commerce platform with product management, cart, and payment integration.",
      },
      {
        title: "Fitness Tracker App",
        category: "Mobile App Development",
        imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop",
        techStack: ["React Native", "Node.js", "MongoDB"],
        description:
          "Cross-platform mobile app for tracking workouts, nutrition, and health goals.",
      },
      {
        title: "SaaS Dashboard",
        category: "UI/UX Design",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        techStack: ["React", "Tailwind CSS", "Chart.js"],
        description:
          "A clean and modern admin dashboard design for SaaS analytics.",
      },
      {
        title: "Cloud Deployment Pipeline",
        category: "Cloud Solutions",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
        techStack: ["AWS", "Docker", "GitHub Actions", "Terraform"],
        description:
          "Automated CI/CD pipeline for multi-environment cloud deployments.",
      },
      {
        title: "AI Chatbot Integration",
        category: "AI Integration",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        techStack: ["Python", "OpenAI API", "FastAPI", "React"],
        description:
          "Intelligent chatbot for customer support powered by GPT models.",
      },
      {
        title: "DevOps Monitoring Tool",
        category: "DevOps & Automation",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
        techStack: ["Docker", "Kubernetes", "Prometheus", "Grafana"],
        description:
          "Real-time infrastructure monitoring and alerting system for containerized apps.",
      },
    ],
  });
  console.log("✅ Projects seeded successfully");

  await prisma.stat.create({
    data: {
      projectsCompleted: 50,
      clientWorldwide: 30,
      experience: 5,
    },
  });
  console.log("✅ Stats seeded successfully");

  await prisma.contact.createMany({
    data: [
      {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        message:
          "Hi, I'm interested in building an e-commerce website for my business. Can we schedule a call?",
      },
      {
        name: "Priya Mehta",
        email: "priya@example.com",
        message:
          "We need a mobile app for our fitness startup. Looking for a reliable team.",
      },
      {
        name: "Amit Verma",
        email: "amit@example.com",
        message:
          "Interested in your AI integration services. Would love to discuss a chatbot project.",
      },
    ],
  });
  console.log("✅ Contacts seeded successfully");

  console.log("\n🎉 Seed completed!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
