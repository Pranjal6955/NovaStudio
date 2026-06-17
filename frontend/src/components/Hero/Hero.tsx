"use client"

import { Box,Button,Container,Stack,Typography } from "@mui/material";

export default function Hero() {
    return (
    <Container maxWidth="lg">
        <Box 
        sx={{
            minHeight:"90vh",
            display : "flex",
            alignItems : "center",
            justifyContent : "space-between",
            gap : 6,
            flexWrap:"wrap",
        }}
        >
            <Box sx={{flex:1}}> 
                <Typography
                variant="h2"
                sx ={{
                    fontWeight : 700,
                    mb:3,
                    maxWidth : "700px"
                }}
                >
                Build Digital Experiences That Convert
                </Typography>

                <Typography
               variant="h6"
                color="text.secondary"
                sx={{
                 mb: 4,
                maxWidth: "600px",
                lineHeight: 1.8,
                }}             
                >
                Nova Studio helps startup and businesses build modern web applications, scalable digital products, and stunning user experiences.
                </Typography>
                <Stack
                direction="row"
                spacing={2}
                >
                    <Button
                    variant="contained"
                    size = "large"
                    >Start Project</Button>
                    <Button
                    variant="outlined"
                    size="large"
                    >View Portfolio</Button>
                </Stack>
            </Box>
            <Box
          sx={{
            flex:1,
            height: 450,
            borderRadius: 4,
            background:
              "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: 700,
          }}
            >
                  Dashboard Preview
            </Box>

        </Box>
    </Container>
    )
}