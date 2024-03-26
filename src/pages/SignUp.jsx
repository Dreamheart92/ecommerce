import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { setUserData } from "../utility/user.js";

import { apiEndpoints } from "../api/api-endpoints.js";
import { httpConfig, submitHandler } from "../utility/util.js";

import useHttp from "../hooks/useHttp.js";

import AuthSection from "../components/AuthSection.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

export default function SignUp() {
    const { data: userData,
        isLoading,
        error,
        setCustomError,
        sendRequest } = useHttp(apiEndpoints.auth.register, null, httpConfig('Post'));

    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            setUserData(userData);
            navigate('/');
        }
    }, [userData])

    const handleSubmit = (event) => {
        const userData = submitHandler(event);

        const { password, confirmPassword } = userData;

        if (password !== confirmPassword) {
            setCustomError({
                confirmPassword: {
                    error: true,
                    message: 'Passwords doesn\'t match.'
                }
            })

            setisSubmitting(false);
            return;
        }

        sendRequest(userData);
    }

    if (error) {
        // Find a "React way" to clear values without using useState
        document.querySelector('input[name=password]').value = ''
        document.querySelector('input[name=confirmPassword]').value = ''
    }

    return (
        <AuthSection
            title='Sign up'
            caption='Join the fashion revolution and make your mark in style.'
        >

            {error?.registered?.error &&
                <section>
                    <p className="text-red-700 text-md">{error.registered.message}</p>
                </section>
            }

            <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit}>
                <section className="flex flex-col gap-4">

                    <section>
                        <Input
                            error={error?.firstName?.message}
                            placeholder='First name'
                            type='text'
                            name='firstName'
                        />
                    </section>

                    <section>
                        <Input
                            error={error?.lastName?.message}
                            placeholder='Last name'
                            type='text'
                            name='lastName'
                            required />
                    </section>

                    <section>
                        <Input
                            error={error?.email?.message}
                            placeholder='Email'
                            type='text'
                            name='email'
                            required />
                    </section>

                    <section>
                        <Input
                            error={error?.password?.message}
                            placeholder='Password'
                            type='password'
                            name='password'
                            required
                            minLength='5' />
                    </section>

                    <section>
                        <Input
                            error={error?.confirmPassword?.message}
                            placeholder='Confirm password'
                            type='password'
                            name='confirmPassword'
                            required
                            minLength='5' />
                    </section>

                </section>
                <section className="flex flex-col mt-4">
                    <Button
                        disabled={isLoading}
                        type='submit'>{isLoading ? 'Submitting...' : 'Sign In'}</Button>
                    <Link to='/login' className="mt-2 text-center underline"><p>Already registered? Sign in</p></Link>
                </section>
            </form>
        </AuthSection>
    )
}