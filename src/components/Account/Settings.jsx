import { useEffect } from "react";
import { submitHandler } from "../../utility/util.js";

import Input from "../Input.jsx";
import Button from "../Button.jsx";
import useHttp from "../../hooks/useHttp.js";

const httpOptions = {
    method: "Put",
    headers: {
        "Content-type": "application/json"
    }
}

export default function Settings({ firstName, lastName, email, id }) {
    const { data: editResponse,
        isLoading: isSubmitingEdit,
        sendRequest: editUserData,
        error: editError } = useHttp('http://192.168.0.189:3000/user/' + id, null, httpOptions);

    const { data: passwordChangeResponse,
        isLoading: isChangePasswordSubmited,
        sendRequest: changePassword,
        error: passwordChangeError,
        setCustomError: setChangePasswordError } = useHttp('http://192.168.0.189:3000/user/password/' + id, null, httpOptions)

    const handleEdit = (event) => {
        const data = submitHandler(event);
        editUserData(data);
    }

    const handleChangePassword = (event) => {
        const data = submitHandler(event);

        if (data.newPassword !== data.confirmPassword) {
            setChangePasswordError({ message: 'Passwords doesnt match.' })
            return;
        }

        changePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword });
        event.currentTarget.reset();
    }

    useEffect(() => {
        if (passwordChangeResponse !== null) {
            setChangePasswordError();
        }
    }, [passwordChangeResponse])

    return (
        <section className="">
            {/* <h1 className="font-semibold text-md mb-4">Settings</h1> */}
            <section className="flex w-full h-full gap-4 flex-wrap justify-center items-center">
                <section className="">
                    <form
                        onSubmit={handleEdit}
                        className="flex flex-col gap-4 box-shadow p-4">
                        <Input
                            required
                            type='text'
                            name='firstName'
                            label='First name'
                            defaultValue={firstName}
                        />

                        <Input
                            required
                            label='Last name'
                            type='text'
                            name='lastName'
                            defaultValue={lastName}
                        />

                        <Input
                            label='Email'
                            disabled={true}
                            defaultValue={email}
                        />

                        {editResponse?.message === 'Successfully updated information.' &&
                            <h1 className="text-green-700">Your profile has been successfully updated.</h1>
                        }

                        <Button
                            type='submit'
                            disabled={isSubmitingEdit}
                        >
                            Save information
                        </Button>
                    </form>
                </section>

                <section>
                    <form
                        onSubmit={handleChangePassword}
                        className="flex flex-col gap-4 box-shadow p-4">
                        <Input
                            type='password'
                            name='currentPassword'
                            required
                            label='Current password'
                        />

                        <Input
                            type='password'
                            name='newPassword'
                            required
                            label='New password'
                        />

                        <Input
                            type='password'
                            name='confirmPassword'
                            required
                            label='Confirm password'
                        />

                        {passwordChangeError &&
                            <p className="text-red-700">{passwordChangeError.message}</p>
                        }

                        {passwordChangeResponse?.message === 'Successfully changed password.' &&
                            <p className="text-green-700">{passwordChangeResponse.message}</p>
                        }

                        <Button
                            type='submit'
                            disabled={isChangePasswordSubmited}
                        >
                            Change password
                        </Button>
                    </form>
                </section>
            </section>
        </section>
    )
}