import { Badge } from "@/components/ui/badge";
import { Wrench } from "lucide-react"; // Or Lightbulb, Sparkles

interface SkillBadgeProps {
  skill: string;
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <Badge variant="secondary" className="text-sm py-1 px-3 m-1 shadow-md">
      <Wrench className="h-3 w-3 mr-1.5" />
      {skill}
    </Badge>
  );
}
