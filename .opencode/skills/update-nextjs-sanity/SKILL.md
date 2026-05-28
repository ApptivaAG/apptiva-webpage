---
name: update-nextjs-sanity
description: Use when updating dependencies with pnpm, scanning for critical/high security vulnerabilities with snyk, validating Sanity CMS schemas, or running build checks for this Next.js project. Handles pnpm update config, respects ignored dependencies (remark-gfm, next-mdx-remote), and only fixes critical/high severity issues.
---

# Update Next.js + Sanity Webpage

This skill provides workflows for maintaining this Next.js webpage with Sanity CMS, including dependency updates, security scanning, and validation.

## Project Configuration

**Stack:**

- Next.js 16 with App Router + Turbopack
- Sanity v5 CMS with Studio at `/studio`
- pnpm package manager
- Snyk CLI for vulnerability scanning
- TypeScript

**Important Settings:**

- Ignored dependencies: `remark-gfm`, `next-mdx-remote` (in `pnpm.updateConfig.ignoreDependencies`)
- Sanity packages hoisted via `.npmrc` config
- Security threshold: **Critical and High severity only**

---

## Workflows

### 1. Quick Security Scan

**Use when:** User wants to check current security vulnerabilities

**Duration:** ~30 seconds

**Steps:**

1. Run Snyk scan with severity threshold:

   ```bash
   snyk test --severity-threshold=high
   ```

2. Parse and display:
   - Count of critical vulnerabilities
   - Count of high vulnerabilities
   - CVE links for manual review
   - Affected packages

3. Report findings with clear summary

**Output:** Summary of critical/high vulnerabilities (no fixes applied)

---

### 2. Dependency Status Check

**Use when:** User wants to see what packages are outdated

**Duration:** ~1 minute

**Steps:**

1. Check outdated packages:

   ```bash
   pnpm outdated
   ```

2. Analyze and categorize results:
   - Next.js & React ecosystem
   - Sanity packages (`@sanity/*`)
   - Build tools (TypeScript, ESLint, etc.)
   - Other dependencies

3. Filter by update type:
   - Major version updates (breaking changes expected)
   - Minor version updates (new features)
   - Patch version updates (bug fixes)

4. Highlight ignored dependencies:
   - Show `remark-gfm` and `next-mdx-remote` status
   - Explain why they're in ignore list

5. Check pnpm overrides status:
   - `js-yaml >= 3.14.2`
   - `uuid >= 14.0.0`
   - `postcss >= 8.5.10`

**Output:** Categorized table of outdated packages with update recommendations

---

### 3. Safe Dependency Update ⭐ Recommended

**Use when:** Regular maintenance, applying minor/patch updates

**Duration:** ~3-5 minutes

**Steps:**

1. **Pre-check:**

   ```bash
   # Check git status
   git status

   # Baseline security scan
   snyk test --severity-threshold=high
   ```

   - Warn if uncommitted changes exist
   - Record current vulnerability count

2. **Update dependencies:**

   ```bash
   pnpm update
   ```

   - Automatically respects `pnpm.updateConfig.ignoreDependencies`
   - Shows which packages were updated
   - Skips `remark-gfm` and `next-mdx-remote`

3. **Post-update validation:**

   ```bash
   # Re-scan for vulnerabilities
   snyk test --severity-threshold=high

   # Verify build works
   pnpm run build

   # Check code quality
   pnpm run lint

   # Type checking
   pnpm tsc --noEmit
   ```

   **Next.js dev server verification (if running):**
   - Use `nextjs_index` to discover running servers
   - Use `nextjs_call` with `get_errors` to check for runtime errors
   - Use `nextjs_call` with `get_project_metadata` to verify health
   - Quick HTTP check: `curl -I http://localhost:3000`

4. **Generate report:**
   - Before/after vulnerability comparison
   - List of updated packages with version changes
   - Build status (success/failure)
   - Lint results
   - Type check results

5. **Next steps recommendation:**
   - Test dev server manually: `pnpm run dev`
   - Check Studio loads: `http://localhost:3000/studio`
   - Run any project-specific tests
   - Commit changes if all looks good

**Output:** Comprehensive update report with validation results

**Safety notes:**

- Always builds to catch breaking changes
- Never updates ignored dependencies
- Preserves pnpm overrides

---

### 4. Critical Security Fix

**Use when:** Critical or high severity vulnerabilities found

**Duration:** ~2-3 minutes

**Steps:**

1. **Detailed vulnerability scan:**

   ```bash
   snyk test --severity-threshold=high --json > /tmp/vuln-report.json
   ```

   - Parse JSON for detailed info
   - Show CVE IDs, CVSS scores
   - List affected packages and paths

2. **Apply automatic fixes:**

   ```bash
   snyk fix --severity-threshold=high
   ```

   - Only fixes critical/high severity issues
   - Shows what changes will be made
   - Updates `package.json` and `pnpm-lock.yaml`

3. **Sync lockfile:**

   ```bash
   pnpm install
   ```

   - Ensures lockfile consistency
   - Respects .npmrc Sanity hoisting config

4. **Validation:**

   ```bash
   # Check if vulnerabilities are fixed
   snyk test --severity-threshold=high

   # Build check
   pnpm run build

   # Type check
   pnpm tsc --noEmit

   # Verify Sanity packages compatibility
   pnpm list '@sanity/*'
   ```

5. **Verify Next.js dev server (if running):**

   Use Next.js MCP tools to check the server health:
   
   - Call `nextjs_index` to discover running Next.js servers
   - Call `nextjs_call` with `get_errors` to check for runtime errors
   - Call `nextjs_call` with `get_project_metadata` to verify server is responding
   - Optionally call `nextjs_call` with `get_routes` to confirm routes are valid
   - Make a simple HTTP request to verify server responds: `curl -I http://localhost:3000`

   **Note:** This requires Next.js 16+ with MCP support and the dev server running

5. **Review changes:**

   ```bash
   git diff package.json pnpm-lock.yaml
   ```

   - Show what was changed
   - Highlight any unexpected modifications

6. **Generate security report:**
   - Fixed vulnerabilities count
   - Remaining issues (if any)
   - Manual intervention needed (if any)
   - Rollback instructions (if build failed)

**Output:** Security fix report with before/after comparison

**Rollback if needed:**

```bash
git restore package.json pnpm-lock.yaml
pnpm install
```

---

### 5. Major Version Updates

**Use when:** Updating Next.js major version, Sanity v5→v6, React 19→20, etc.

**Duration:** ~10-15 minutes

**Steps:**

1. **Pre-planning:**

   ```bash
   pnpm outdated
   ```

   - Identify available major version updates
   - Prioritize by importance:
     1. Next.js (framework)
     2. React (runtime)
     3. Sanity (CMS)
     4. Build tools
     5. Other dependencies

2. **Fetch migration guides:**
   - **Next.js:** Check <https://nextjs.org/docs/upgrading>
   - **Sanity:** Check <https://www.sanity.io/changelog>
   - **React:** Check <https://react.dev/blog>
   - Look for breaking changes and migration steps

3. **Interactive decision:**
   - Ask which major update to apply (one at a time)
   - Show known breaking changes
   - Confirm user wants to proceed

4. **Update single package:**

   ```bash
   pnpm update <package>@<version>
   ```

   - Update one major dependency at a time
   - Reduces risk and makes debugging easier

5. **Immediate validation:**

   ```bash
   pnpm run build
   ```

   - If build fails, show error clearly
   - Provide rollback option
   - Don't proceed to next update until current one works

6. **Sanity-specific checks** (when updating `@sanity/*`):

   ```bash
   # Validate config
   node -e "require('./sanity.config.ts')"

   # Check schemas
   pnpm tsc --noEmit src/sanity/**/*.ts
   ```

   - Verify `sanity.config.ts` syntax
   - Check schema files in `src/sanity/schemas/documents/` and `src/sanity/schemas/objects/`
   - Ensure plugins still compatible (media, vision, groqd-playground, presentationTool)

7. **Migration checklist:**
   - Create list of manual steps from migration guide
   - Check off automated steps
   - Highlight remaining manual tasks

8. **Generate report:**
   - Package updated (before → after version)
   - Breaking changes encountered
   - Migration steps completed
   - Remaining manual tasks
   - Testing recommendations

**Output:** Major update report with migration checklist

**Best practices:**

- Create git branch before starting: `git checkout -b update-nextjs-17`
- Update one major package at a time
- Test thoroughly after each update
- Read migration guides carefully
- Consider updating dev dependencies first as a test

---

### 6. Sanity Schema Validation

**Use when:** After editing Sanity schemas, or after Sanity package updates

**Duration:** ~1 minute

**Steps:**

1. **Validate schema files:**

   ```bash
   # Check TypeScript in schemas
   pnpm tsc --noEmit src/sanity/schemas/**/*.ts
   ```

   - Check `src/sanity/schemas/documents/` types
   - Check `src/sanity/schemas/objects/` types
   - Validate `src/sanity/schema.ts` exports

2. **Validate Sanity config:**

   ```bash
   node -e "require('./sanity.config.ts')"
   ```

   - Ensure config can load without errors
   - Check plugin configurations
   - Verify dataset and projectId references

3. **Check plugin compatibility:**
   - `@sanity/vision` - GROQ query tool
   - `groqd-playground` - GROQ playground
   - `sanity-plugin-media` - Media library
   - `presentationTool` - Preview functionality
   - `@sanity/code-input` - Code input field

4. **Studio singleton check:**
   - Verify singleton pages: `homepage`, `about-page`, `media-page`
   - Ensure structure tool configuration valid
   - Check custom icons from `react-icons/fa`

5. **Type generation** (if needed):

   ```bash
   # If your project uses generated types
   # (add this if you have a types generation script)
   ```

6. **Generate validation report:**
   - Schema files status (✓ valid / ✗ errors)
   - Type check results
   - Config validation status
   - Plugin compatibility status
   - Warnings about potential content/schema mismatches

**Output:** Schema validation report

**Common issues:**

- Missing imports in schema files
- Type mismatches in field definitions
- Plugin version incompatibilities
- Deprecated Sanity v5 patterns

**Content safety:**

- Schema changes don't automatically migrate content
- Test changes in development dataset first
- Consider content migrations for breaking schema changes
- Use Sanity's version history for rollback if needed

---

## Commands Reference

### Security Scanning (Snyk)

```bash
# Check for vulnerabilities (critical/high only)
snyk test --severity-threshold=high

# Fix vulnerabilities automatically (critical/high only)
snyk fix --severity-threshold=high

# Detailed JSON report
snyk test --severity-threshold=high --json > vuln-report.json

# Show all vulnerabilities (including medium/low)
snyk test

# Authenticate Snyk CLI
snyk auth
```

### Dependency Management (pnpm)

```bash
# Check for outdated packages
pnpm outdated

# Update all packages (respects ignore list)
pnpm update

# Update specific package
pnpm update <package>

# Update to specific version
pnpm update <package>@<version>

# Reduce duplicate dependencies
pnpm dedupe

# List installed versions
pnpm list <package>

# Show why package is installed
pnpm why <package>
```

### Build & Validation

```bash
# Production build
pnpm run build

# Development server (with Turbopack)
pnpm run dev

# Linting
pnpm run lint

# Type checking only (no emit)
pnpm tsc --noEmit

# Type check specific directory
pnpm tsc --noEmit src/sanity/**/*.ts
```

### Next.js MCP Server Verification

Next.js 16+ includes built-in MCP (Model Context Protocol) support for dev server diagnostics:

```bash
# Check if dev server is running and healthy
# Use nextjs_index tool to discover servers
# Use nextjs_call tool with these commands:

# 1. Get project metadata
nextjs_call --port 3000 --tool get_project_metadata

# 2. Check for compilation/runtime errors
nextjs_call --port 3000 --tool get_errors

# 3. List all routes
nextjs_call --port 3000 --tool get_routes

# 4. Get page metadata (requires browser session)
nextjs_call --port 3000 --tool get_page_metadata

# 5. Simple HTTP health check
curl -I http://localhost:3000
```

**When to use MCP verification:**
- After security updates to verify no runtime errors
- After major dependency updates
- To check dev server health without opening browser
- To verify all routes are still valid

### Git Operations

```bash
# Check status
git status

# Create update branch
git checkout -b update-deps-$(date +%Y-%m-%d)

# View changes
git diff package.json pnpm-lock.yaml

# Rollback changes
git restore package.json pnpm-lock.yaml

# Stash changes
git stash push -m "before dependency update"

# Apply stash
git stash pop
```

---

## Important Notes

### Ignored Dependencies

The following packages are in `pnpm.updateConfig.ignoreDependencies` and should NOT be auto-updated:

- **`remark-gfm`** - GitHub Flavored Markdown parser
  - Current version pinned for compatibility
  - Update manually when MDX ecosystem stabilizes

- **`next-mdx-remote`** - MDX remote content loader
  - Current version pinned for compatibility
  - Update manually when MDX ecosystem stabilizes

**To update these manually:**

```bash
# Only update if you've verified compatibility
pnpm update remark-gfm --latest
pnpm update next-mdx-remote --latest
pnpm run build  # Test immediately
```

### pnpm Overrides

These packages have minimum version requirements set in `package.json`:

```json
"pnpm": {
  "overrides": {
    "js-yaml": ">=3.14.2",      // Security fix
    "uuid": ">=14.0.0",          // Security fix
    "postcss": ">=8.5.10"        // Security fix
  }
}
```

These overrides apply across all dependencies, including transitive ones.

### Sanity Package Hoisting

The `.npmrc` file contains:

```
public-hoist-pattern[]=*@sanity*
```

This ensures all `@sanity/*` packages are hoisted to the root `node_modules/`, which is required for Sanity plugins to work correctly. Don't modify this setting.

### Sanity Icon Overrides

The `package.json` contains:

```json
"overrides": {
  "@sanity/icons": "3.7.4"
}
```

This pins the Sanity icons version for compatibility. Update cautiously.

---

## Troubleshooting

### Issue: Snyk fails with authentication error

**Symptoms:**

```
Authentication failed. Run `snyk auth` to authenticate.
```

**Solution:**

```bash
snyk auth
# Opens browser for authentication

# Or set token manually
export SNYK_TOKEN=your-token-here
```

---

### Issue: pnpm update doesn't respect ignore list

**Symptoms:**
`remark-gfm` or `next-mdx-remote` gets updated unexpectedly

**Solution:**
Verify `package.json` has correct configuration:

```json
{
  "pnpm": {
    "updateConfig": {
      "ignoreDependencies": ["remark-gfm", "next-mdx-remote"]
    }
  }
}
```

If correct, manually rollback:

```bash
git restore package.json pnpm-lock.yaml
pnpm install
```

---

### Issue: Build fails after dependency update

**Symptoms:**

```
Error: Module not found
Error: Type error
```

**Solution:**

1. **Identify the culprit:**

   ```bash
   git diff package.json
   # See what changed
   ```

2. **Check for breaking changes:**
   - Check package changelog on npm or GitHub
   - Look for BREAKING CHANGE commits
   - Read migration guides

3. **Rollback and update incrementally:**

   ```bash
   git restore package.json pnpm-lock.yaml
   pnpm install

   # Update one package at a time
   pnpm update <specific-package>
   pnpm run build  # Test after each one
   ```

4. **Common Next.js breaking changes:**
   - Image optimization API changes
   - Middleware signature changes
   - App Router vs Pages Router differences
   - Server Components restrictions

---

### Issue: Sanity Studio won't load after update

**Symptoms:**

- Studio page shows white screen
- Console errors about Sanity packages
- Plugin registration errors

**Solution:**

1. **Check Sanity package versions are compatible:**

   ```bash
   pnpm list '@sanity/*'
   ```

   All `@sanity/*` packages should be on compatible versions (usually all on v5.x or all on v6.x)

2. **Verify sanity.config.ts syntax:**

   ```bash
   node -e "require('./sanity.config.ts')"
   ```

3. **Check for plugin deprecations:**
   - `@sanity/vision` - may need migration
   - `presentationTool` - API might have changed
   - `sanity-plugin-media` - check compatibility with Sanity v5

4. **Clear Next.js cache:**

   ```bash
   rm -rf .next
   pnpm run dev
   ```

5. **Check Sanity changelog:**
   - Visit: <https://www.sanity.io/changelog>
   - Look for breaking changes in your version range

---

### Issue: Type errors after Sanity update

**Symptoms:**

```
Type 'X' is not assignable to type 'Y'
Property 'foo' does not exist on type 'SanityDocument'
```

**Solution:**

1. **Check if schema types changed:**
   - Sanity v5 introduced new type system
   - Some property names may have changed

2. **Regenerate types if using GROQ codegen:**

   ```bash
   # If your project has type generation
   # (check package.json scripts)
   ```

3. **Update schema definitions:**
   - Check `src/sanity/schemas/` files
   - Ensure they match Sanity v5 patterns
   - Use `defineField`, `defineType` helpers

4. **Check import paths:**

   ```typescript
   // Old (Sanity v2/v3)
   import { SanityDocument } from '@sanity/client'

   // New (Sanity v5)
   import { SanityDocument } from 'sanity'
   ```

---

### Issue: Medium/Low vulnerabilities not being fixed

**Symptoms:**
`snyk test` shows medium/low vulnerabilities but `snyk fix` ignores them

**Solution:**

This is **intentional behavior** for this project. The security threshold is set to **critical/high only**.

**If you want to fix medium/low vulnerabilities:**

```bash
# Show all vulnerabilities
snyk test

# Fix all vulnerabilities (including medium/low)
snyk fix

# Or fix specific severity
snyk fix --severity-threshold=medium
```

**Why critical/high only?**

- Reduces update churn
- Focuses on truly dangerous vulnerabilities
- Medium/low issues often have workarounds
- Less risk of breaking changes from unnecessary updates

---

### Issue: pnpm install fails with EINTEGRITY error

**Symptoms:**

```
ERR_PNPM_INTEGRITY_VALIDATION_FAILED Integrity check failed for <package>
```

**Solution:**

1. **Clear pnpm cache:**

   ```bash
   pnpm store prune
   pnpm install
   ```

2. **If that doesn't work, force reinstall:**

   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

3. **Check pnpm version:**

   ```bash
   pnpm --version  # Should be 10.33.2 or higher
   ```

---

### Issue: Next.js Turbopack dev server crashes after update

**Symptoms:**
`pnpm run dev` fails or crashes with Turbopack errors

**Solution:**

1. **Clear Next.js cache:**

   ```bash
   rm -rf .next
   pnpm run dev
   ```

2. **Try without Turbopack:**

   ```bash
   # Edit package.json temporarily
   "dev": "next dev"  # Remove --turbopack flag

   pnpm run dev
   ```

3. **Check Next.js GitHub issues:**
   - Turbopack is experimental in Next.js 16
   - Some packages may not be fully compatible
   - Look for known issues with your dependencies

4. **Rollback Next.js if needed:**

   ```bash
   pnpm update next@16.1.7  # Known working version
   pnpm install
   ```

---

## Best Practices

### Before Any Update

✓ **Commit your work** - Ensure git working directory is clean  
✓ **Create a branch** - `git checkout -b update-deps-$(date +%Y-%m-%d)`  
✓ **Backup if cautious** - `git stash push -m "before update"`  
✓ **Check CI status** - Ensure main branch is green  
✓ **Note current versions** - `pnpm list > pre-update-versions.txt`

### During Updates

✓ **Update incrementally** - One major version at a time  
✓ **Read changelogs** - Check for breaking changes  
✓ **Build after each update** - Catch issues early  
✓ **Test Studio loads** - Visit `/studio` after Sanity updates  
✓ **Check dev server** - Run `pnpm run dev` to verify

### After Updates

✓ **Run full build** - `pnpm run build`  
✓ **Check types** - `pnpm tsc --noEmit`  
✓ **Lint code** - `pnpm run lint`  
✓ **Verify dev server** - Use Next.js MCP tools to check for runtime errors  
✓ **Test manually** - Browse key pages, test forms, check Studio  
✓ **Review git diff** - Ensure only expected changes  
✓ **Commit atomically** - Separate commits for different types of updates

### Security Updates

✓ **Prioritize critical** - Fix critical severity first  
✓ **Check CVEs** - Understand what you're fixing  
✓ **Test thoroughly** - Security fixes can introduce breaking changes  
✓ **Document** - Note which CVEs were fixed in commit message  
✓ **Monitor** - Re-scan after a week to catch new issues

### Sanity Updates

✓ **Test schema changes** - Use development dataset first  
✓ **Check content** - Ensure existing content still validates  
✓ **Verify plugins** - All Studio plugins still work  
✓ **Test GROQ queries** - Check Vision tool for query compatibility  
✓ **Backup content** - Sanity datasets before major schema changes

---

## Quick Command Cheat Sheet

```bash
# Most common workflows

# 1. Quick security check
snyk test --severity-threshold=high

# 2. Safe update routine
git status && \
snyk test --severity-threshold=high && \
pnpm update && \
pnpm run build && \
pnpm run lint

# 3. Fix critical vulnerabilities
snyk fix --severity-threshold=high && \
pnpm install && \
pnpm run build

# 4. Check what's outdated
pnpm outdated

# 5. Validate Sanity schemas
pnpm tsc --noEmit src/sanity/**/*.ts

# 6. Rollback last changes
git restore package.json pnpm-lock.yaml && pnpm install
```

---

## Project-Specific Context

### Technology Stack

- **Framework:** Next.js 16.2.6 (App Router, Turbopack enabled)
- **CMS:** Sanity v5.24.0 (Studio embedded at `/studio`)
- **UI:** Tailwind CSS 3.4, Radix UI components
- **Content:** MDX for blog posts, Portable Text for CMS content
- **Email:** React Email, Resend
- **Analytics:** Plausible
- **Package Manager:** pnpm 10.33.2
- **Security:** Snyk CLI
- **Node Version:** Check `.nvmrc` for required version

### Key Files

- **Package config:** `package.json`, `pnpm-lock.yaml`, `.npmrc`
- **Sanity config:** `sanity.config.ts`, `sanity.cli.ts`
- **Sanity schemas:** `src/sanity/schemas/documents/`, `src/sanity/schemas/objects/`
- **Next.js config:** `next.config.js`
- **TypeScript:** `tsconfig.json`
- **Tailwind:** `tailwind.config.ts`

### Scripts Available

```bash
pnpm run dev      # Next.js dev server with Turbopack
pnpm run build    # Production build
pnpm start        # Start production server
pnpm run lint     # ESLint
```

### Deployment

This project is deployed on **Vercel**. After updates:

- Test build locally first
- Commit changes
- Push to trigger Vercel build
- Check deploy preview before merging

---

## When to Use This Skill

**Trigger this skill when the user says:**

- "update dependencies"
- "check for security vulnerabilities"
- "fix snyk issues"
- "scan for vulns"
- "update packages"
- "pnpm update"
- "check outdated packages"
- "validate Sanity schemas"
- "update Next.js"
- "update Sanity"
- "fix critical vulnerabilities"
- "run security scan"

**Do NOT trigger for:**

- Installing new packages (use regular `pnpm add` instead)
- Removing packages (use `pnpm remove`)
- General git operations (use git commands directly)
- Content editing in Sanity Studio (that's manual work)
- Deploying to production (separate workflow)

---

## Skill Maintenance

This skill is part of the **apptiva-webpage repository** and should be updated when:

- Project structure changes significantly
- New package manager version with different behavior
- Snyk CLI API changes
- Sanity major version upgrade with new patterns
- New ignored dependencies are added to package.json

**Location:** `.opencode/skills/update-nextjs-sanity/SKILL.md`

**Last Updated:** 2026-05-28 (initial version)
