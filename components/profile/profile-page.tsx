"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Mail, Phone, User } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Anne Creations",
    email: "admin@annecreations.com",
    phone: "+91 98765 43210",
    role: "Administrator",
    bio: "Experienced embroidery designer and business owner with over 10 years in the industry.",
    address: "123 Embroidery Lane, Mumbai, Maharashtra",
    joinDate: "January 15, 2020",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In a real app, you would save to backend here
    setIsEditing(false)
    // Show success message
    alert("Profile updated successfully!")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <Image
                  src="/abstract-geometric-shapes.png"
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-white shadow-md"
                />
                {isEditing && (
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-medium">{userData.name}</h3>
                <p className="text-sm text-muted-foreground">{userData.role}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    className="pl-8"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="pl-8"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    className="pl-8"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={userData.bio}
                  onChange={handleChange}
                  rows={4}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View your account details and membership.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                <p>{userData.joinDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                <p>{userData.role}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex gap-2">
                  <Input id="password" type="password" value="••••••••" disabled />
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-4">
            <p className="text-xs text-muted-foreground">
              Account created on {userData.joinDate}. All profile information is private and will not be shared with
              third parties.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
