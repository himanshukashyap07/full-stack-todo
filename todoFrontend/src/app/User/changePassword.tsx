// src/pages/ChangePassword.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {api} from "../../api/axiosInstance";
import { changePasswordSchema } from "../../schemas/passwordChangeSchema";
import type { ChangePasswordType } from "../../schemas/passwordChangeSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigation = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: async (payload: ChangePasswordType) => {
      const { data } = await api.post("/auth/change-password", payload);
      return data;
    },
    onSuccess: () => {
      toast("password changed successfully");
      navigation("/dashboard")
    },
    onError: (err: any) => {
      toast("password is not change reattempt after sometime")
      console.error("Change password failed:", err.response?.data ?? err.message);
    },
  });

  const onSubmit = (values: ChangePasswordType) => mutation.mutate(values);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 rounded bg-white p-6 shadow"
      >
        <h1 className="mb-4 text-center text-2xl font-bold">Change Password</h1>

        {/* Old Password */}
        <div className="mb-4">
          <label className="text-sm font-medium">Old Password</label>
          <input
            type="password"
            {...register("oldPassword")}
            className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.oldPassword && (
            <p className="text-sm text-red-500">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="text-sm font-medium">New Password</label>
          <input
            type="password"
            {...register("newPassword")}
            className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          {mutation.isPending ? "Changing..." : "Change Password"}
        </button>

        {/* Error */}
        {mutation.isError && (
          <p className="mt-2 text-center text-sm text-red-500">
            Failed to change password. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}