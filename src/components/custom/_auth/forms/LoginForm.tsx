import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { loginUser } from "@/lib/actions/loginUser";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "At least 2 characters are expected" }),
  password: z
    .string()
    .min(8, { message: "This field should have at least 8 characters" })
    .max(16, { message: "Password too lengthy!" }),
});

const LoginForm = () => {
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    /**
     * Make an attempt to login and store the returned values to the store.
     */
    try {
      const response = await loginUser(values);
      if (response.statusText === "OK" && response.status === 200) {
        toast({
          title: "Login success",
          description: "User credentials verified successfully!",
        });
        // setTimeout(() => window.location.replace("/"), 2000);
      }
      console.log(response);
    } catch (error) {
      if (isAxiosError(error)) {
        if (
          error.response?.statusText === "Bad Request" &&
          error.response.status === 400
        ) {
          toast({
            title: "There was an issue with your request",
            description: `${error.response.data.non_field_errors}`,
            variant:"destructive"
          });
        }

        if (error.response?.status === 500) {
          toast({
            title: "Server Error",
            description:
              "An internal server error occurred. Please try again later.",
            variant: "destructive",
          });
        }
        
      }
      console.log(error);
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="sm:w-2/5 sm:mx-auto mx-4 text-xs my-28 sm:my-12">
        <h2 className="font-bold text-lg my-8">
          Please use your credentials to login.
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full flex mt-2">
            Sign in
          </Button>

          <p className="text-center">
            I don't have an account.{" "}
            <Link to={"/sign-up"} className="text-blue-700">
              Sign up here.
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
export default LoginForm;
