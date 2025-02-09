import * as React from "react";
import { Card } from "@/components/ui/card";
import { DiscoveryProgress } from "@/components/ui/DiscoveryProgress";
import { cn } from "@/lib/utils";
import { useRTStore } from "@/store/useRTStore";
import { getTransformation } from "@/data/resourceTransformations";
import { useResourceStore } from "@/store/useResourceStore";


export interface MasterCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  header?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  typeIcon?: string | null;
  discoveryStatusIcon?: string | null;
  rtId?: string;
}

export const MasterCard = React.forwardRef<HTMLDivElement, MasterCardProps>(
  ({ className, imageSrc, header, title, children, typeIcon, discoveryStatusIcon, rtId, ...props }, ref) => {
    const rtState = rtId ? useRTStore(state => state.states[rtId]) : null;
    const isUnthoughtof = rtState?.status === 'unthoughtof';
    
    const transformation = rtId ? getTransformation(rtId) : null;


    // Function to replace text with question marks
    const obscureText = (text: string) => {
      return text.replace(/[^\s]/g, '?');
    };

    // Function to wrap children with text obscuring if needed
    const processChildren = (children: React.ReactNode): React.ReactNode => {
      if (!isUnthoughtof) return children;

      if (typeof children === 'string') {
        return obscureText(children);
      }

      if (React.isValidElement(children)) {
        const childProps = { ...children.props };
        
        // Process text content in specific components
        if (childProps.children) {
          childProps.children = processChildren(childProps.children);
        }

        // Replace icons with ? in specific cases
        if (children.type === 'img') {
          return React.cloneElement(children, { 
            ...childProps,
            alt: '?',
            className: cn(children.props.className, 'opacity-50')
          });
        }

        return React.cloneElement(children, childProps);
      }

      if (Array.isArray(children)) {
        return children.map((child, index) => (
          <React.Fragment key={index}>
            {processChildren(child)}
          </React.Fragment>
        ));
      }

      return children;
    };
    return (
      <Card ref={ref} className={cn("w-[400px] h-[543px] overflow-hidden flex flex-col", className)} {...props}>
        {header ? header : (
          <div className="flex items-center justify-between p-4">
            <h3 className="text-xl font-semibold">
              {isUnthoughtof ? obscureText(title || "Master Card") : (title || "Master Card")}
            </h3>
            <div className="flex gap-2">
              {typeIcon === null ? null : (
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {isUnthoughtof ? "?" : (typeIcon || "")}
                </span>
              )}
              {discoveryStatusIcon === null ? null : (
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {isUnthoughtof ? "?" : (discoveryStatusIcon || "")}
                </span>
              )}
            </div>
          </div>
        )}
        <div className="flex-1">
          {isUnthoughtof ? processChildren(children) : children || (
            <div className="h-full flex items-center justify-center text-gray-400">
              No content here
            </div>
          )}
        </div>
        {rtId && <DiscoveryProgress rtId={rtId} />}
      </Card>
    );
  }
);

MasterCard.displayName = "MasterCard";

