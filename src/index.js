import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { getConfig, setConfig, isConfigured } from './config.js';
import { getInfo, listResources, getResource } from './api.js';

const program = new Command();

function printSuccess(message) {
  console.log(chalk.green('✓') + ' ' + message);
}

function printError(message) {
  console.error(chalk.red('✗') + ' ' + message);
}

function printJson(data) {
  console.log(JSON.stringify(data, null, 2));
}

async function withSpinner(message, fn) {
  const spinner = ora(message).start();
  try {
    const result = await fn();
    spinner.stop();
    return result;
  } catch (error) {
    spinner.stop();
    throw error;
  }
}

function requireAuth() {
  if (!isConfigured()) {
    printError('API key not configured.');
    console.log('\nRun the following to configure:');
    console.log(chalk.cyan('  mandrillapp config set --api-key YOUR_API_KEY'));
    process.exit(1);
  }
}

program
  .name('mandrillapp')
  .description(chalk.bold('Mandrill CLI') + ' - Transactional email delivery service')
  .version('1.0.0');

// CONFIG
const configCmd = program.command('config').description('Manage CLI configuration');

configCmd
  .command('set')
  .description('Set configuration values')
  .option('--api-key <key>', 'API key')
  .option('--base-url <url>', 'Base API URL')
  .action((options) => {
    if (options.apiKey) {
      setConfig('apiKey', options.apiKey);
      printSuccess('API key set');
    }
    if (options.baseUrl) {
      setConfig('baseUrl', options.baseUrl);
      printSuccess('Base URL set');
    }
    if (!options.apiKey && !options.baseUrl) {
      printError('No options provided. Use --api-key or --base-url');
    }
  });

configCmd
  .command('show')
  .description('Show current configuration')
  .action(() => {
    const apiKey = getConfig('apiKey');
    const baseUrl = getConfig('baseUrl');
    console.log(chalk.bold('\nMandrill CLI Configuration\n'));
    console.log('API Key: ', apiKey ? chalk.green(apiKey.substring(0, 6) + '...' + apiKey.slice(-4)) : chalk.red('not set'));
    console.log('Base URL:', baseUrl || chalk.dim('(using default)'));
    console.log('');
  });

// INFO
program
  .command('info')
  .description('Get API information')
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    requireAuth();
    try {
      const data = await withSpinner('Fetching info...', () => getInfo());
      if (options.json) {
        printJson(data);
      } else {
        console.log(chalk.bold('\nMandrill API Info\n'));
        console.log(data);
      }
    } catch (error) {
      printError(error.message);
      process.exit(1);
    }
  });

// LIST RESOURCES
program
  .command('list')
  .description('List all resources')
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    requireAuth();
    try {
      const data = await withSpinner('Fetching resources...', () => listResources());
      if (options.json) {
        printJson(data);
      } else {
        console.log(chalk.bold('\nResources\n'));
        console.log(data);
      }
    } catch (error) {
      printError(error.message);
      process.exit(1);
    }
  });

// GET RESOURCE
program
  .command('get <id>')
  .description('Get a specific resource by ID')
  .option('--json', 'Output as JSON')
  .action(async (id, options) => {
    requireAuth();
    try {
      const data = await withSpinner(`Fetching resource ${id}...`, () => getResource(id));
      if (options.json) {
        printJson(data);
      } else {
        console.log(chalk.bold(`\nResource ${id}\n`));
        console.log(data);
      }
    } catch (error) {
      printError(error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);

if (process.argv.length <= 2) {
  program.help();
}
