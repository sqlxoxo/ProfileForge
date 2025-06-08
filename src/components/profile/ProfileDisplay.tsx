import type { UserProfile } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Linkedin, Github, Globe, Briefcase, GraduationCap, Wrench, UserCircle } from "lucide-react";
import WorkExperienceCard from "./WorkExperienceCard";
import EducationCard from "./EducationCard";
import SkillBadge from "./SkillBadge";
import { Separator } from "../ui/separator";

interface ProfileDisplayProps {
  profile: UserProfile;
}

export default function ProfileDisplay({ profile }: ProfileDisplayProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <Card className="w-full mx-auto shadow-2xl overflow-hidden">
      <CardHeader className="bg-primary/10 p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-32 w-32 border-4 border-accent shadow-lg">
            <AvatarImage src={profile.profilePictureUrl} alt={profile.fullName} data-ai-hint="profile avatar" />
            <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
              {profile.fullName ? getInitials(profile.fullName) : <UserCircle />}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-headline text-foreground">{profile.fullName}</h1>
            <p className="text-xl text-accent font-medium">{profile.headline}</p>
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center text-muted-foreground hover:text-accent mt-1">
                <Mail className="h-4 w-4 mr-2" /> {profile.email}
              </a>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-8">
        
        <section>
          <h2 className="text-2xl font-headline text-accent mb-4">About Me</h2>
          <p className="text-foreground/90 whitespace-pre-wrap">{profile.bio || "No bio provided."}</p>
        </section>
        
        <Separator />

        <section>
          <h2 className="text-2xl font-headline text-accent mb-4 flex items-center"><Briefcase className="h-6 w-6 mr-3" />Work Experience</h2>
          {profile.workExperience.length > 0 ? (
            profile.workExperience.map(exp => <WorkExperienceCard key={exp.id} experience={exp} />)
          ) : (
            <p className="text-muted-foreground">No work experience listed.</p>
          )}
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-headline text-accent mb-4 flex items-center"><GraduationCap className="h-6 w-6 mr-3" />Education</h2>
          {profile.education.length > 0 ? (
            profile.education.map(edu => <EducationCard key={edu.id} educationItem={edu} />)
          ) : (
            <p className="text-muted-foreground">No education listed.</p>
          )}
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-headline text-accent mb-4 flex items-center"><Wrench className="h-6 w-6 mr-3" />Skills</h2>
          {profile.skills.length > 0 ? (
            <div className="flex flex-wrap">
              {profile.skills.map(skill => <SkillBadge key={skill} skill={skill} />)}
            </div>
          ) : (
            <p className="text-muted-foreground">No skills listed.</p>
          )}
        </section>
        
        {(profile.linkedinUrl || profile.githubUrl || profile.portfolioUrl) && <Separator />}

        <section>
            <h2 className="text-2xl font-headline text-accent mb-4">Connect</h2>
            <div className="flex flex-wrap gap-4">
            {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-muted-foreground hover:text-accent">
                <Linkedin className="h-5 w-5 mr-2" /> LinkedIn
                </a>
            )}
            {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-muted-foreground hover:text-accent">
                <Github className="h-5 w-5 mr-2" /> GitHub
                </a>
            )}
            {profile.portfolioUrl && (
                <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-muted-foreground hover:text-accent">
                <Globe className="h-5 w-5 mr-2" /> Portfolio
                </a>
            )}
            </div>
            {!profile.linkedinUrl && !profile.githubUrl && !profile.portfolioUrl && (
                 <p className="text-muted-foreground">No contact links provided.</p>
            )}
        </section>

      </CardContent>
    </Card>
  );
}
