import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette:{
        primary: {
            main: "#7C3AED"
        },
        secondary : {
            main : "#111827"
        },
        background : {
            default : "#F8FAFC"
        }
    },
    typography : {
        fontFamily : [
            "Inter","Arial","sans-serif"
        ].join(","),

        h1:{
            fontWeight : 700,
        },

        h2:{
            fontWeight : 700,
        },

        h3:{
            fontWeight : 600,
        },

        button:{
            textTransform:"none",
            fontWeight : 600,
        }
    },

    shape : {
        borderRadius: 12,
    }
})

export default theme