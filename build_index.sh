#!/usr/bin/env bash

CHARTS_DIR="public/charts"
OUTPUT_FILE="public/index.json"

# Start JSON array
echo "[" >"$OUTPUT_FILE"

first_entry=true

# Loop through all .cho files in the charts directory
for file in "$CHARTS_DIR"/*.cho; do
	# Skip if no .cho files exist
	[ -e "$file" ] || continue

	# Extract filename and id
	filename=$(basename "$file")
	id="${filename%.cho}"

	# Extract title and artist from the file
	title=$(awk -F'[{}:]' '/\{title:/ {gsub(/^[ \t]+|[ \t]+$/, "", $3); print $3; exit}' "$file")
	artist=$(awk -F'[{}:]' '/\{artist:/ {gsub(/^[ \t]+|[ \t]+$/, "", $3); print $3; exit}' "$file")

	# Extract tags (comma-separated list)
	tags=$(awk -F'[{}:]' '
		/\{tags:/ {
			split($3, arr, ",");
			for (i = 1; i <= length(arr); i++) {
				gsub(/^[ \t]+|[ \t]+$/, "", arr[i]);
				printf "      \"%s\"", arr[i];
				if (i < length(arr)) printf ",\n";
			}
		}
	' "$file")

	# Default to empty if missing
	title=${title:-""}
	artist=${artist:-""}

	# Add comma if not first entry
	if [ "$first_entry" = true ]; then
		first_entry=false
	else
		echo "," >>"$OUTPUT_FILE"
	fi

	{
		echo "  {"
		echo "    \"id\": \"$id\","
		echo "    \"title\": \"$title\","
		echo "    \"artist\": \"$artist\","
		echo "    \"filename\": \"$filename\","
		if [ -n "$tags" ]; then
			echo "    \"tags\": ["
			echo "$tags"
			echo "    ]"
		else
			echo "    \"tags\": []"
		fi
		echo -n "  }"
	} >>"$OUTPUT_FILE"
done

echo "" >>"$OUTPUT_FILE"
echo "]" >>"$OUTPUT_FILE"

echo "✅ index.json updated successfully at $OUTPUT_FILE"
