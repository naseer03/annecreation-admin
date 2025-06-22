"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const roleFormSchema = z.object({
  name: z.string().min(2, {
    message: "Role name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

type RoleFormValues = z.infer<typeof roleFormSchema>

export function RoleForm({ role }: { role: any }) {
  // Default values when creating a new role
  const defaultValues: Partial<RoleFormValues> = {
    name: "",
    description: "",
  }

  // If editing, use the role data
  const initialValues = role
    ? {
        name: role.name,
        description: role.description,
      }
    : defaultValues

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: initialValues,
  })

  function onSubmit(data: RoleFormValues) {
    console.log(data)
    // In a real app, you would submit this data to your backend
  }

  return (
    <Form {...form}>
      <form id="role-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role Name</FormLabel>
                <FormControl>
                  <Input placeholder="Manager" {...field} />
                </FormControl>
                <FormDescription>A unique name for this role.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the permissions and responsibilities of this role" {...field} />
                </FormControl>
                <FormDescription>A clear description of what this role can do.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
