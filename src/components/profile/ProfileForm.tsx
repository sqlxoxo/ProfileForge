"use client";
import type { UserProfile, WorkExperience, Education } from "@/lib/types";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, PlusCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const workExperienceSchema = z.object({
  id: z.string().optional(), // Keep existing ID if editing
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"), // Could use date picker
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const educationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const profileFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  headline: z.string().min(1, "Headline is required"),
  bio: z.string().optional(),
  profilePictureUrl: z.string().url().optional().or(z.literal('')),
  email: z.string().email(), // Should be read-only or handled carefully
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  skills: z.array(z.string().min(1, "Skill cannot be empty")),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  initialProfileData?: UserProfile | null;
}

export default function ProfileForm({ initialProfileData }: ProfileFormProps) {
  const { updateProfile, currentUser, loading: authLoading } = useAuth();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialProfileData ? {
        ...initialProfileData,
        profilePictureUrl: initialProfileData.profilePictureUrl || '',
        linkedinUrl: initialProfileData.linkedinUrl || '',
        githubUrl: initialProfileData.githubUrl || '',
        portfolioUrl: initialProfileData.portfolioUrl || '',
      } : {
      fullName: currentUser?.fullName || "",
      headline: currentUser?.headline || "",
      bio: currentUser?.bio || "",
      profilePictureUrl: currentUser?.profilePictureUrl || "",
      email: currentUser?.email || "", // Email should likely be fixed
      linkedinUrl: currentUser?.linkedinUrl || "",
      githubUrl: currentUser?.githubUrl || "",
      portfolioUrl: currentUser?.portfolioUrl || "",
      workExperience: currentUser?.workExperience || [],
      education: currentUser?.education || [],
      skills: currentUser?.skills || [],
    },
  });

  useEffect(() => {
    if (initialProfileData) {
      form.reset({
        ...initialProfileData,
        profilePictureUrl: initialProfileData.profilePictureUrl || '',
        linkedinUrl: initialProfileData.linkedinUrl || '',
        githubUrl: initialProfileData.githubUrl || '',
        portfolioUrl: initialProfileData.portfolioUrl || '',
      });
    } else if (currentUser) {
       form.reset({
        ...currentUser,
        profilePictureUrl: currentUser.profilePictureUrl || '',
        linkedinUrl: currentUser.linkedinUrl || '',
        githubUrl: currentUser.githubUrl || '',
        portfolioUrl: currentUser.portfolioUrl || '',
      });
    }
  }, [initialProfileData, currentUser, form.reset, form]);


  const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({
    control: form.control,
    name: "workExperience",
  });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
    control: form.control,
    name: "education",
  });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  async function onSubmit(values: ProfileFormValues) {
    if (!currentUser) return; // Should not happen if on this page
    const profileToUpdate: UserProfile = {
      ...currentUser, // Preserve ID and other non-form fields
      ...values,
      id: currentUser.id, // Ensure ID is passed
      email: currentUser.email, // Ensure email is passed (usually not editable from here)
      workExperience: values.workExperience.map(w => ({...w, id: w.id || `work_${Date.now()}_${Math.random()}`})),
      education: values.education.map(e => ({...e, id: e.id || `edu_${Date.now()}_${Math.random()}`})),
    };
    await updateProfile(profileToUpdate);
  }

  if (authLoading && !currentUser) {
     return <div className="text-center p-8"><Loader2 className="h-8 w-8 animate-spin mx-auto" /> <p>Loading profile data...</p></div>;
  }


  return (
    <Card className="w-full mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline">Edit Your Profile</CardTitle>
        <CardDescription>Keep your professional identity up-to-date.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <Card>
              <CardHeader><CardTitle className="font-headline text-xl text-accent">Personal Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField name="fullName" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="headline" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Headline (e.g., Senior Developer at X)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="bio" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Bio</FormLabel><FormControl><Textarea rows={5} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="profilePictureUrl" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Profile Picture URL</FormLabel><FormControl><Input type="url" placeholder="https://example.com/image.png" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-headline text-xl text-accent">Contact & Links</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField name="email" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Email (Cannot be changed here)</FormLabel><FormControl><Input {...field} readOnly className="bg-muted/50" /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField name="linkedinUrl" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>LinkedIn Profile URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="githubUrl" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>GitHub Profile URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="portfolioUrl" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Portfolio/Website URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            {/* Work Experience Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline text-xl text-accent">Work Experience</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendWork({ id: `new_work_${Date.now()}`, company: "", role: "", startDate: "", description: "" })}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {workFields.map((item, index) => (
                  <Card key={item.id} className="p-4 space-y-3 relative">
                    <FormField name={`workExperience.${index}.company`} control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField name={`workExperience.${index}.role`} control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Role</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField name={`workExperience.${index}.startDate`} control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="text" placeholder="YYYY-MM" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField name={`workExperience.${index}.endDate`} control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>End Date (optional)</FormLabel><FormControl><Input type="text" placeholder="YYYY-MM or Present" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField name={`workExperience.${index}.description`} control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeWork(index)}><Trash2 className="h-4 w-4" /></Button>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline text-xl text-accent">Education</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendEdu({id: `new_edu_${Date.now()}`, institution: "", degree: "", startDate: "", description: "" })}>
                   <PlusCircle className="mr-2 h-4 w-4" /> Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {eduFields.map((item, index) => (
                  <Card key={item.id} className="p-4 space-y-3 relative">
                    <FormField name={`education.${index}.institution`} control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField name={`education.${index}.degree`} control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Degree/Certificate</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <div className="grid grid-cols-2 gap-4">
                      <FormField name={`education.${index}.startDate`} control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="text" placeholder="YYYY-MM" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField name={`education.${index}.endDate`} control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>End Date (optional)</FormLabel><FormControl><Input type="text" placeholder="YYYY-MM or Present" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField name={`education.${index}.description`} control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Description/Details</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeEdu(index)}><Trash2 className="h-4 w-4" /></Button>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card>
               <CardHeader className="flex flex-row items-center justify-between">
                 <CardTitle className="font-headline text-xl text-accent">Skills</CardTitle>
                 <Button type="button" variant="outline" size="sm" onClick={() => appendSkill("")}>
                   <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
                 </Button>
               </CardHeader>
              <CardContent className="space-y-2">
                {skillFields.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <FormField name={`skills.${index}`} control={form.control} render={({ field }) => (
                      <FormItem className="flex-grow"><FormControl><Input placeholder="e.g., JavaScript" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90" disabled={form.formState.isSubmitting || authLoading}>
              {form.formState.isSubmitting || authLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
