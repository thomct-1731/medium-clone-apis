import { spawnSync, SpawnSyncReturns } from 'child_process';
import * as path from 'path';

const name = process.argv[2] || process.env.npm_config_name;
if (!name) {
  console.error(
    'Usage: npm run migration:generate <MigrationName> OR npm run migration:generate --name=MigrationName',
  );
  process.exit(1);
}

const migrationPath = path.join('.', 'src', 'migrations', name);
const cmd = 'npm';
const args = ['run', 'typeorm', '--', 'migration:generate', migrationPath];
const r: SpawnSyncReturns<Buffer> = spawnSync(cmd, args, { stdio: 'inherit' });
process.exit(r.status);
