import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "@/components/ui/CardInfo"
import { ResourceTransformation } from "@/components/ui/ResourceTransformation"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useResource } from "@/store/useResourceStore"
import { getTransformation } from "@/data/resourceTransformations"
import { cn } from "@/lib/utils"
import { useRTStore } from "@/store/useRTStore"

interface RTSliderCardProps {
  title: string
  typeIcon: string
  imageSrc: string
  rtId: string
}

export function RTSliderCard({ title, typeIcon, imageSrc, rtId }: RTSliderCardProps) {
  const transformation = getTransformation(rtId)
  const { states, updateState } = useRTStore()
  const rtState = states[rtId]

  // Get resources for displaying icons
  const resourcesForDisplay = transformation?.inbound.concat(transformation?.outbound || [])
    .map(item => useResource(item.key))

  // Only show slider if transformation.eating is false and status is discovered
  const showSlider = !transformation?.eating && rtState.status === 'discovered';

  const handlePriorityClick = () => {
    const currentPriority = rtState.priority;
    
    // Check if this is the last active RT
    const otherActiveRTs = Object.entries(states)
      .filter(([id, state]) => id !== rtId && state.priority !== 'none');
    
    // If this is the last active RT and it's not already 'none', skip 'none'
    if (otherActiveRTs.length === 0 && currentPriority !== 'none') {
      updateState(rtId, {
        ...rtState,
        priority: currentPriority === 'high' ? 'low' : 'high'
      });
      return;
    }

    // Normal priority cycling
    const newPriority = currentPriority === 'high' ? 'low' : 
                       currentPriority === 'low' ? 'none' : 'high';
    
    updateState(rtId, {
      ...rtState,
      priority: newPriority
    });
  };

  // Calculate energy distribution
  const calculateEnergyFocus = () => {
    const allRTs = Object.values(states);
    const highPriorityRTs = allRTs.filter(rt => rt.priority === 'high');
    const lowPriorityRTs = allRTs.filter(rt => rt.priority === 'low');
    
    if (rtState.priority === 'none') return 0;
    
    if (highPriorityRTs.length === 0 && lowPriorityRTs.length === 0) {
      const activeRTs = allRTs.filter(rt => rt.priority !== 'none');
      return activeRTs.length > 0 ? 100 / activeRTs.length : 0;
    }

    if (rtState.priority === 'high') {
      return highPriorityRTs.length > 0 ? 75 / highPriorityRTs.length : 0;
    }

    if (rtState.priority === 'low') {
      return lowPriorityRTs.length > 0 ? 25 / lowPriorityRTs.length : 0;
    }

    return 0;
  };

  const energyFocus = calculateEnergyFocus();

  if (!transformation) return null

  const simplifiedText = `⚡ → ${transformation.outbound.map(item => {
    const resource = resourcesForDisplay?.find(r => r.key === item.key);
    return `${item.amount}${resource?.icon || ''}`
  }).join(' ')}`;

  return (
    <MasterCard title={title} typeIcon={typeIcon} discoveryStatusIcon={null} rtId={rtId}>
      <CardImage imageSrc={imageSrc} rtId={rtId} />
      {showSlider && (
        <div className="px-8 w-full py-4">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Progress 
                value={energyFocus} 
                label={`⚡focus - ${Math.round(energyFocus)}%`}
              />
            </div>
            <Button 
              onClick={handlePriorityClick}
              className={cn(
                "transition-colors w-32",
                rtState.priority === 'high' ? 'bg-green-500 hover:bg-green-600 text-white' : 
                rtState.priority === 'low' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 
                'bg-white hover:bg-gray-100 text-black border border-gray-200'
              )}
            >
              {rtState.priority === 'high' ? 'High Priority' :
               rtState.priority === 'low' ? 'Low Priority' : 'Off'}
            </Button>
          </div>
        </div>
      )}
      <ResourceTransformation rtId={rtId} transformationText={simplifiedText} />
    </MasterCard>
  )
}
