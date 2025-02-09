import * as React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useRTStore } from "@/store/useRTStore";
import { getTransformation } from "@/data/resourceTransformations";

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
    const showProgressBar = isUnthoughtof && rtState && transformation;
    const progressValue = showProgressBar 
      ? (rtState.thoughtInvested / transformation.thoughtToImagine) * 100
      : 0;

    const handleThoughtSliderChange = (value: number[]) => {
      if (!rtId || !rtState) return;
      useRTStore.getState().updateState(rtId, {
        ...rtState,
        thought_focus: value[0]
      });
    };

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
        {showProgressBar && (
          <div className="p-4 mt-auto">
            <div className="mb-4">
              <div className="text-sm text-center mb-1">Thought Focus</div>
              <Slider
                defaultValue={[rtState?.thought_focus ?? 0]}
                value={[rtState?.thought_focus ?? 0]}
                max={100}
                step={1}
                onValueChange={handleThoughtSliderChange}
                className="w-full"
                aria-label="Thought Focus"
              />
              <div className="text-sm text-gray-500 mt-1 text-center">
                {rtState?.thought_focus ?? 0}%
              </div>
            </div>
            <div className="text-sm text-center mb-1">Progress to imagining</div>
            <Progress value={progressValue} className="w-full" />
          </div>
        )}
      </Card>
    );
  }
);

MasterCard.displayName = "MasterCard";
