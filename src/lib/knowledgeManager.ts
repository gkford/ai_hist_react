import { useResourceStore } from "@/store/useResourceStore";
import { useCardsStore } from "@/store/useCardsStore";
import { useKnowledgeLevelStore } from "@/store/useKnowledgeLevelStore";
import { allCards } from "@/data/cards";
import { logger } from "./logger";

export function processKnowledgeLevel() {
  const resourceStore = useResourceStore.getState();
  const cardStore = useCardsStore.getState();
  const knowledgeLevelStore = useKnowledgeLevelStore.getState();
  
  const currentKnowledge = resourceStore.resources.knowledge.amount[0];
  const { level, thresholds } = knowledgeLevelStore;
  
  // Check if we should level up
  if (currentKnowledge >= thresholds[level]) {
    logger.log(`Knowledge level up: ${level} -> ${level + 1}`);
    knowledgeLevelStore.setLevel(level + 1);
    
    // Find cards that should be replaced at this new level
    const newCards = allCards.filter(card => 
      card.knowledge_level === level + 1 && card.replaces
    );
    
    // Replace old cards with new ones
    newCards.forEach(newCard => {
      if (newCard.replaces) {
        const oldCard = cardStore.cardStates[newCard.replaces];
        if (oldCard) {
          // Create the new card, preserving RT states and focus priorities
          cardStore.createCard(newCard.id, {
            discovery_state: {
              ...oldCard.discovery_state,
              current_status: 'discovered' // Ensure the new card starts discovered
            }
          });
          
          // Copy over RT focus priorities from old card to new card
          Object.entries(oldCard.rts).forEach(([rtId, rtState]) => {
            cardStore.updateRTState(newCard.id, rtId, {
              focus: rtState.focus,
              last_process_time: rtState.last_process_time
            });
          });
          
          // Remove old card
          cardStore.removeCard(newCard.replaces);
        }
      }
    });
  }
}
