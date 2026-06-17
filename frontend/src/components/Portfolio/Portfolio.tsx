"use client"

import { useEffect, useState } from "react";
import { getProject } from "@/services/api";
import { Box, Card, CardContent, CardMedia,Container,Typography, CircularProgress } from "@mui/material";

interface Project {
    id : string,
    title : string,
    category : string,
    imageUrl : string,
    techStack : string,
    description : string,
}

export default function Portfolio() {
    const[projects,setProjects] = useState<Project[]>([])
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async() => {
            try {
                const response = await getProject();
                setProjects(response.data)
            } catch (error) {
                console.log(error)
               
            } finally {
                setLoading(false)
            }
        };

        fetchProject();
    },[]);

    return(
        <Container
        maxWidth="lg"
        sx={{
            py:10,
        }}
        >
            <Typography
            variant="h3"
            align="center"
            sx={{
                fontWeight:700,
                mb:2,
            }}
            >
                Portfolio
            </Typography>
            <Typography
            align="center"
            color="text.secondary"
            sx={{
                mb:6
            }}
            > Some of our recent Work
            </Typography>
            {loading ? (
                <Box
                sx={{
                    display:"flex",
                    justifyContent : "center"
                }}
                >
                    <CircularProgress />
                </Box>
            ):(
                <Box
                sx={{
                    display : "grid",
                    gridTemplateColumns : "repeat(auto-fit,minmax(350px,1fr))",
                    gap:3
                }}
                >
                    {projects.map((project) => (
                        <Card key={project.id}>
                            <CardMedia
                            component="img"
                            height="220"
                            image={project.imageUrl}
                            alt={project.title}
                            />
                            <CardContent>
                                <Typography
                                variant="h5"
                                sx={{
                                    fontWeight:600,
                                    md:1
                                }}
                                >{project.title}
                                </Typography>
                                <Typography
                                color="text.secondary"
                                >
                                    {project.description}
                                </Typography>
                                <Typography
                                color = "primary"
                                sx={{
                                    mb:1
                                }}
                                >{project.category}
                                </Typography>
                                <Typography
                                color="text.secondary"
                                sx={{
                                    mb:2,
                                }}
                                >{project.techStack}
                                </Typography>
                            </CardContent>

                        </Card>
                    ))}

                </Box>

            )}
        </Container>
    )
}