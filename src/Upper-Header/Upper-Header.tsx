import { useState } from 'react';
import './Upper-Header.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

interface ButtonProps{
    key: string;
    label: string;
}

interface UpperHeaderProps{
    title: string;
    subtitle: string;
    buttons?: ButtonProps[];
}


function UpperHeader({ title, subtitle, buttons }: UpperHeaderProps){

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
        <div className="main">
            <nav className="navbar">
                <div className="title-container">
                    <h1 className="title">{title}</h1>
                    <p className="subtitle">{displaySubtitle}</p>
                </div>
                <div className="buttons">
                    {buttons && (
                        <ButtonGroup
                            sx={{
                                justifyContent: 'flex-end', // Aligns items to the end of the container
                                borderRadius: '100px', // Applies a border radius
                            }}
                        >
                            {buttons.map((button) => (
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
                            ))}
                        </ButtonGroup>
                    )}
                </div>
            </nav>
        </div>
    )
}


export default UpperHeader;