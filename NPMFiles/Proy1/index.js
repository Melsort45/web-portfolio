//const os = require('os');
//const fs = require('fs/promises');

import os from 'os';
import chalk from 'chalk';
import fs from 'fs-extra';

// index.js - Student Starter Skeleton
// TODO 1: Import built-in Node modules (os, fs/promises, path)
// TODO 2: Import third-party NPM packages (chalk)

async function generateTelemetryReport() {
    console.log("Initializing Node.js Telemetry Engine...");

    try {
        // ==========================================
        // 1. HARVEST SYSTEM TELEMETRY (Built-in 'os' module)
        // ==========================================
        // TODO: Get CPU architecture, platform, free memory (in MB), and system uptime (in hours)
        const platform = os.platform();
        const freeMemMB = (os.freemem() / (1024 * 1024)).toFixed(0); // Convert bytes to MB
        const uptimeHours = os.uptime() / 3600; // Convert seconds to hours
        const cpuModel = os.cpus()[0].model; // Get the model of the first CPU
        const totalMemMB = (os.totalmem() / (1024 * 1024)).toFixed(0); // Total memory in MB
        
        //platform, total memory , used memory , cpu model, uptime.

        // ==========================================
        // 2. RENDER FORMATTED TERMINAL LOGS (Third-Party 'chalk')
        // ==========================================
        // TODO: Print a colorful status report to the terminal using chalk colors
        console.log("==========================================");
        console.log("         SYSTEM & ENV TELEMETRY           ");
        console.log("==========================================");
        // Print Platform, Free Memory, and Uptime with custom colors
        console.log(`${chalk.bold("OS Platform:")}      ${chalk.yellow(platform)}`);
        console.log(`${chalk.bold("Free Memory, MB:")}      ${chalk.yellow(freeMemMB)}`);
        console.log(`${chalk.bold("System Uptime, Hours:")}      ${chalk.yellow(uptimeHours.toFixed(2))}`);
        console.log(`${chalk.bold("CPU Model:")}      ${chalk.blue(cpuModel)}`);
        console.log(`${chalk.bold("Total Memory, MB:")}      ${chalk.yellow(totalMemMB)}`);

        // ==========================================
        // 3. WRITE PERMANENT LOG FILE (Built-in 'fs/promises')
        // ==========================================
        const logEntry = `[${new Date().toISOString()}] PLATFORM: ${platform} | FREEMEM: ${freeMemMB}MB\n`;
        
        console.log("Writing log entry to disk...");
        await fs.appendFile('telemetry.log', logEntry, 'utf-8');

        console.log("Telemetry audit completed successfully!");

    } catch (error) {
        console.error("Telemetry report generation failed:", error.message);
    }
}

// Execute engine
generateTelemetryReport();
