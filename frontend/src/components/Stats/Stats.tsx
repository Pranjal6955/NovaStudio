"use client"

import { useEffect, useState } from "react";
import { getStats } from "@/services/api";
import { Box, Card, CardContent, CircularProgress,Container,Typography } from "@mui/material";

interface Stat {
    id : string,
    projectsCompleted : number,
    clientWorldwide : number,
    experience: number
}

export default function Stats() {
    const [stats, setStats] = useState<Stat | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const fetchStats = async() => {
            try {
                const response = await getStats();
                setStats(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        };
        fetchStats();

    },[])

  if (loading) {
    return (
      <Box 
      sx={{
        display:"flex",
        justifyContent:"center"
      }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 700,
          mb: 6,
        }}
      >
        Our Impact
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: 3,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h3">
              {stats?.projectsCompleted}+
            </Typography>

            <Typography color="text.secondary">
              Projects Completed
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h3">
              {stats?.clientWorldwide}+
            </Typography>

            <Typography color="text.secondary">
              Clients Worldwide
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h3">
              {stats?.experience}+
            </Typography>

            <Typography color="text.secondary">
              Years Experience
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );

}
