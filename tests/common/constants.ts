const LOG_LEVELS = { debug: 4, info: 3, warn: 2, error: 1, none: 0 };
const CURRENT_LOG_LEVEL =
  LOG_LEVELS[process.env.LOG_LEVEL ?? "info"] || LOG_LEVELS.info;

export const logger = {
  debug: (...args: unknown[]) => {
    CURRENT_LOG_LEVEL >= LOG_LEVELS.debug && console.log("[DEBUG]", ...args);
  },
  info: (...args: unknown[]) => {
    CURRENT_LOG_LEVEL >= LOG_LEVELS.info && console.log("[INFO]", ...args);
  },
  warn: (...args: unknown[]) => {
    CURRENT_LOG_LEVEL >= LOG_LEVELS.warn && console.warn("[WARN]", ...args);
  },
  error: (...args: unknown[]) => {
    CURRENT_LOG_LEVEL >= LOG_LEVELS.error && console.error("[ERROR]", ...args);
  },
};

export const SBOM_FILES = [
  "quarkus-bom-2.13.8.Final-redhat-00004.json.bz2",
  "ubi8_ubi-micro-8.8-7.1696517612.json.bz2",
  "ubi8-8.8-1067.json.bz2",
  "ubi8-minimal-8.8-1072.1697626218.json.bz2",
  "ubi9-9.3-782.json.bz2",
  "ubi9-minimal-9.3-1361.json.bz2",
];

export const ADVISORY_FILES = [
  "cve-2022-45787.json.bz2",
  "cve-2023-20861.json.bz2",
  "cve-2023-2974.json.bz2",
  "cve-2023-0044.json.bz2",
  "cve-2023-20862.json.bz2",
  "cve-2023-2976.json.bz2",
  "cve-2023-0481.json.bz2",
  "cve-2023-21971.json.bz2",
  "cve-2023-3223.json.bz2",
  "cve-2023-0482.json.bz2",
  "cve-2023-2454.json.bz2",
  "cve-2023-33201.json.bz2",
  "cve-2023-1108.json.bz2",
  "cve-2023-2455.json.bz2",
  "cve-2023-34453.json.bz2",
  "cve-2023-1370.json.bz2",
  "cve-2023-24815.json.bz2",
  "cve-2023-34454.json.bz2",
  "cve-2023-1436.json.bz2",
  "cve-2023-24998.json.bz2",
  "cve-2023-34455.json.bz2",
  "cve-2023-1584.json.bz2",
  "cve-2023-26464.json.bz2",
  // "cve-2023-44487.json.bz2", // HTTP 413 error: file to big to be uploaded
  "cve-2023-1664.json.bz2",
  "cve-2023-2798.json.bz2",
  "cve-2023-4853.json.bz2",
  "cve-2023-20860.json.bz2",
  "cve-2023-28867.json.bz2",
];
