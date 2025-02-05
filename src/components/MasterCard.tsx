import * as React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MasterCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const MasterCard = React.forwardRef<HTMLDivElement, MasterCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow", className)} {...props}>
        {children}
      </Card>
    );
  }
);

MasterCard.displayName = "MasterCard";

export { CardHeader, CardContent, CardFooter, CardTitle, CardDescription };
