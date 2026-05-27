import clsx from "clsx";

import { useState, useEffect, useRef } from "react";
import ShowPasswordCheckbox from "./ShowPasswordCheckbox";
import { NavLink, useNavigate } from "react-router-dom";
import CenterContent from "../CenterContent";
import { useMutation } from "@tanstack/react-query";
import { postData } from "../../handlers/postData";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/auth.store";
import { hasErrors } from "../../util/hasErrors.util";

export type LoginData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const setAuthUser = useAuthStore((s) => s.setAuthUser);

  const navigator = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (formData: LoginData) => postData("auth/login", formData),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);

      setAuthUser({ email: data.user.email });
      setAuthUser({ name: data.user.name });
      setAuthUser({ userId: data.user.id });
      setAuthUser({ isAuthenticated: true });

      setFormData({ email: "", password: "" });

      navigator("/");
    },
    onError: (error) => {
      setAuthUser({ isAuthenticated: false });
      if (hasErrors(error)) {
        Object.values(error.errors).forEach((msg) => {
          toast.error(String(msg));
        });
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  return (
    <CenterContent>
      <section
        className={clsx(
          "login-form border-1 w-[80%] max-w-[500px] min-w-[300px] p-5 shadow-md rounded-xl",
        )}
      >
        <h1 className={clsx("mb-[1.5rem] text-2xl font-md text-center")}>
          Login with your account
        </h1>
        <form
          className={clsx("flex flex-col gap-[1rem]")}
          onSubmit={(e) => {
            e.preventDefault();
            mutate(formData);
          }}
        >
          <input
            type="text"
            placeholder="Email"
            ref={emailRef}
            value={formData.email}
            className={clsx(
              "p-2 focus:outline-none border border-gray-300 focus:border-black rounded-lg",
            )}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            className={clsx(
              "p-2 focus:outline-none border border-gray-300 focus:border-black rounded-lg",
            )}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <ShowPasswordCheckbox
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <NavLink to="/auth/reset-password" className={clsx("text-blue-800")}>
            Forget Password?
          </NavLink>
          <button
            type="submit"
            className={clsx(
              "bg-black text-white p-3 text-bold cursor-pointer rounded-lg",
            )}
          >
            Login
          </button>
        </form>
        <p className={clsx("mt-[1rem]")}>
          Dont have an account?{" "}
          <NavLink to="/auth/signup" className={clsx("text-blue-800")}>
            Sign Up
          </NavLink>{" "}
        </p>
      </section>
    </CenterContent>
  );
}
