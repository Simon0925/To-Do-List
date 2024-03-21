import { FormEvent } from "react";

interface UserDataType {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}


export function validateInputs(userData: any) {
    const errors = {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    };

    if (!userData.name || userData.name.length < 2) {
        errors.name = 'Name is required and must be at least 2 characters';
    }

    if (!userData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        errors.email = 'Invalid email address';
    }

    if (!userData.password.match(/^(?=.*[A-Z]).{8,}$/)) {
        errors.password = 'Password must start with a capital letter and have at least 8 characters';
    }

    if (userData.password !== userData.repeatPassword) {
        errors.repeatPassword = 'Passwords do not match';
    }

    return errors;
}

export const addUser = async (e: FormEvent<HTMLFormElement>, userData: any, setErrors: Function) => {
    e.preventDefault();

    const newErrors = validateInputs(userData);
    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
        console.log('Form validation failed');
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/api/add-new-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            console.error('Server error:', response.statusText);
            return;
        }

        const data = await response.json();
        console.log('User added successfully:', data);
    } catch (error) {
        console.error('Error:', error);
    }
};


export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setUserData: React.Dispatch<React.SetStateAction<UserDataType>>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
        ...prevState,
        [name]: value
    }));
};
