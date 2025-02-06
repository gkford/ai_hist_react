# Resource Management Approach

This document outlines our strategy for managing resources (Food, Knowledge, and Thoughts) in our game using Zustand and a modular card-based system.

## Table of Contents
1. [Overview](#overview)  
2. [State Architecture](#state-architecture)  
3. [Gathering Contributions from Multiple Cards](#gathering-contributions-from-multiple-cards)  
4. [Applying Effects and Multipliers](#applying-effects-and-multipliers)  
5. [Future Expansion](#future-expansion)

---

## 1. Overview
Our game manages three primary resources (Food, Knowledge, Thoughts). We use a global store (via [Zustand](https://github.com/pmndrs/zustand)) to maintain the “current amount” and a “rate” for each resource. Cards, such as “Gather Food,” contribute to these global resource rates. Over time (e.g., every second), we add the rates to the total resource amounts.

## 2. State Architecture
1. **Zustand Store**:  
   - Holds each resource’s current total (e.g., `food`, `knowledge`, `thoughts`).  
   - Holds each resource’s rate (`foodRate`, `knowledgeRate`, `thoughtsRate`).  
   - Has a method (e.g., `tick()`) to add each rate to its respective resource total.  
   - Allows simple, direct updating of resource values.

2. **Update Loop**:  
   - Driven by a React component (often a small “engine” component with a `useEffect` + `setInterval`).  
   - Calls `tick()` every second to apply the current rates to the resource totals.

## 3. Gathering Contributions from Multiple Cards
Currently, each card can directly manipulate the global `*Rate` property (e.g., `foodRate`) in the store. However, once multiple cards produce the same resource, we’ll need a more scalable pattern:
1. **Card Registrations**:  
   - Each card can register its contribution with the global store (e.g., `store.addContribution(cardId, rateValue)`).
2. **Store Summation**:  
   - The store keeps an object or array of all active contributions (e.g., `{ [cardId]: number }`).  
   - When a card’s contribution changes (e.g., changing worker count), the card updates *only* its entry.  
   - The store sums all contributions when calculating the final `foodRate`.  
3. **Consistent Recalculation**:  
   - Each `tick()` can dynamically compute `foodRate` by summing all active entries.  
   - Alternatively, a “recalc” function can run whenever a contribution changes.

## 4. Applying Effects and Multipliers
Many cards or buildings will apply buffs (e.g., “+10% Food Rate”):
1. **Identify Buff Sources**:  
   - If a card applies a flat multiplier (`+10%`), the store can keep a list of active multipliers for that resource.  
   - For example, an array of percentage changes: `[1.10, 1.20, ...]`.
2. **Multiply in Sequence**:  
   - Compute a base rate from summing all card contributions.  
   - Multiply by each active bonus in turn (e.g., baseRate * 1.10 * 1.20).  
   - Store the final result in `foodRate`.  
3. **Conditional Buffs**:  
   - Some buffs may apply only if certain conditions are met (e.g., “if you have at least 10 workers in total, get +15% Food Rate”).  
   - Evaluate those conditions in the store’s logic or in a card that triggers the buff’s activation.

## 5. Future Expansion
1. **Multiple Resource Types per Card**:  
   - A single card could produce Food and Knowledge. We’ll expand the store to handle multiple contributions (e.g., `foodContributions`, `knowledgeContributions`, etc.).  
2. **Global vs. Local Card State**:  
   - Worker counts could be stored in each card’s component state or in the global store. For many copies of a card, we prefer the global store for easy summation.  
3. **Complex Synergies**:  
   - Cards might interact with each other (e.g., “Double your Food Rate if you have a Hunter card in play”).  
   - This can be managed by having the store track which cards are active, then applying logic in a function that calculates total rates.  

By following these guidelines, we’ll ensure a robust, modular system where new cards and effects can easily be added without changing the underlying architecture.
