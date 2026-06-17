"use client";

import { useEffect, useState } from "react";
import { Box, Card, CardContent, Container, Typography, CircularProgress } from "@mui/material";
import { getServices } from "@/services/api";

interface Service {
    id: string,
    title: string,
    description: string,

}

export default function Services () {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const fetchServices = async () => {
            try {
                const response = await getServices();
                setServices(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        };
        fetchServices();
    },[]);
    return (
        <Container
        maxWidth="lg"
        sx={{
            py:10
        }} 
        >
            <Typography
            variant="h3"
            align="center"
            sx={{
                mb:2,
                fontWeight:700
            }}
            >
                Services
            </Typography>

            <Typography
            align="center"
            color="text.secondary"
            sx={{
            mb: 6,
            }}
            >
            Services we provide to help businesses
            grow digitally.
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
                display:"grid",
                gridTemplateColumns:"repeat(auto-fit,minimax(300px,1fr))",
                gap:3,
            }}
            >
               {services.map((service) => (
                <Card
                key={service.id}
                elevation={2}
                >
                    <CardContent>
                        <Typography
                        variant="h5"
                        sx={{
                            mb:2,
                            fontWeight: 600,
                        }}
                        >{service.title}
                        </Typography>
                        <Typography
                        color="text.secondary"
                        >
                            {service.description}
                        </Typography>

                    </CardContent>

                </Card>
               ))}
                
            </Box>
        )}

        </Container>
    )
}