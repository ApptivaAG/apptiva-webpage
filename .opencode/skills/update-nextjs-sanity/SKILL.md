---
name: update-nextjs-sanity
description: Use when updating dependencies or checking security vulnerabilities for this Next.js + Sanity project.
---

# Update Next.js + Sanity Webpage

## Workflows

### 1. Security Check

```bash
pnpm run vulns
```

### 2. Safe Dependency Update

```bash
git status                  # Ensure clean working directory
pnpm run vulns              # Baseline scan
pnpm update                 # Auto-respects ignored dependencies
pnpm run build              # Verify build works
pnpm run lint
pnpm tsc --noEmit
pnpm run vulns              # Post-update scan
```

### 3. Docker Build Test

```bash
./docker-test.sh
```

Builds and runs the Docker image locally with environment variables from `.env.local`.
Tests the production build in a containerized environment.

### 4. Sanity Schema Validation

```bash
pnpm tsc --noEmit src/sanity/schemas/**/*.ts
node -e "require('./sanity.config.ts')"
```

---

## Important Notes

**Ignored dependencies** (never auto-update):

- `remark-gfm`
- `next-mdx-remote`

**Sanity packages** hoisted via `.npmrc`:

```
public-hoist-pattern[]=*@sanity*
```

**pnpm overrides** in `pnpm-workspace.yaml`:

```yaml
overrides:
  js-yaml: '>=3.14.2'
  uuid: '>=14.0.0'
  postcss: '^8.5.15'
  brace-expansion: '>=5.0.6'
  jsdom: '27.3.0'
```

---

## Rollback

```bash
git restore package.json pnpm-lock.yaml
pnpm install
```
