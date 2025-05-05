## Project Introduction
### Tech Stack
- NextJS 15: 
- TailwindCSS V4: Styling
- React Query: Data Fetching
- Zustand: State Management
- Backend: HonoJS - Cloudflare worker (NEXT_PUBLIC_BACKEND_URL)


## Project Rules
- Always use TailwindCSS V4
- Always use React Query to fetch data
- Auth using Better-auth
- Always using Skeleton to handle isLoading state
- Component put in `/src/components/*`
## Code convention
- Example Component:
```tsx
import equal from "fast-deep-equal"
interface ComponentProps {
  title: string
}

const PureComponent = ({ title }: ComponentProps) => {
  return (
    ...
  )
}
export const Component = memo(PureComponent, 
  // Check important props change to re-render the component
  if(!equal(prevProps.title, nextProps.title)) return false

  // If return true, won't re-render the component
  return true
)
```

# Road Map
- [x] Better-auth
- [x] Intercepting Routes + Paralel route for Login, Settings, etc.
- [ ] tRPC
- [ ] CopilotKit
- [ ] AI SDK
- [ ] Payment with Polar using Better-auth
