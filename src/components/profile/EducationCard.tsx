import type { Education } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, CalendarDays } from "lucide-react";

interface EducationCardProps {
  educationItem: Education;
}

export default function EducationCard({ educationItem }: EducationCardProps) {
  return (
    <Card className="mb-4 shadow-lg_ transition-all duration-300 hover:shadow-accent/20">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="font-headline text-xl text-accent">{educationItem.degree}</CardTitle>
            <CardDescription className="text-lg">{educationItem.institution}</CardDescription>
          </div>
          <GraduationCap className="h-8 w-8 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <CalendarDays className="h-4 w-4 mr-2" />
          <span>{educationItem.startDate} - {educationItem.endDate || 'Present'}</span>
        </div>
        <p className="text-foreground/90 whitespace-pre-wrap">{educationItem.description}</p>
      </CardContent>
    </Card>
  );
}
