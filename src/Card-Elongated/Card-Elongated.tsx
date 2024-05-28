import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface CardElongatedProps {
  title: string;
  description?: string;
  cardIndex: number;
  children?: React.ReactNode;
  height?: string | number;
}

const images = [
  "/public/images/1.jpg",
  "/public/images/2.jpg",
  "/public/images/3.jpg",
  "/public/images/4.jpg",
  "/public/images/5.jpg",
];

function getImage(index: number) {
  return images[index % images.length];
}
//TODO: make it responsive

function CardElongated({
  title,
  description,
  cardIndex,
  children,
  height,
}: CardElongatedProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        display: "flex",
        width: isSmallScreen ? "100%" : "821px",
        height: isSmallScreen ? "50%" : height || "159px",
        backgroundColor: "#FAFAF5",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: isSmallScreen ? "100px" : "160px" }}
        image={getImage(cardIndex)}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="div"
            variant="h5"
            sx={{
              fontFamily: "Inter",
              fontWeight: "semi-bold",
              fontSize: isSmallScreen ? "15px" : "20px",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {description}
          </Typography>
        </CardContent>
      </Box>
      {children}
    </Card>
  );
}

export default CardElongated;
