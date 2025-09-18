# Claude Code Instructions

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

## PolisData Platform Context

### Current Feature: Political Intelligence Platform
- **Branch**: 003-polisdata-political-intelligence
- **Stack**: Next.js 14+, React 18+, TypeScript, shadcn/ui, Tailwind CSS

### Key Development Principles
1. **100% shadcn/ui Components**: Use ONLY shadcn/ui components, no custom UI components
2. **No Hardcoded Colors**: ALL colors via CSS variables (--primary, --secondary, etc.)
3. **MCP Workflow**: Use `mcp__shadcn-ui` commands to get component blocks
4. **Mock-First**: AI data structures in lib/mock-data.ts before implementation

### CSS Variable Strategy
```css
/* Use these variables exclusively */
--primary, --secondary, --muted, --accent, --destructive
--chart-1 through --chart-5 for data visualization
--background, --foreground, --card, --border
```

### MCP Commands for Development
```bash
# List available components/blocks
mcp__shadcn-ui__list_components
mcp__shadcn-ui__list_blocks

# Get specific blocks
mcp__shadcn-ui__get_block dashboard-01
mcp__shadcn-ui__get_block data-table-01

# Get individual components
mcp__shadcn-ui__get_component button
mcp__shadcn-ui__get_component card
```

### AI Intelligence Data Structure
Key mock data types to simulate:
- `perceptionScore`: 0-100 consolidation metric
- `sentimentAnalysis`: positive/negative/neutral distribution
- `emergingNarratives`: AI-identified trending topics
- `behavioralArchetypes`: Audience classification patterns
- `influenceVector`: Network influence analysis

### Page Implementation Order
1. Global CSS variables setup (app/globals.css)
2. Mock data structures (lib/mock-data.ts)
3. Dashboard with KPI cards
4. CRM Kanban board
5. Politicians data table
6. Individual politician dashboard
7. WhatsApp campaign management
8. Social media monitoring
9. Notifications center

### Recent Technical Decisions
- Using Recharts for data visualization with CSS variables
- @dnd-kit for Kanban drag-and-drop functionality
- Faker.js for realistic mock data generation
- Real-time updates via React hooks and setInterval

### Testing Approach
- Unit tests with Jest and React Testing Library
- E2E tests with Playwright
- Mock data generators with consistent seeds
- Performance target: <3s load on 3G, <1s on WiFi