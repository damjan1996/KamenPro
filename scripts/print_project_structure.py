import os

# Stammverzeichnis auf den gewünschten Pfad setzen
root_dir = r"C:\Users\DamjanSavic\Documents\WebStorm\KamenPro"

# Zu ignorierende Verzeichnisse und Dateien
ignore_patterns = [
    "__pycache__",
    ".idea",
    ".git",
    "node_modules",
    "External Libraries",
    "Scratches and Consoles"
]

def should_ignore(path):
    """Überprüft, ob der Pfad ignoriert werden soll."""
    basename = os.path.basename(path)
    for pattern in ignore_patterns:
        if pattern in path:
            return True
    return False

def read_file_content(file_path):
    """Liest den Inhalt einer Datei, falls möglich."""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
            if len(content) > 500:
                return content[:500] + "..."
            return content
    except UnicodeDecodeError:
        try:
            # Versuch mit einer anderen Kodierung
            with open(file_path, "r", encoding="latin-1") as file:
                content = file.read()
                if len(content) > 500:
                    return content[:500] + "..."
                return content
        except Exception as e:
            return f"[Fehler beim Lesen: {e}]"
    except Exception as e:
        return f"[Fehler beim Lesen: {e}]"

def list_files_and_dirs(start_path):
    """Gibt alle Verzeichnisse, Unterverzeichnisse und Dateien aus."""
    print(f"Verzeichnisstruktur für: {start_path}\n")

    for dirpath, dirnames, filenames in os.walk(start_path, topdown=True):
        # Ignoriere bestimmte Verzeichnisse in-place
        dirnames[:] = [d for d in dirnames if not should_ignore(os.path.join(dirpath, d))]

        # Relative Pfadanzeige zum Start-Verzeichnis für bessere Lesbarkeit
        rel_path = os.path.relpath(dirpath, start_path)
        if rel_path == ".":
            print(f"📁 {os.path.basename(start_path)}")
        else:
            indent = "  " * (len(rel_path.split(os.sep)) - 1)
            print(f"{indent}📁 {os.path.basename(dirpath)}")

        # Dateien im aktuellen Verzeichnis auflisten
        for file in sorted(filenames):
            file_path = os.path.join(dirpath, file)
            if should_ignore(file_path):
                continue

            indent = "  " * len(os.path.relpath(dirpath, start_path).split(os.sep))
            print(f"{indent}📄 {file}")

# Skript starten
if __name__ == "__main__":
    if os.path.exists(root_dir):
        list_files_and_dirs(root_dir)
    else:
        print(f"Das Verzeichnis '{root_dir}' existiert nicht.")