import ShowPasswordCheckbox from "./ShowPasswordCheckbox";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postData } from "../../handlers/postData";
import { toast } from "react-toastify";
import { hasErrors } from "../../util/hasErrors.util";

import clsx from "clsx";

import { useState, useRef, useEffect } from "react";
import CenterContent from "../CenterContent";

type ResetPassword = {
  email: string;
  newPassword: string;
};

export default function ResetPasswordForm() {
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState<ResetPassword>({
    email: "",
    newPassword: "",
  });

  const { mutate } = useMutation({
    mutationFn: (formData: ResetPassword) => postData("auth/signup", formData),
    onSuccess: (data) => {
      toast.success(data.message);
      setFormData({ email: "", newPassword: "" });
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
    newPasswordRef?.current?.focus();
  }, []);

  return (
    <CenterContent>
      <section
        className={clsx(
          "reset-password-form border-1 w-[50%] max-w-[400px] min-w-[300px] p-5 rounded-xl",
        )}
      >
        <h1 className={clsx("mb-[1.5rem] text-2xl font-md text-center")}>
          Reset Password
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
            ref={newPasswordRef}
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
            placeholder="Enter new password"
            value={formData.newPassword}
            className={clsx(
              "p-2 focus:outline-none focus:border-black border border-gray-300 w-[100%] rounded-lg",
            )}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
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
            Update Password
          </button>
        </form>
        <p className={clsx("mt-[1.5rem]")}>
          <span>Already resets?</span>{" "}
          <NavLink to="/auth/login" className={clsx("text-blue-800")}>
            Login
          </NavLink>
        </p>
      </section>
    </CenterContent>
  );
}
