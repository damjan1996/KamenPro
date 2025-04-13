#!/usr/bin/env python
"""
Script to directly access folders within the Supabase 'product-images' bucket.
This script bypasses the need to list buckets and accesses known folders directly.
"""

import requests
import json

# Supabase project details
SUPABASE_URL = "https://yodddwoxxifcuawbmzop.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZGRkd294eGlmY3Vhd2Jtem9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MTQ0ODAsImV4cCI6MjA1NzA5MDQ4MH0.yfHzfWYzUxR-YDxThj_8pbnDvaJ2yIekUe4NUG0V5b0"
BUCKET_NAME = "product-images"

# Known folders based on the screenshot
KNOWN_FOLDERS = ["Cigla", "Dolomite", "Kamen"]

def get_headers():
    """Return the headers needed for Supabase API calls"""
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}"
    }

def list_files_in_folder(folder_path=""):
    """
    List files in a specific folder within the product-images bucket.
    If folder_path is empty, lists files in the root of the bucket.
    """
    headers = get_headers()

    # Build the URL for listing objects
    list_url = f"{SUPABASE_URL}/storage/v1/object/list/{BUCKET_NAME}"

    # If a folder is specified, add it as a prefix parameter
    params = {}
    if folder_path:
        params["prefix"] = folder_path
        # Ensure there's a trailing slash for folders
        if not folder_path.endswith('/'):
            params["prefix"] += '/'

    print(f"\nListing files in {BUCKET_NAME}/{folder_path if folder_path else 'root'}...")
    print(f"URL: {list_url}")
    print(f"Params: {params}")

    response = requests.get(list_url, headers=headers, params=params)

    print(f"Response status: {response.status_code}")

    if response.status_code != 200:
        print(f"Error: {response.status_code} - {response.text}")
        return []

    # Parse the JSON response
    try:
        files = response.json()
        print(f"Files found: {len(files)}")
        return files
    except json.JSONDecodeError as e:
        print(f"Error parsing response: {e}")
        print(f"Raw response: {response.text}")
        return []

def get_file_public_url(file_path):
    """Generate the public URL for a file in the bucket"""
    return f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{file_path}"

def display_file_info(files):
    """Display information about files"""
    if not files:
        print("No files found.")
        return

    # Print detailed information about each file
    for i, file in enumerate(files, 1):
        name = file.get("name", "Unknown")
        public_url = get_file_public_url(name)

        print(f"{i}. File: {name}")
        print(f"   URL: {public_url}")

        if "metadata" in file and file["metadata"]:
            size = file["metadata"].get("size", "Unknown")
            mime_type = file["metadata"].get("mimetype", "Unknown")
            print(f"   Size: {size} bytes")
            print(f"   Type: {mime_type}")

        if "created_at" in file:
            print(f"   Created: {file['created_at']}")

        print()

    # Print table for easy copying
    print("\nTable of all files (for easy copying):")
    print("| # | File | URL |")
    print("|---|------|-----|")

    for i, file in enumerate(files, 1):
        name = file.get("name", "Unknown")
        public_url = get_file_public_url(name)
        print(f"| {i} | {name} | {public_url} |")

def main():
    print("=== Supabase Direct Folder Access ===")
    print(f"Bucket: {BUCKET_NAME}")

    all_files = []

    # First, try listing files at the root level
    root_files = list_files_in_folder()
    all_files.extend(root_files)

    # Then try each known folder
    for folder in KNOWN_FOLDERS:
        folder_files = list_files_in_folder(folder)
        all_files.extend(folder_files)

    # Display summary
    print("\n" + "="*50)
    print(f"Total files found: {len(all_files)}")

    # Display all files found
    display_file_info(all_files)

    if not all_files:
        print("\nNo files were found in any location.")
        print("This could be due to:")
        print("1. The bucket name being incorrect or case-sensitive")
        print("2. Permission issues with the API key")
        print("3. The folder structure being different than expected")
        print("\nTry checking the Supabase dashboard to verify the correct paths.")

if __name__ == "__main__":
    main()