import {useDispatch, useSelector} from "react-redux";
import useSetItem from "../../../hooks/useSetItem.js";
import {useState} from "react";
import {api} from "../../../api/api.js";
import {changePassword} from "../../../features/userSlice.js";

export default function PasswordResetPage() {
    const dispatch = useDispatch();

    const [email, setItemValueEmail] = useSetItem();
    const [new_password, setItemValueNewPassword] = useSetItem();
    const [password_repeat, setItemValuePasswordRepeat] = useSetItem();


    const validAccessToken = useSelector((store) => store.user.validAccessToken);

    const [error, setError] = useState("");
    const [passwordChanged, setPasswordChanged] = useState(false);


    const handleNewPasswordSubmit = async (e) => {
        e.preventDefault();

        if (new_password !== password_repeat) {
            setError("Passwords do not match");
            return;
        }

        let updatedPassword = {
            email: email,
            new_password: new_password,
            password_repeat: password_repeat,
            reset_code: "",

        };
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                },
            };

            setError("");
            const response = await api.patch(
                "/auth/password-reset/validate/",
                updatedPassword,
                config
            );
            console.log("response", response);
            dispatch(changePassword(updatedPassword));
            setPasswordChanged(true);
        } catch (error) {
            console.log(error);
            setError("Error resetting password");
        }
    };

    return (
        <div style={{marginTop: '5rem'}} className="flex min-h-full flex-col px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">Reset your
                    Password</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={setItemValueEmail}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-full border-0 py-1.5 ring-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                New Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={setItemValueNewPassword}
                                id="new_password"
                                name="new_password"
                                type="password"
                                required
                                className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                Repeat New Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={setItemValuePasswordRepeat}
                                id="new_password_repeat"
                                name="new_password_repeat"
                                type="password"
                                required
                                className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleNewPasswordSubmit}
                            type="submit"
                            className='flex w-full justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
                {passwordChanged && <p style={{color: "blue", marginTop: "1rem"}}>Password changed successfully</p>}
            </div>
        </div>
    );
}
