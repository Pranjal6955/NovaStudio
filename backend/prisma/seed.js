import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });