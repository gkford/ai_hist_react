import * as React from "react";
import { Card } from "@/components/ui/card";
import { UnthoughtProgress } from "@/components/ui/UnthoughtProgress";
import { DiscoveryProgress } from "@/components/ui/DiscoveryProgress";
import { cn } from "@/lib/utils";
import { useRTStore } from "@/store/useRTStore";
import { getTransformation } from "@/data/resourceTransformations";
import { useResourceStore } from "@/store/useResourceStore";

function investThought(rtId: string, totalThought: number, multiplier: number): void {
  // Validate multiplier is between 0 and 1
  if (multiplier < 0 || multiplier > 1) {
    console.warn('Thought multiplier must be between 0 and 1');
    return;
  }

  const rtStore = useRTStore.getState();
  const rtState = rtStore.states[rtId];
  const transformation = getTransformation(rtId);

  if (!rtState || !transformation) {
    return;
  }

  // Calculate thought to invest
  const thoughtToInvest = totalThought * multiplier;

  // Calculate new total invested thought
  const newThoughtInvested = rtState.thoughtInvested + thoughtToInvest;

  // Check if we've reached the imagination threshold
  if (newThoughtInvested >= transformation.thoughtToImagine) {
    // Upgrade status and reset thought investment
    rtStore.updateState(rtId, {
      ...rtState,
      thoughtInvested: 0,
      status: 'imagined'
    });
  } else {
    // Just update the invested thought amount
    rtStore.updateState(rtId, {
      ...rtState,
      thoughtInvested: newThoughtInvested
    });
  }
}

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
    // Add effect to handle thought investment based on focus
    React.useEffect(() => {
      if (!rtId || !rtState || rtState.status !== 'unthoughtof') return;
      
      const thoughtFocus = rtState.thought_focus;
      if (!thoughtFocus) return;

      const interval = setInterval(() => {
        // Get current thoughts from resource store
        const thoughts = useResourceStore.getState().resources.thoughts.amount;
        if (thoughts > 0) {
          // Convert percentage to decimal for multiplier
          investThought(rtId, thoughts, thoughtFocus / 100);
        }
      }, 1000); // Check every second

      return () => clearInterval(interval);
    }, [rtId, rtState?.thought_focus, rtState?.status]);


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
        {rtId && (
          <>
            <UnthoughtProgress rtId={rtId} />
            <DiscoveryProgress rtId={rtId} />
          </>
        )}
      </Card>
    );
  }
);

MasterCard.displayName = "MasterCard";

export { investThought };
