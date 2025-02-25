import os

# Stammverzeichnis
root_dir = r"C:\Users\DamjanSavic\Documents\WebStorm\KamenPro"

# Ignorierte Pfade (Verzeichnisse & Dateien)
ignore_list = {
    os.path.join(root_dir, ".idea"),
    os.path.join(root_dir, "node_modules"),
    os.path.join(root_dir, "package-lock.json"),
    "External Libraries",
    "Scratches and Consoles"
}

def should_ignore(path):
    """Überprüft, ob der Pfad ignoriert werden soll."""
    abs_path = os.path.abspath(path)
    return any(abs_path.startswith(ignore) for ignore in ignore_list)

def read_file_content(file_path):
    """Liest den Inhalt einer Datei, falls möglich."""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        return f"[Fehler beim Lesen: {e}]"

def list_files_and_dirs(start_path):
    """Gibt alle Verzeichnisse, Unterverzeichnisse und Dateien mit Inhalt aus."""
    for dirpath, dirnames, filenames in os.walk(start_path, topdown=True):
        # Verzeichnisse in-place filtern (damit os.walk sie nicht betritt)
        dirnames[:] = [d for d in dirnames if not should_ignore(os.path.join(dirpath, d))]

        print(f"\n📁 Verzeichnis: {dirpath}")

        for file in filenames:
            file_path = os.path.join(dirpath, file)
            if should_ignore(file_path):
                continue

            print(f"  📄 Datei: {file}")
            content = read_file_content(file_path)
            print(f"    Inhalt:\n{content[:500]}...")  # Zeigt max. 500 Zeichen für große Dateien

# Skript starten
if __name__ == "__main__":
    list_files_and_dirs(root_dir)
