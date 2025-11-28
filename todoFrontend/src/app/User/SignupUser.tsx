import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {api} from "../../api/axiosInstance";
import { signupSchema } from "../../schemas/SignupSchema";
import type { SignupType } from "../../schemas/SignupSchema";
import { toast } from "react-toastify";


export default function SignIn() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: SignupType) => {
      const response = await api.post("/user/register", data);
      return response.data;
    },
    onSuccess: () => {
      toast("signup successfully")
      navigate("/login");
    },
    onError: (error: any) => {
      toast("signup failed")
      console.error("signup failed:", error.response?.data || error.message);
    },
  });

  const onSubmit = (data: SignupType) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            {...register("username")}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {mutation.isPending ? "Signing in..." : "Sign In"}
        </button>
          {/* login button */}
          <button type="button" className="mt-2 text-center w-full" onClick={() => navigate("/login")}>
          already have an account <span className="text-blue-700 hover:text-blue-500 italic shadow-sm font-medium text-center">click here</span>
        </button>
        {/* Error */}
        {mutation.isError && (
          <p className="text-red-500 text-sm mt-2 text-center">
            Login failed. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}