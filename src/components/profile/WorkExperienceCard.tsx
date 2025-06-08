import type { WorkExperience } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CalendarDays } from "lucide-react";

interface WorkExperienceCardProps {
  experience: WorkExperience;
}

export default function WorkExperienceCard({ experience }: WorkExperienceCardProps) {
  return (
    <Card className="mb-4 shadow-lg_ transition-all duration-300 hover:shadow-accent/20">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="font-headline text-xl text-accent">{experience.role}</CardTitle>
            <CardDescription className="text-lg">{experience.company}</CardDescription>
          </div>
          <Briefcase className="h-8 w-8 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <CalendarDays className="h-4 w-4 mr-2" />
          <span>{experience.startDate} - {experience.endDate || 'Present'}</span>
        </div>
        <p className="text-foreground/90 whitespace-pre-wrap">{experience.description}</p>
      </CardContent>
    </Card>
  );
}
