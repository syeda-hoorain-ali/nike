// commit-push.ts
import path from "path";
import simpleGit, { SimpleGit } from "simple-git";

// 1. Initialize simple-git, pointing to project root
const git: SimpleGit = simpleGit(path.resolve(__dirname));

// 2. Helper to format current timestamp
function getTimestamp(): string {
  return new Date().toISOString().replace("T", " ").split(".")[0];
}

// 3. Main function to commit and push changes
async function commitAndPush(commitMessage?: string) {
  try {
    // 3a. Stage all changes
    await git.add("."); 

    // 3b. Create a default message if none provided
    const message = commitMessage
      ? commitMessage
      : `Auto-commit at ${getTimestamp()}`;
    await git.commit(message);

    // 3c. Push to origin/main
    await git.push("origin", "main"); 

    console.log(`✅ Committed and pushed: ${message}`);
  } catch (error: any) {
    if (error.message.includes('Author identity unknown')) {
      console.error("❌ Git configuration error. Please run `Setup Git Config` using the top run button.");
    } else {
      console.error("❌ Error during commit/push:", error);
    }
    process.exit(1);
  }
}

// 4. Read optional commit message from command-line arguments
const args = process.argv.slice(2);
const userMessage = args.length > 0 ? args.join(" ") : undefined;

// 5. Execute
commitAndPush(userMessage);

