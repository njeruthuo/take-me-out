import { z } from "zod";
import { Gender } from "@/lib/types";
import { isAxiosError } from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createUser } from "@/lib/actions/createUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "This field should have at least 8 characters" })
    .max(16, { message: "Password too lengthy!" }),
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  gender: z.string().min(2).max(50),
  phone_number: z.string().min(10).max(10),
  date_of_birth: z.string().min(2).max(50),
});

const SignupForm = () => {
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      gender: "",
      phone_number: "",
      date_of_birth: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const results = await createUser(values);

      if (results.status === 201 && results.statusText == "Created") {
        toast({
          title: "Sign up success",
          description: "You will be redirected shortly.",
        });
        // Redirect to login or another page after success
        window.location.replace("/sign-in");
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        // Accessing the response data directly from the error object
        const errResponse = error.response?.data;

        if (errResponse?.username) {
          toast({
            title: "Username already used",
            description: "Try a different username.",
            variant: "destructive",
          });
        }
        if (errResponse?.email) {
          toast({
            title: "Email already exists",
            description: `A user with this email already exists.`,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Unexpected error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        });
      }

      // console.log(`An Error occurred: ${error}`);
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-2/5 sm:mx-auto mx-4 text-xs">
        <h2 className="text-center my-8 sm:my-4">
          Please fill the form to create an account.
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Names */}
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone number */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of birth */}
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} placeholder="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value as Gender}
                    className="flex justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
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
            Create account
          </Button>

          <p className="text-center">
            I already have an account.{" "}
            <Link to={"/sign-in"} className="text-blue-700">
              Login here.
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
export default SignupForm;
