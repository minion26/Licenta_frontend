import './Card-Large.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

interface CardLargeProps{
    title: string;
    credits?: number;
    description?: string;
    cardIndex: number;
    size?: number;
    onCardClick?: (title: string) => void;
}

const images = [
    "/public/images/1.jpg",
    "/public/images/2.jpg",
    "/public/images/3.jpg",
    "/public/images/4.jpg",
    "/public/images/5.jpg"
]

function getImage(index: number) {
    return images[index % images.length];
}
function CardLarge({title, credits, description, cardIndex, size, onCardClick}: CardLargeProps){
    // const navigate = useNavigate();


    return (
        <Card sx={{ maxWidth:297 ,
            height: size,
            // maxHeight: 296,
            borderRadius: '24px',
            backgroundColor: '#FAFAF5',

        }}>
            <CardActionArea onClick={() => onCardClick && onCardClick(title)}>
                <CardMedia
                    sx={{ aspectRatio: '16/9' }}
                    component="img"
                    height="140"
                    width="297"
                    image={getImage(cardIndex)}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx = {{
                        fontFamily: 'Inter',
                        fontWeight: 'semi-bold',
                    }}>
                        {title}
                    </Typography>
                    {credits && (
                        <Typography variant="subtitle1" color="text.secondary">
                            {credits} credits
                        </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>

                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CardLarge;