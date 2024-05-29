import { useState } from 'react';
import styles from './Upper-Header.module.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {alpha, InputBase, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../AuthContext.tsx";


interface ButtonProps{
    key: string;
    label: string;
}

interface UpperHeaderProps{
    title: string;
    subtitle: string;
    buttons?: ButtonProps[];
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha('#007EB4', 0.25),
    '&:hover': {
        backgroundColor:'#007EB4',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function SearchBar({ onSubmit }: { onSubmit ? : (value: string) => void }) {
    const [searchInput, setSearchInput] = useState('');

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    }

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(searchInput);
        }
    }

    return (
        <Tooltip title={"Press enter"}>
        <Search as="form" onSubmit={handleSearchSubmit}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchInputChange}
                value={searchInput}
            />
        </Search>
        </Tooltip>
    );
}

function UpperHeader({ title, subtitle, buttons, onSearch }: UpperHeaderProps & { onSearch ? : (value: string) => void }){
    const navigate = useNavigate();
    const { setRole } = useAuth();

    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    const handleButtonClick = (buttonKey: string) => {
        setSelectedButton(buttonKey);

        switch(buttonKey) {
            case 'A-Z':
                // Order content alphabetically
                console.log('Ordering content alphabetically');
                break;
            case 'Z-A':
                // Order content in reverse alphabetical order
                console.log('Ordering content in reverse alphabetical order');
                break;
            case 'Logout':
                // Logout the user
                console.log('Logging out the user');
                Swal.fire({
                    title: "Are you sure you want to log out?",
                    // text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, logout!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetch('http://localhost:8081/api/v1/logout', {
                            method: 'GET',
                            credentials: 'include', // Include cookies in the request
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                            },
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`Server responded with status code ${response.status}`);
                                }

                                Swal.fire({
                                    title: "Logged out!",
                                    text: "Your have been logged out.",
                                    icon: "success"
                                });

                                navigate("/");
                                setRole(null);
                                return response.text();
                            })
                            .then(message => {
                                console.log(message); // Should log "You have been logged out"
                            })
                            .catch(error => {
                                console.error('Failed to logout', error);
                            });


                    }
                });

                break;
            case 'Search':
                // Search for content
                console.log('Searching for content');
                break;
            default:
                console.log('Button clicked: ', buttonKey);
        }
    }

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = today.toLocaleDateString('en-US', options);

    const displaySubtitle = subtitle === 'date' ? dateString : subtitle;

    return (
        <div className={styles.main}>
            <nav className="navbar">
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>{displaySubtitle}</p>
                </div>
                <div className={styles.buttons}>
                    {buttons && (
                        <ButtonGroup
                            sx={{
                                justifyContent: 'flex-end', // Aligns items to the end of the container
                                borderRadius: '100px', // Applies a border radius
                            }}
                        >
                            {buttons.map((button, index) => (
                                button.key === 'Search' ? (
                                    <SearchBar key={index} onSubmit={onSearch}/>
                                    ) : (
                                <Button
                                    //TODO: make it all responsive for the phones
                                    key={button.key}
                                    onClick={() => handleButtonClick(button.key)}
                                    sx={(theme) => ({
                                        borderRadius: '10px', // Applies a border radius to the button
                                        width:  theme.breakpoints.values.sm > window.innerWidth ? '80px' :
                                                theme.breakpoints.values.md > window.innerWidth ? '100px' :
                                                window.innerWidth < 400 ? '20px' : '100px',
                                        fontFamily: 'Inter',
                                        backgroundColor: selectedButton === button.key ? '#007EB4' : undefined, // Change color if selected
                                        color: selectedButton === button.key ? 'white' : undefined, // Change color if selected
                                    })}
                                >
                                    {button.label}
                                </Button>
                                )
                            ))}
                        </ButtonGroup>
                    )}
                </div>
            </nav>
        </div>
    )
}


export default UpperHeader;