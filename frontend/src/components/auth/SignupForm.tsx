"use client";

import clsx from "clsx";
import ShowPasswordCheckbox from "./ShowPasswordCheckbox";
import { useState, useRef, useEffect } from "react";
import CenterContent from "../CenterContent";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postData } from "../../handlers/postData";
import { toast } from "react-toastify";
import { hasErrors } from "../../util/hasErrors.util";

export type SignupData = {
  name: string;
  email: string;
  password: string;
};

export default function SignupForm() {
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: SignupData) => postData("auth/signup", formData),
    onSuccess: (data) => {
      toast.success(data.message);
      setFormData({ name: "", email: "", password: "" });
    },
    onError: (error) => {
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
    inputRef?.current?.focus();
  }, []);

  return (
    <CenterContent>
      <section
        className={clsx(
          "signup-form border-1 w-[80%] max-w-[500px] min-w-[300px] p-5 shadow-md rounded-lg",
        )}
      >
        <h1 className={clsx("mb-[1.5rem] text-2xl font-md text-center")}>
          Create your account
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
            placeholder="Name"
            ref={inputRef}
            value={formData.name}
            className={clsx(
              "p-2 focus:outline-none border border-gray-300 focus:border-black rounded-lg",
            )}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Email"
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
          <button
            type="submit"
            className={clsx(
              "bg-black text-white p-3 text-bold cursor-pointer rounded-lg",
            )}
          >
            {isPending ? "Signing in..." : "Sign Up"}
          </button>
        </form>
        <p className={clsx("mt-[1rem]")}>
          Already have an account?{" "}
          <NavLink to="/auth/login" className={clsx("text-blue-800")}>
            Login
          </NavLink>{" "}
        </p>
      </section>
    </CenterContent>
  );
}
