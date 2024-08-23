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

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "This field should have at least 8 characters" })
    .max(16, { message: "Password too lengthy!" }),
});

const LoginForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    /**
     * Make an attempt to login and store the returned values to the store.
     */

    console.log(values);
  }
  return (
    <Form {...form}>
      <div className="sm:w-2/5 sm:mx-auto mx-4 text-xs my-28 sm:my-12">
        <h2 className="font-bold text-lg my-8">Please use your credentials to login.</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
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
