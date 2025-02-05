# Card Layout Approach

## Overview
This project uses a composition-based approach for card components. The `MasterCard` component provides a consistent layout that includes:
- A header section (optional; can be customized)
- An image section (with a default or provided image)
- A content area managed via the `children` prop

In the default version of the MasterCard (when no custom children are provided), the card displays four 'attribute_container' sections, each forced to the same height (h-16) with overflow hidden. Each container uses a distinct pastel background color, making it clear that four separate sections exist. This ensures consistency in the default layout and highlights the idea of 'attribute_containers' on the card.

In the default version of the MasterCard (when no custom children are provided), the card displays four 'attribute_container' sections, each forced to the same height (h-16) with overflow hidden. Each container uses a distinct pastel background color, making it clear that four separate sections exist. This ensures consistency in the default layout and highlights the idea of 'attribute_containers' on the card.

Child components (such as `ScienceCard`, `PersonCard`, and `HominidCard`) supply their unique content as children to `MasterCard`. This separation of concerns allows for:
- **Flexibility:** Easily swap or update card content without modifying the core layout.
- **Consistency:** All cards adhere to a unified layout defined in `MasterCard`.
- **Simplicity:** Child components only focus on their unique features.

## Key Benefits
- **Reusability:** Shared layout logic is centralized in `MasterCard`.
- **Extensibility:** New types of cards can be created without altering the base layout.
- **Customization:** Cards can include static, dynamic, or interactive elements in their content area.

## Usage Example
```tsx
<MasterCard
  header={<div>Your Header Content</div>}
  imageSrc="/path/to/image.svg"
>
  <div>
    {/* Your dynamic or interactive card content goes here */}
  </div>
</MasterCard>
```

This document serves as context for developers and LLM coding assistants working on this project.
