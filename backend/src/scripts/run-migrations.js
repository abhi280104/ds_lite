const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

async function runMigrations() {
    const migrationsDir = path.join(__dirname, "../models/sql");

    const files = fs
        .readdirSync(migrationsDir)
        .filter(file => file.endsWith(".sql"))
        .sort(); // IMPORTANT

    for (const file of files) {
        console.log(`Running ${file}...`);
        const sql = fs.readFileSync(
            path.join(migrationsDir, file),
            "utf8"
        );

        await pool.query(sql);
    }

    console.log("✅ All migrations completed");
    process.exit(0);
}

runMigrations().catch(err => {
    console.error("❌ Migration failed", err);
    process.exit(1);
});
