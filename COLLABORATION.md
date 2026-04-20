# Working together on GitHub

Use **GitHub as the single source of truth**: both laptops pull the same history, commit locally, and push so the other person can pull your work.

## One-time setup (repo owner — you)

1. Repo is on GitHub (e.g. `https://github.com/chan-dra1/caribbean-connection`).
2. **Invite your friend:** GitHub repo → **Settings** → **Collaborators** (or **Manage access**) → **Add people** → enter their GitHub username → **Invite**. They must **accept** the email/GitHub notification.

## One-time setup (your friend’s laptop)

1. Install **Git** and **Node.js** (LTS, e.g. 20 or 22): [nodejs.org](https://nodejs.org).
2. **Clone** (HTTPS or SSH — pick one):

   ```bash
   git clone https://github.com/chan-dra1/caribbean-connection.git
   cd caribbean-connection
   ```

   SSH (after [adding an SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) to GitHub):

   ```bash
   git clone git@github.com:chan-dra1/caribbean-connection.git
   cd caribbean-connection
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the app locally:

   ```bash
   npm run dev
   ```

   Open the URL Vite prints (usually `http://localhost:5173`).

## Daily habit (both of you)

**Before you start coding:**

```bash
cd caribbean-connection   # or your folder name
git checkout main
git pull origin main
```

**When you finish a logical chunk of work:**

```bash
git status
git add -A
git commit -m "Short message: what changed"
git push origin main
```

**After your friend pushed** (you want their changes):

```bash
git pull origin main
```

If `git pull` reports conflicts, Git will mark files — open them, resolve the `<<<<<<<` / `=======` / `>>>>>>>` sections, then:

```bash
git add -A
git commit -m "Merge: resolve conflicts with teammate"
git push origin main
```

## Two good workflows

### A. Simple — both on `main` (fastest for two people)

- Always **`git pull` before** editing.
- Push when done; the other person **`git pull`** to see changes.
- **Downside:** if you both change the same file before pulling, you get merge conflicts more often.

### B. Safer — short-lived branches + pull request (recommended as you grow)

```bash
git checkout main
git pull origin main
git checkout -b feature/short-description-of-change
# ... edit, test ...
git add -A
git commit -m "Describe change"
git push -u origin feature/short-description-of-change
```

On GitHub: **Compare & pull request** → merge into `main`. Locally:

```bash
git checkout main
git pull origin main
```

## Rules of thumb

- **Pull before push** if Git says the remote is ahead: `git pull origin main` (then fix conflicts if any), then `git push`.
- **Commit messages:** short, present tense (“Add volume slider”) help skimming history.
- **Don’t commit secrets** (API keys, `.env` with passwords). This repo’s `.gitignore` already skips common junk; add more if needed.

## If something goes wrong

- **`git status`** — see what’s changed / staged.
- **`git log --oneline -5`** — see recent commits.
- **Undo last commit but keep files:** `git reset --soft HEAD~1` (only if you haven’t pushed yet, or you know what you’re doing).

For serious mistakes after a push, use GitHub’s history or ask for help before force-pushing (`git push --force`), which can erase your friend’s work.
