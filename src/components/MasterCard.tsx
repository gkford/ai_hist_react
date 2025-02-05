import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MasterCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  header?: React.ReactNode;
  container1?: React.ReactNode;
  container2?: React.ReactNode;
  container3?: React.ReactNode;
  container4?: React.ReactNode;
}

export const MasterCard = React.forwardRef<HTMLDivElement, MasterCardProps>(
  ({ className, imageSrc, ...props }, ref) => {
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
          <div className="space-y-0">
            {container1 !== undefined ? container1 : (
              <div className="h-16 bg-primary/10 flex items-center justify-center w-full">
                <span className="text-sm">Container 1</span>
              </div>
            )}
            {container2 !== undefined ? container2 : (
              <div className="h-16 bg-secondary/10 flex items-center justify-center w-full">
                <span className="text-sm">Container 2</span>
              </div>
            )}
            {container3 !== undefined ? container3 : (
              <div className="h-16 bg-tertiary/10 flex items-center justify-center w-full">
                <span className="text-sm">Container 3</span>
              </div>
            )}
            {container4 !== undefined ? container4 : (
              <div className="h-16 bg-accent/10 flex items-center justify-center w-full">
                <span className="text-sm">Container 4</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

MasterCard.displayName = "MasterCard";
