import logo from "@/assets/logo.svg";
import rafiki from "@/assets/rafiki.svg";
import SkeletonCard from "@/components/custom-ui/SkeletonCard";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { loginSchema } from "@/schemas/login.schema";
import { useBanner } from "@/stores/banner.store";
import { useLogin } from "@/stores/login.store";
import { zodResolver } from "@hookform/resolvers/zod";
import he from "he";
import { ArrowLeft, Eye, EyeOff, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

function AuthLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const { query: banner } = useBanner();
  const { createMutation } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email_pic: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    createMutation?.mutateAsync(values);
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      <div className="mb-4 lg:absolute lg:mb-0 top-4 left-4 z-20">
        <Button
          variant="ghost"
          size="sm"
          className="p-2 h-auto text-gray-600 hover:text-gray-800 bg-white/80 backdrop-blur-sm rounded-lg"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Website BPDLH
        </Button>
      </div>

      <div className="flex-[2] bg-white p-6 lg:p-12 flex justify-center flex-col items-center">
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

        <div className="w-full max-w-md">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-8">
            Log In
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email_pic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl className="h-12">
                        <Input placeholder="user@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="h-12 relative">
                        <FormControl>
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="pr-10 h-12"
                            placeholder="example"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <div className="text-right">
                  <Button
                    variant="link"
                    className="p-0 h-auto text-green-600 hover:text-green-700 text-sm"
                  >
                    Lupa Sandi
                  </Button>
                </div>
              </div>
              <ShinyButton className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg text-2xl font-extrabold items-center justify-center flex">
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

          <div className="mt-6 text-center">
            <span className="text-gray-600 text-sm">Belum punya akun? </span>
            <Button
              variant="link"
              className="p-0 h-auto text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Daftar akun
            </Button>
          </div>
        </div>

        <div className="w-full max-w-md mt-8 lg:mt-12 space-y-2">
          <p className="text-sm font-medium text-gray-700">Kontak kami:</p>
          <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600">
            <a
              href="mailto:layanandanamasyarakat@bpdlh.id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className="flex items-center gap-1">
                <Mail className="h-3 w-3 text-green-600" />
                <span>layanandanamasyarakat@bpdlh.id</span>
              </Button>
            </a>
            <a
              href="https://wa.me/6281111812090"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3 text-green-600" />
                <span>Whatsapp</span>
              </Button>
            </a>
          </div>

          <TypingAnimation className="text-md text-gray-500">
            Jam layanan: Senin - Jumat 08.00 - 17.00
          </TypingAnimation>
        </div>
      </div>

      <div className="flex-[3] bg-linear-to-br from-[#17a449] to-[#A3C537] px-8 py-14 lg:px-30 lg:py-14 flex flex-col relative overflow-hidden gap-0 justify-start">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2 leading-tight">
            Selamat Datang di
          </h1>
          <h2 className="text-xl lg:text-3xl font-bold text-white leading-tight mb-8">
            Layanan Data Masyarakat untuk Lingkungan
          </h2>
        </div>

        <Card className="relative z-10 border-0 shadow-xl bg-yellow-400">
          <div className="absolute top-[-60px] right-[-100px] flex items-start justify-end">
            <img
              className="dark:invert"
              src={rafiki}
              alt=""
              width={200}
              height={200}
            />
          </div>
          <div className="bg-yellow-400 px-4 pb-8 rounded-t-lg">
            <h4 className="font-bold text-gray-800 text-center">INFORMASI</h4>
          </div>
          <CardContent className="p-4 bg-yellow-400 rounded-b-lg">
            <div className="container bg-white p-4 mt-[-2rem] rounded-lg text-wrap">
              {banner?.data?.data?.deskripsi ? (
                <div
                  className="text-justify"
                  dangerouslySetInnerHTML={{
                    __html: he.decode(banner.data?.data?.deskripsi),
                  }}
                />
              ) : (
                <SkeletonCard height="h-8" width="w-auto" />
              )}
            </div>
          </CardContent>
          <BorderBeam
            borderWidth={3}
            duration={8}
            size={600}
            delay={4}
            reverse
            className="from-transparent via-gray-100 to-transparent"
          />
          <BorderBeam
            borderWidth={3}
            duration={8}
            size={600}
            reverse
            className="from-transparent via-gray-100 to-transparent"
          />
        </Card>
      </div>
    </div>
  );
}

export default AuthLogin;
