import logo from "@/assets/logo.svg";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import {
  ForgetPassword,
  type forgetPasswordSFormType,
} from "@/schemas/auth.schema";
import { useForgetPassword } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function AuthLogin() {
  const navigate = useNavigate();
  const { createMutation } = useForgetPassword();

  const form = useForm<forgetPasswordSFormType>({
    resolver: zodResolver(ForgetPassword),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: forgetPasswordSFormType) {
    createMutation?.mutate({ email: values.email });
  }

  useEffect(() => {
    if (createMutation?.isSuccess) {
      navigate("/auth/login");
    }
  }, [createMutation?.isSuccess]);

  return (
    <div className="min-h-screen flex h-[100vh]">
      <div className="w-full bg-linear-to-br from-[#17a449] to-[#A3C537] p-6 lg:p-12 flex justify-center flex-col items-center">
        <div className="w-full max-w-md mb-8 lg:mb-12">
          <div className="flex gap-2 text-center items-center justify-center">
            <img
              className="dark:invert"
              src={logo}
              alt=""
              width={250}
              height={250}
            />
          </div>
        </div>

        <div className="w-full bg-card max-w-3xl rounded-2xl p-6">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-8">
            Lupa Password
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            placeholder="user@example.com"
                            {...field}
                            className="pl-8 h-10"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right">
                  <Button
                    variant="link"
                    className="p-0 h-auto text-green-600 hover:text-green-700 text-sm"
                    onClick={() => navigate("/auth/login")}
                  >
                    Kembali halaman LOGIN
                  </Button>
                </div>
              </div>
              <ShinyButton
                type="submit"
                disabled={createMutation?.isPending}
                className="w-full h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg text-2xl font-extrabold items-center justify-center flex"
              >
                {createMutation?.isPending ? (
                  <div className="flex items-center justify-center">
                    <Spinner className="text-white" size={20} />
                  </div>
                ) : (
                  "Log In"
                )}
              </ShinyButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;
