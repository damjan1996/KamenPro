import psycopg2
import json

# Verbindungsparameter
db_params = {
    "host": "db.yodddwoxxifcuawbmzop.supabase.co",
    "port": "5432",
    "database": "postgres",
    "user": "postgres",
    "password": "DamjanSavicLogin1!"
}

def test_connection():
    """Test der Verbindung zur Supabase-Datenbank"""
    try:
        # Verbindung zur Datenbank herstellen
        conn = psycopg2.connect(**db_params)
        cursor = conn.cursor()

        print("✅ Verbindung zur Datenbank erfolgreich hergestellt!")

        # Tabellen auflisten
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """)

        tables = cursor.fetchall()
        print("\n📋 Verfügbare Tabellen:")
        for table in tables:
            print(f"  - {table[0]}")

        # Beispiel: Daten aus der Produkte-Tabelle abrufen
        print("\n🔍 Abfrage einiger Produkte:")
        cursor.execute("SELECT id, sifra, naziv FROM proizvodi LIMIT 5")
        products = cursor.fetchall()

        for product in products:
            print(f"  - {product[1]}: {product[2]} (ID: {product[0]})")

        # Produktdetails für ein bestimmtes Produkt
        print("\n📊 Komplettes Beispielprodukt:")
        cursor.execute("SELECT * FROM proizvodi LIMIT 1")
        column_names = [desc[0] for desc in cursor.description]
        product_data = cursor.fetchone()

        product_dict = {column_names[i]: product_data[i] for i in range(len(column_names))}
        print(json.dumps(product_dict, indent=2, default=str))

        # Test von Joins für ein komplettes Produktdetail
        print("\n🔄 Produktdetails mit verknüpften Daten:")

        product_id = product_dict["id"]

        # Kategorie
        cursor.execute(f"SELECT * FROM kategorije WHERE id = '{product_dict['kategorija_id']}'")
        category = cursor.fetchone()
        category_names = [desc[0] for desc in cursor.description]
        category_dict = {category_names[i]: category[i] for i in range(len(category_names))}

        # Bilder
        cursor.execute(f"SELECT * FROM slike_proizvoda WHERE proizvod_id = '{product_id}'")
        images = cursor.fetchall()
        image_names = [desc[0] for desc in cursor.description]
        images_list = []

        for image in images:
            image_dict = {image_names[i]: image[i] for i in range(len(image_names))}
            images_list.append(image_dict)

        # Produkteigenschaften
        cursor.execute(f"SELECT * FROM karakteristike_proizvoda WHERE proizvod_id = '{product_id}'")
        characteristics = cursor.fetchall()
        char_names = [desc[0] for desc in cursor.description]
        characteristics_list = []

        for char in characteristics:
            char_dict = {char_names[i]: char[i] for i in range(len(char_names))}
            characteristics_list.append(char_dict)

        # Lagerdaten
        cursor.execute(f"SELECT * FROM zalihe WHERE proizvod_id = '{product_id}'")
        inventory = cursor.fetchone()
        inventory_names = [desc[0] for desc in cursor.description]
        inventory_dict = {inventory_names[i]: inventory[i] for i in range(len(inventory_names))} if inventory else None

        # Komplettes Produktdetail
        complete_product = {
            "product": product_dict,
            "category": category_dict,
            "images": images_list,
            "characteristics": characteristics_list,
            "inventory": inventory_dict
        }

        # Nur einen Teil ausgeben, um die Antwort kompakt zu halten
        print("Product:", complete_product["product"]["naziv"])
        print("Category:", complete_product["category"]["naziv"])
        print("Number of images:", len(complete_product["images"]))
        print("Number of characteristics:", len(complete_product["characteristics"]))
        print("Inventory status:", complete_product["inventory"]["status"] if complete_product["inventory"] else "Not available")

        # Verbindung schließen
        cursor.close()
        conn.close()
        print("\n✅ Test abgeschlossen und Verbindung geschlossen.")

        return complete_product

    except Exception as e:
        print(f"❌ Fehler bei der Verbindung zur Datenbank: {e}")
        return None

if __name__ == "__main__":
    test_connection()