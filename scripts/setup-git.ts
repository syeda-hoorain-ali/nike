// setup-git.ts
import { createInterface } from 'readline';
import { execSync } from 'child_process';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function extractUsernameFromEmail(email: string): string {
  // Extract the part before @ and remove any dots or special characters
  const localPart = email.split('@')[0];
  // Replace dots and other special characters with spaces, then title case
  return localPart
    .replace(/[._-]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

async function setupGitConfig() {
  try {
    const email = await new Promise<string>((resolve) => {
      rl.question('Enter your GitHub email address: ', (answer) => {
        resolve(answer.trim());
      });
    });

    if (!email || !email.includes('@')) {
      console.error('❌ Please enter a valid email address');
      process.exit(1);
    }

    const username = extractUsernameFromEmail(email);
    
    console.log(`\n📧 Setting email: ${email}`);
    console.log(`👤 Setting username: ${username}`);
    
    // Set git config
    execSync(`git config --global user.email "${email}"`, { stdio: 'inherit' });
    execSync(`git config --global user.name "${username}"`, { stdio: 'inherit' });
    
    console.log('\n✅ Git configuration completed successfully!');
    console.log('\nYour Git config:');
    
    // Display current config
    // const configEmail = execSync('git config --global user.email', { encoding: 'utf8' }).trim();
    // const configName = execSync('git config --global user.name', { encoding: 'utf8' }).trim();
    
    // console.log(`  Email: ${configEmail}`);
    // console.log(`  Name: ${configName}`);
    
  } catch (error) {
    console.error('❌ Error setting up Git configuration:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

setupGitConfig();
