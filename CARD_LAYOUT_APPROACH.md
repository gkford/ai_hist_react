# Card Layout Approach

## Overview
This project uses a composition-based approach for card components. The `MasterCard` component provides a consistent layout that includes:
- A header section (optional; can be customized)
- An image section (with a default or provided image)
- A content area managed via the `children` prop

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
