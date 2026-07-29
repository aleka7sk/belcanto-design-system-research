#!/usr/bin/env node
/**
 * Temporary, repository-owned workaround for `expo-modules-jsi`.
 *
 * Status: EXPLORATORY / NON-NORMATIVE.
 *
 * Why this exists
 * ---------------
 * `expo-modules-jsi@57.0.4` ships this guard in
 * `apple/Sources/ExpoModulesJSI/Coding/JavaScriptCodable+Date.swift`:
 *
 *   guard milliseconds.isFinite, abs(milliseconds) <= maxJavaScriptDateMilliseconds else {
 *
 * On this machine's Xcode/Swift toolchain that expression fails to compile with
 * `type of expression is ambiguous without a type annotation`, which blocks the
 * iOS Release build the physical-device acceptance gate depends on. The proven
 * local replacement compares the same bounds as explicit `Double` literals.
 *
 * Upstream issue: https://github.com/expo/expo/issues/47957
 * That issue is CLOSED as "incomplete issue: missing or invalid repro". It was not
 * closed by a fix, and its closure is not evidence that the dependency defect is
 * resolved: the published expo-modules-jsi@57.0.4 installed in this repository
 * still contains the failing expression. This script does not fix anything
 * upstream and does not claim to.
 *
 * Why a script instead of a hand-edited node_modules file
 * ------------------------------------------------------
 * `node_modules/` is git-ignored, so a manual edit is invisible to review and is
 * destroyed by `npm ci`. That makes the Release build non-reproducible: a clean
 * install silently restores the failing source. This script runs from
 * `postinstall`, so any clean install lands in the same, inspectable state.
 *
 * Removal condition
 * -----------------
 * Delete this script, its `postinstall` hook and its `verify:` script as soon as
 * a published `expo-modules-jsi` no longer contains the failing expression. The
 * condition is the installed package source, never the GitHub issue status. The
 * script fails loudly on dependency drift precisely so that an upgrade cannot
 * quietly keep a stale workaround alive.
 *
 * Usage
 * -----
 *   node scripts/patch-expo-modules-jsi.js          # apply (idempotent)
 *   node scripts/patch-expo-modules-jsi.js --check  # verify only, never writes
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");

const PACKAGE_NAME = "expo-modules-jsi";
const KNOWN_AFFECTED_VERSION = "57.0.4";
const RELATIVE_TARGET = path.join(
  "apple",
  "Sources",
  "ExpoModulesJSI",
  "Coding",
  "JavaScriptCodable+Date.swift",
);

const ORIGINAL =
  "  guard milliseconds.isFinite, abs(milliseconds) <= maxJavaScriptDateMilliseconds else {";

const CORRECTED = [
  "  guard milliseconds.isFinite,",
  "    milliseconds >= -8_640_000_000_000_000.0,",
  "    milliseconds <= 8_640_000_000_000_000.0 else {",
].join("\n");

const UPSTREAM_ISSUE = "https://github.com/expo/expo/issues/47957";

const projectRoot = path.resolve(__dirname, "..");
const packageRoot = path.join(projectRoot, "node_modules", PACKAGE_NAME);
const targetPath = path.join(packageRoot, RELATIVE_TARGET);
const checkOnly = process.argv.includes("--check");
const label = `[patch-${PACKAGE_NAME}]`;

function fail(message) {
  console.error(`${label} ERROR: ${message}`);
  process.exit(1);
}

function readInstalledVersion() {
  const manifestPath = path.join(packageRoot, "package.json");
  if (!fs.existsSync(manifestPath)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8")).version || null;
  } catch (error) {
    fail(`could not read ${manifestPath}: ${error.message}`);
    return null;
  }
}

function main() {
  const version = readInstalledVersion();

  if (version === null) {
    // A transitive dependency that is simply absent is not an error during
    // postinstall; it becomes one only when the patch is explicitly verified.
    const message = `${PACKAGE_NAME} is not installed under ${packageRoot}`;
    if (checkOnly) {
      fail(message);
    }
    console.log(`${label} skipped: ${message}`);
    return;
  }

  if (!fs.existsSync(targetPath)) {
    fail(
      `dependency drift: ${PACKAGE_NAME}@${version} does not contain ${RELATIVE_TARGET}. ` +
        `Re-verify the workaround against ${UPSTREAM_ISSUE} and remove this script if the ` +
        `failing expression is gone.`,
    );
  }

  const source = fs.readFileSync(targetPath, "utf8");
  const hasOriginal = source.includes(ORIGINAL);
  const hasCorrected = source.includes(CORRECTED);

  if (hasCorrected && !hasOriginal) {
    console.log(
      `${label} already applied in ${PACKAGE_NAME}@${version} (${RELATIVE_TARGET}).`,
    );
    return;
  }

  if (!hasOriginal) {
    fail(
      `dependency drift: neither the known failing expression nor the corrected one was found ` +
        `in ${PACKAGE_NAME}@${version} ${RELATIVE_TARGET}. This script patches ` +
        `${PACKAGE_NAME}@${KNOWN_AFFECTED_VERSION} only. Re-verify against ${UPSTREAM_ISSUE} ` +
        `before changing anything, and delete this workaround if upstream no longer ships the ` +
        `failing expression.`,
    );
  }

  if (checkOnly) {
    fail(
      `${PACKAGE_NAME}@${version} still contains the failing expression in ${RELATIVE_TARGET}. ` +
        `Run "npm run patch:expo-modules-jsi" (or reinstall so postinstall runs) before building ` +
        `for a device.`,
    );
  }

  if (version !== KNOWN_AFFECTED_VERSION) {
    console.warn(
      `${label} warning: patching ${PACKAGE_NAME}@${version}, but the workaround was proven ` +
        `against ${KNOWN_AFFECTED_VERSION}. Re-verify against ${UPSTREAM_ISSUE}.`,
    );
  }

  fs.writeFileSync(targetPath, source.replace(ORIGINAL, CORRECTED), "utf8");
  console.log(
    `${label} applied to ${PACKAGE_NAME}@${version} (${RELATIVE_TARGET}). ` +
      `Temporary workaround for ${UPSTREAM_ISSUE}.`,
  );
}

main();
