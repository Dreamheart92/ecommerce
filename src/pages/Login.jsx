import { Link, useNavigate } from "react-router-dom";

import useHttp from "../hooks/useHttp.js";

import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import AuthSection from "../components/AuthSection.jsx";

import { setUserData } from "../utility/user.js";
import { httpConfig, submitHandler } from "../utility/util.js";
import { apiEndpoints } from "../api/api-endpoints.js";
import { useEffect } from "react";


export default function Login() {
    const navigate = useNavigate();

    const { data: userData, isLoading, error, sendRequest } = useHttp(apiEndpoints.auth.login, null, httpConfig('Post'));

    useEffect(() => {
        if (userData) {
            setUserData(userData);
            navigate('/');
        }
    }, [userData]);

    if (error) {
        document.querySelector('input[name=password]').value = '';
    }

    const handleSubmit = (event) => {
        const userData = submitHandler(event);
        sendRequest(userData);
    }

    const navigateToSignUp = () => {
        navigate('/signup');
    }

    return (
        <AuthSection
            title='Login'
            caption='Welcome back to your style sanctuary.'
        >
            {error?.email.error &&
                <section>
                    <p className="text-red-700 text-md">{error.email.message}</p>
                </section>
            }

            <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit}>
                <section className="flex flex-col gap-4">
                    <Input
                        placeholder='Email'
                        type='text'
                        name='email'
                        required />
                    <Input
                        placeholder='Password'
                        type='password'
                        name='password'
                        required />
                </section>
                <section className="flex justify-end py-1 text-sm">
                    <Link to={'/reset-password'}>Forgot your password?</Link>
                </section>
                <Button
                    disabled={isLoading}
                    type='submit'>{isLoading ? 'Submitting...' : 'Login'}</Button>
                <button
                    onClick={navigateToSignUp}
                    className="px-4 py-2 border border-stone-900 hover:border-stone-400" type="submit">Create account</button>
            </form>
        </AuthSection>
    )
}