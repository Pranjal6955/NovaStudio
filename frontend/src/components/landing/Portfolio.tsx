"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Grid,
  Stack,
  Chip,
} from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { getProjects } from "@/services/api";

interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  techStack: string[];
  description?: string;
}

const fallback: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform Redesign",
    category: "Web Design",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    techStack: ["React", "Next.js", "TypeScript"],
    description: "A complete overhaul of the storefront experience, boosting conversion rates by 35% through AI-driven personalization.",
  },
  {
    id: "2",
    title: "Health & Fitness Mobile App",
    category: "Mobile Apps",
    imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop",
    techStack: ["React Native", "Node.js"],
    description: "Cross-platform fitness app with real-time workout tracking and personalized plans that reached 100K downloads.",
  },
  {
    id: "3",
    title: "AI-Powered Analytics Dashboard",
    category: "AI Integration",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    techStack: ["Python", "TensorFlow", "React"],
    description: "Machine learning dashboard processing millions of data points with 94% prediction accuracy.",
  },
  {
    id: "4",
    title: "SaaS Marketing Platform",
    category: "Web Design",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    techStack: ["Vue.js", "Laravel", "MySQL"],
    description: "Full-stack marketing automation serving 500+ businesses with campaign management and analytics.",
  },
  {
    id: "5",
    title: "Real Estate Listing App",
    category: "Mobile Apps",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    techStack: ["Flutter", "Firebase"],
    description: "Property search app with AR walkthroughs and instant agent connections that increased listings by 40%.",
  },
  {
    id: "6",
    title: "AI Chatbot for Customer Support",
    category: "AI Integration",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    techStack: ["OpenAI", "Node.js", "React"],
    description: "Intelligent bot handling 10K+ daily queries with 92% resolution rate, reducing support costs by 60%.",
  },
];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>(fallback);

  useEffect(() => {
    getProjects()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.slice(0, 6));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Box
      id="portfolio"
      sx={{
        py: { xs: 8, md: 14 },
        px: { xs: 3, lg: 0 },
        background: "#FFFFFF",
      }}
    >
      <Box sx={{ maxWidth: 1120, mx: "auto" }}>
        {/* Header */}
        <Stack alignItems="center" textAlign="center" sx={{ mb: { xs: 6, md: 8 } }}>
          <Chip
            label="Portfolio"
            sx={{
              mb: 3,
              height: 32,
              borderRadius: "100px",
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              fontSize: 14,
              fontWeight: 500,
              color: "#108B4E",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 34, md: 52 },
              fontWeight: 600,
              letterSpacing: "-2.5px",
              lineHeight: { xs: 1.15, md: 1.1 },
              color: "#111827",
              mb: 2,
            }}
          >
            Our{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #108B4E 0%, #059669 50%, #10B981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              work
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 17, md: 20 },
              color: "#6B7280",
              maxWidth: 480,
              lineHeight: 1.6,
            }}
          >
            Explore our latest projects and see how we help businesses transform
            their digital presence.
          </Typography>
        </Stack>

        {/* Project Grid */}
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  border: "1px solid #F3F4F6",
                  overflow: "hidden",
                  background: "#FFFFFF",
                  height: 440,
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                    borderColor: "#E5E7EB",
                    "& .portfolio-image": {
                      transform: "scale(1.05)",
                    },
                    "& .portfolio-arrow": {
                      opacity: 1,
                      transform: "translate(0, 0)",
                    },
                    "& .portfolio-overlay": {
                      opacity: 1,
                    },
                  },
                }}
              >
                {/* Image Container */}
                <Box
                  sx={{
                    position: "relative",
                    height: 200,
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.imageUrl}
                    alt={project.title}
                    className="portfolio-image"
                    sx={{
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop";
                    }}
                  />
                  {/* Overlay */}
                  <Box
                    className="portfolio-overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, transparent 40%, rgba(17,24,39,0.6) 100%)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                  {/* Category Chip */}
                  <Chip
                    label={project.category}
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      height: 28,
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(8px)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#374151",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                  {/* Arrow Icon */}
                  <Box
                    className="portfolio-arrow"
                    sx={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      background: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transform: "translate(4px, 4px)",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    <ArrowOutwardIcon sx={{ fontSize: 18, color: "#111827" }} />
                  </Box>
                </Box>

                {/* Content */}
                <Box
                  sx={{
                    p: 3.5,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#111827",
                      mb: 1,
                      lineHeight: 1.3,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#6B7280",
                      lineHeight: 1.6,
                      mb: 2.5,
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {project.description || "A modern digital solution built with cutting-edge technology."}
                  </Typography>
                  <Stack direction="row" spacing={0.75} flexWrap="wrap" gap={0.75}>
                    {project.techStack.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          fontSize: 12,
                          background: "#F9FAFB",
                          color: "#374151",
                          fontWeight: 500,
                          height: 26,
                          borderRadius: "6px",
                          border: "1px solid #F3F4F6",
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
