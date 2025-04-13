"""
Script to display the structure and content of the KamenPro Supabase database.

This script targets the specific tables identified in the database:
- karakteristike_proizvoda
- slike_proizvoda
- proizvodi
- kategorije
- istorija_zaliha
- zalihe

Before running, install required packages:
pip install supabase
"""

import json
from supabase import create_client

def export_database_content(url, key):
    try:
        # Initialize Supabase client
        supabase = create_client(url, key)
        print("Connected to Supabase successfully.")

        # List of tables identified from the database schema
        known_tables = [
            'karakteristike_proizvoda',
            'slike_proizvoda',
            'proizvodi',
            'kategorije',
            'istorija_zaliha',
            'zalihe'
        ]

        for i, table_name in enumerate(known_tables, 1):
            print(f"\n{i}. Table: {table_name}")

            try:
                # Get table data to infer structure
                data_response = supabase.table(table_name).select("*").execute()

                if data_response.data and len(data_response.data) > 0:
                    # Infer structure from the first row
                    first_row = data_response.data[0]

                    print("\n  Table Structure:")
                    for key, value in first_row.items():
                        data_type = type(value).__name__ if value is not None else "None"
                        print(f"    - {key}: {data_type}")

                    # Show table data
                    print(f"\n  Table Data ({len(data_response.data)} rows):")
                    for j, row in enumerate(data_response.data, 1):
                        print(f"    Row {j}:")
                        for key, value in row.items():
                            if isinstance(value, dict) or isinstance(value, list):
                                print(f"      {key}: {json.dumps(value)}")
                            else:
                                print(f"      {key}: {value}")
                elif data_response.data:
                    print("\n  Table is empty but exists.")
                else:
                    print("\n  Could not retrieve table data. The table might be empty.")
            except Exception as e:
                print(f"\n  Error accessing table: {e}")

            print("\n" + "-"*80)

    except Exception as e:
        print(f"An error occurred: {e}")
        import traceback
        traceback.print_exc()

def check_table_relationships():
    """
    Based on the database schema screenshot, this function prints the
    identified relationships between tables.
    """
    print("\nTable Relationships (based on schema visualization):")
    print("\n1. proizvodi")
    print("   - Primary key: id")
    print("   - Referenced by:")
    print("     * karakteristike_proizvoda.proizvod_id")
    print("     * slike_proizvoda.proizvod_id")
    print("     * zalihe.proizvod_id")
    print("     * istorija_zaliha.proizvod_id")

    print("\n2. kategorije")
    print("   - Primary key: id")
    print("   - Referenced by:")
    print("     * proizvodi.kategorija_id")

    print("\n3. zalihe")
    print("   - Primary key: id")
    print("   - References: proizvodi.id via proizvod_id")
    print("   - Referenced by:")
    print("     * istorija_zaliha.zaliha_id")

    print("\n4. karakteristike_proizvoda")
    print("   - Primary key: id")
    print("   - References: proizvodi.id via proizvod_id")

    print("\n5. slike_proizvoda")
    print("   - Primary key: id")
    print("   - References: proizvodi.id via proizvod_id")

    print("\n6. istorija_zaliha")
    print("   - Primary key: id")
    print("   - References:")
    print("     * proizvodi.id via proizvod_id")
    print("     * zalihe.id via zaliha_id")

if __name__ == "__main__":
    # Supabase credentials
    url = "https://yodddwoxxifcuawbmzop.supabase.co"
    key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZGRkd294eGlmY3Vhd2Jtem9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MTQ0ODAsImV4cCI6MjA1NzA5MDQ4MH0.yfHzfWYzUxR-YDxThj_8pbnDvaJ2yIekUe4NUG0V5b0"

    # Export the content of all identified tables
    export_database_content(url, key)

    # Display table relationships based on the schema visualization
    check_table_relationships()