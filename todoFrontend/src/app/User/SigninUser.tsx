import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axiosInstance";
import { setAccessToken } from "../../api/authStorage";
import type { SigninType } from "../../schemas/SigninSchema";
import { signinSchema } from "../../schemas/SigninSchema";
import { toast } from "react-toastify";

export default function SignIn() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<SigninType>({
    resolver: zodResolver(signinSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (payload: SigninType) => {
      const { data } = await api.post("/user/login", payload);
      return data;
    },
    onSuccess: (data) => {
      setAccessToken(data.data.refreshToken);
      toast("logged in successfully")
      navigate("/dashboard");
    },
    onError: (err: any) => {
      toast("error occure in login please try again after some time")
      console.error("Login failed:", err.response?.data ?? err.message);
    },
  });

  const onSubmit = (values: SigninType) => loginMutation.mutate(values);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 rounded bg-white p-6 shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded bg-blue-600 py-2 shadow-2xs text-white transition hover:bg-blue-700"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign In"}
        </button>
        <button type="button" className="mt-2 text-center w-full" onClick={() => navigate("/")}>
          don't have an account <span className="text-blue-700 hover:text-blue-500 italic shadow-sm font-medium text-center">click here</span>
        </button>
        {/* Error */}
        {loginMutation.isError && (
          <p className="mt-2 text-center text-sm text-red-500">
            Login failed. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}