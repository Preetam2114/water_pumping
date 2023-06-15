import { useForm, SubmitHandler } from "react-hook-form";
import { account } from "../utils/init-appwrite";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface LoginFormInput {
  username: string;
  email: string;
  password: number;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInput>();

  const navigate = useNavigate();
  // @ts-expect-error It is not taking props don't know why
  const { user } = useAuth();
  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      const login = await account.createEmailSession(data?.email, data?.password);

      console.log(login);
      navigate("/app");
    } catch (error) {
      // @ts-expect-error: appwrite is not intializing
      console.log(error, error?.response?.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  return (
    <main className="w-full flex">
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <img src="/logo-white.png" />
          <div className=" mt-8 space-y-3">
            <h3 className="text-white text-3xl font-bold">
              Simplify Plant Care, One Drop at a Time
            </h3>
            <p className="text-gray-300">
              The term "MizunoHana" is a combination of two Japanese words: "Mizuno," meaning water,
              and "Hana," meaning flower. The name represents the concept of nurturing and caring
              for plants, which holds great significance in Japanese culture.
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/women/79.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/86.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <p className="text-sm text-gray-400 font-medium tranemerald-x-5">Join 5.000+ users</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 my-auto bg-[url(https://source.unsplash.com/qhizq_V876M)] brightness-50"></div>
      </div>
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="">
            <img src="/logo2.png" className="lg:hidden" />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log In</h3>
              <p className="">
                Don't have an account?{" "}
                <Link to={`/signup`} className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="mt-2 text-xs text-red-600 ">
                <span className="font-medium">Email is required!!</span>
              </p>
            )}
            {errors.email && (
              <p className="mt-2 text-xs text-red-600 ">
                <span className="font-medium">{errors.email.message}</span>
              </p>
            )}
            {/* password */}

            <div>
              <label className="font-medium">Password</label>
              <input
                {...register("password", { required: true, minLength: 8 })}
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="mt-2 text-xs text-red-600 ">
                <span className="font-medium">Password is required!!</span>
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="mt-2 text-xs text-red-600 ">
                <span className="font-medium">Password should be atleast 8 characters</span>
              </p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Login To Account
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
