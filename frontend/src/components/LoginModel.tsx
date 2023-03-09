import { useForm } from 'react-hook-form';
import { User } from '../typing/user';
import { LoginCredentials } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
interface LoginModelProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}
const LoginModel = ({ onDismiss, onSignUpSuccessful }: LoginModelProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();
  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await NotesApi.login(credentials);
      onSignUpSuccessful(user);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  return (
    <form
      id="loginForm"
      onSubmit={handleSubmit(onSubmit)}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
    >
      <div className="relative z-50 w-1/2 max-w-2xl p-6 mx-auto bg-white rounded-md shadow-lg">
        <h2 className="font-bold text-lg border-b-2 mb-4">Login</h2>
        <div className="flex flex-col justify-between items-start space-y-2">
          <div className="w-full">
            <h2>username</h2>
            <input
              {...register('username', { required: 'Required' })}
              placeholder="username"
              type="text"
              className=" py-2 text-xs sm:text-lg font-semibold border-2 w-full placeholder:text-sm placeholder:opacity-70"
            />
            <div className=" text-red-600">{errors.username?.message}</div>
          </div>

          <div className="w-full">
            <h2>password</h2>
            <input
              {...register('password', { required: 'Required' })}
              placeholder="password"
              type="password"
              className="py-2 text-xs sm:text-lg font-semibold border-2 w-full placeholder:text-sm placeholder:opacity-70"
            />
            <div className=" text-red-600">{errors.password?.message}</div>
          </div>
        </div>
        <div className="mb-4">{/* Add your modal content here */}</div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-1 md:p-2 rounded mr-2"
            onClick={onDismiss}
          >
            Close
          </button>
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 md:p-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginModel;
