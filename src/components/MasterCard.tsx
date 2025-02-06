import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MasterCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
  typeIcon?: string | null;
  discoveryStatusIcon?: string | null;
}

export const MasterCard = React.forwardRef<HTMLDivElement, MasterCardProps>(
  ({ className, imageSrc, header, children, typeIcon, discoveryStatusIcon, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("w-[400px] overflow-hidden", className)} {...props}>
        {header ? header : (
          <div className="flex items-center justify-between p-4">
            <h3 className="text-xl font-semibold">Master Card</h3>
            <div className="flex gap-2">
              {typeIcon === null ? null : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-pink-500">
                  {typeIcon || ""}
                </div>
              )}
              {discoveryStatusIcon === null ? null : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-pink-500">
                  {discoveryStatusIcon || ""}
                </div>
              )}
            </div>
          </div>
        )}
        <CardContent className="p-0 flex flex-col" style={{ minHeight: "373px" }}>
          {children || (
            <div className="h-full flex items-center justify-center text-gray-400">
              No content here
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

MasterCard.displayName = "MasterCard";
