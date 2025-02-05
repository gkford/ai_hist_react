import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MasterCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export const MasterCard = React.forwardRef<HTMLDivElement, MasterCardProps>(
  ({ className, imageSrc, header, container1, container2, container3, container4, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("w-[400px] overflow-hidden", className)} {...props}>
        {header ? header : (
          <div className="flex items-center justify-between p-4">
            <h3 className="text-xl font-semibold">Master Card</h3>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">📦</div>
          </div>
        )}
        <div className="relative w-full aspect-[3/1]">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt="Master Card"
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-0 flex flex-col" style={{ minHeight: "240px" }}>
          {children}
        </CardContent>
      </Card>
    );
  }
);

MasterCard.displayName = "MasterCard";
