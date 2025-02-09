import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRTStore } from "@/store/useRTStore";

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
      <Card ref={ref} className={cn("w-[400px] h-[543px] overflow-hidden", className)} {...props}>
        {header ? header : (
          <div className="flex items-center justify-between p-4">
            <h3 className="text-xl font-semibold">{title || "Master Card"}</h3>
            <div className="flex gap-2">
              {typeIcon === null ? null : (
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {typeIcon || ""}
                </span>
              )}
              {discoveryStatusIcon === null ? null : (
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {discoveryStatusIcon || ""}
                </span>
              )}
            </div>
          </div>
        )}
        {/* <CardContent className="p-0 flex flex-col" style={{ minHeight: "373px" }}> */}
          {children || (
            <div className="h-full flex items-center justify-center text-gray-400">
              No content here
            </div>
          )}
        {/* </CardContent> */}
      </Card>
    );
  }
);

MasterCard.displayName = "MasterCard";
