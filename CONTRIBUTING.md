# Contributing to the Project

Welcome to our team project! To maintain code quality and prevent accidental direct pushes to the main repository, we require that all contributions be made via forked repositories and pull requests (PRs). Please follow the guidelines below.

## Table of Contents

- [Forking and Cloning](#forking-and-cloning)
- [Setting Up Remotes](#setting-up-remotes)
- [Branching Strategy](#branching-strategy)
- [Pull Request Workflow](#pull-request-workflow)
- [Branch Protection Rules](#branch-protection-rules)
- [Questions](#questions)

## Forking and Cloning

1. **Fork the Repository:**
   - Navigate to [https://github.com/hngprojects/reconcile-ai-fe.git](https://github.com/hngprojects/reconcile-ai-fe.git) on GitHub.
   - Click the **Fork** button at the top right to create your personal copy.

2. **Clone Your Fork:**
   - Clone the forked repository to your local machine:

     ```bash
     git clone https://github.com/<your-username>/reconcile-ai-fe.git
     cd reconcile-ai-fe
     ```

## Setting Up Remotes

After cloning your fork, add the original team repository as an upstream remote to keep your fork up-to-date:

```bash
git remote add upstream https://github.com/hngprojects/reconcile-ai-fe.git
```

To fetch updates from the team repository, run:
git

```bash
git fetch upstream
```

## Branching Strategy

Our repository uses two primary branches:

- **dev**: The integration branch where all feature PRs will be merged.
- **main**: The stable branch that receives updates only from approved PRs.

### Creating Feature Branches

1. **From Your Fork:**
   - Ensure you are on the latest version of the `dev` branch:

     ```bash
     git fetch upstream
     git checkout -b dev upstream/dev
     ```

   - Create a new feature branch:

     ```bash
     git checkout -b feature/FAQ section creation
     ```

2. **Commit and Push:**
   - Work on your feature, then commit your changes:

     ```bash
     git add .
     git commit -m "Add feature: <feature-name>"
     ```

   - Push the feature branch to your fork:

     ```bash
     git push origin feature/<feature-name>
     ```

## Pull Request Workflow

1. **Open a PR:**
   - Navigate to your fork on GitHub.
   - Open a pull request (PR) from your `feature/<feature-name>` branch to the team repository’s `dev` branch.
   - template

    # What does the PR do?

    This PR initializes a NextJS 15 project and sets up ShadCN

    # How should this be manually tested?

    N/A

    ### Checklist of what you did

    - [x] Initialized a version 15 NextJS project
    - [x] Configured ShadCN

    ### Reference Issue

    N/A

2. **Review and Merge:**
   - The PR will undergo code review and automated checks.
   - Once approved, a maintainer will merge your PR into `dev`.
   - After sufficient testing and validation on `dev`, changes will be promoted to the `main` branch by maintainers.

**Note:** Direct pushes to the team repository are disabled by branch protection rules.

## Branch Protection Rules

The following rules are enforced on the team repository to ensure code quality:

- **Main and Dev Branches:**
  - Direct pushes are disabled.
  - Pull request reviews are required before merging.
  - Status checks must pass before a merge can be completed.
  - Force pushes are restricted to maintain a clean history.

## Questions

If you have any questions or run into issues, please reach out to a project maintainer.

Happy coding!

```
