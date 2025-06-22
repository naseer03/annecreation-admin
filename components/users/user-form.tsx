"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.string({
    required_error: "Please select a role.",
  }),
  status: z.boolean().default(true),
})

type UserFormValues = z.infer<typeof userFormSchema>

export function UserForm({ user }: { user: any }) {
  // Default values when creating a new user
  const defaultValues: Partial<UserFormValues> = {
    name: "",
    email: "",
    password: "",
    role: "support",
    status: true,
  }

  // If editing, use the user data
  const initialValues = user
    ? {
        name: user.name,
        email: user.email,
        password: "",
        role: user.role.toLowerCase(),
        status: user.status === "Active",
      }
    : defaultValues

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialValues,
  })

  function onSubmit(data: UserFormValues) {
    console.log(data)
    // In a real app, you would submit this data to your backend
  }

  return (
    <Form {...form}>
      <form id="user-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{user ? "New Password (leave blank to keep current)" : "Password"}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} required={!user} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="administrator">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>This determines what permissions the user will have.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active Status</FormLabel>
                  <FormDescription>Disable to temporarily revoke user access.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
