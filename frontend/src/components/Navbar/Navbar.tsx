"use client"

import Link from "next/link"
import { AppBar,Toolbar,Typography,Button,Box,Container } from "@mui/material"

export default function Navbar() {
    return (
        <AppBar 
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{
            backdropFilter: "blur(12px)",
            borderBottom : "1px solid #e5e7eb",
            backgroundColor : "rgba(255,255,255,0.8)"
        }}
        >
            <Container maxWidth="lg">
                <Toolbar
                disableGutters
                sx={{
                    display:"flex",
                    justifyContent : "space-between",
                    height : "80px"
                }}
                >
                    {/* Logo */}
                    <Typography 
                    variant="h5"
                    color="primary"
                    sx={{fontWeight:700}}
                    >Nova Studio
                    </Typography>
                    <Box
                    sx = {{
                        display : {
                            xs : "none",
                            md : "flex"
                        },
                        gap:4,
                    }}
                    >
                        <Link href="/" style={{textDecoration : "none"}}>
                        <Typography color="text-primary"
                        sx={{fontWeight : 700}}
                        >
                            Home
                        </Typography>
                        </Link>

                        <Link href="/#services" style={{textDecoration : "none"}}>
                        <Typography color="text-primary">
                            Services
                        </Typography>
                        </Link>
                    
                        <Link href="/#portfolio" style={{textDecoration : "none"}}>
                        <Typography color="text-primary">
                            Protfolio
                        </Typography>
                        </Link>

                        <Link href="/#contact" style={{textDecoration : "none"}}>
                        <Typography color="text-primary">
                            Contact
                        </Typography>
                        </Link>
                    </Box>
                    <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: "12px",
                        px:3,
                    }}
                    >
                        Start Project
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    )
}