#!/usr/bin/env bash
# strip-env.sh
# Reads all .env.* files in the project root (except .env.example itself),
# strips the values, and writes a single .env.example with keys only.
# Safe to commit — no secrets included.
# Compatible with macOS Bash 3.2+

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUT="$ROOT/.env.example"
SEEN_KEYS_FILE="$(mktemp)"

# Cleanup temp file on exit
trap 'rm -f "$SEEN_KEYS_FILE"' EXIT

# Clear output file
> "$OUTPUT"

for env_file in "$ROOT"/.env.*; do
  filename="$(basename "$env_file")"

  # Skip .env.example itself and backup files
  [[ "$filename" == ".env.example" ]] && continue
  [[ "$filename" == *.bak ]]          && continue

  echo "# --- from $filename ---" >> "$OUTPUT"

  while IFS= read -r line || [[ -n "$line" ]]; do
    # Preserve blank lines and comments as-is
    if [[ -z "$line" || "$line" == \#* ]]; then
      echo "$line" >> "$OUTPUT"
      continue
    fi

    # Extract key (everything before the first '=')
    key="${line%%=*}"

    # Skip if we've already written this key (grep exit 0 = found = skip)
    if grep -qx "$key" "$SEEN_KEYS_FILE" 2>/dev/null; then
      continue
    fi

    echo "$key" >> "$SEEN_KEYS_FILE"
    echo "${key}=" >> "$OUTPUT"

  done < "$env_file"

  echo "" >> "$OUTPUT"
done

echo "[strip-env] .env.example generated at $OUTPUT"
