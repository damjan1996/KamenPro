import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Supabase Client mit den korrekten Credentials
const supabaseUrl = 'https://yodddwoxxifcuawbmzop.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZGRkd294eGlmY3Vhd2Jtem9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MTQ0ODAsImV4cCI6MjA1NzA5MDQ4MH0.yfHzfWYzUxR-YDxThj_8pbnDvaJ2yIekUe4NUG0V5b0'
const supabase = createClient(supabaseUrl, supabaseKey)

// Verzeichnispfade, die wir definitiv durchsuchen möchten
const knownPaths = [
    '', // Root
    'Cigla',
    'Cigla/Rustik',
    'Cigla/Rustik/Red',
    'Cigla/Rustik/White',
    'Dolomite',
    'Dolomite/Anthracite',
    'Dolomite/Brown',
    'Dolomite/Coffee',
    'Dolomite/Grey',
    'Dolomite/White',
    'Kamen',
    'Kamen/Anthracite',
    'Kamen/White',
    'Page',
    'Page/About',
    'Page/About/Hero',
    'Page/About/History',
    'Page/About/Production',
    'Page/About/Values',
    'Page/About/Vision',
    'Page/Contact',
    'Page/Contact/Hero',
    'Page/Homepage',
    'Page/Homepage/About',
    'Page/Homepage/Hero',
    'Page/Homepage/Projects',
    'Page/Homepage/Testimonials',
    'Page/Products',
    'Page/Products/Categories',
    'Page/Products/Hero',
    'Page/Products/Installation',
    'Page/Products/Material',
    'Page/References',
    'Page/References/Clients',
    'Page/References/Hero'
];

// Funktion zur detaillierten Anzeige der Dateien mit Vollständigkeitsprüfung
async function listFilesInPath(bucketName, path = '') {
    console.log(`Durchsuche Pfad detailliert: ${path || 'Root'}`)

    const { data, error } = await supabase
        .storage
        .from(bucketName)
        .list(path, { sortBy: { column: 'name', order: 'asc' } })

    if (error) {
        console.error(`Fehler beim Auflisten von Dateien in ${path}:`, error)
        return []
    }

    if (!data || data.length === 0) {
        console.log(`Keine Dateien in ${path || 'Root'} gefunden.`)
        return []
    }

    // Separate Dateien und Ordner
    const files = data.filter(item => item.id) // Items mit ID sind Dateien
    const folders = data.filter(item => !item.id) // Items ohne ID sind Ordner

    console.log(`Gefunden: ${files.length} Dateien und ${folders.length} Ordner in ${path || 'Root'}`)

    // Verarbeite alle Dateien im aktuellen Pfad
    const allFiles = []

    // Datailliertere Dateiinformationen abrufen
    for (const file of files) {
        // Überspringe die .emptyFolderPlaceholder Datei
        if (file.name === '.emptyFolderPlaceholder') continue

        const filePath = path ? `${path}/${file.name}` : file.name
        const url = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath).data.publicUrl

        // Versuche, weitere Metadaten zu erhalten
        try {
            const { data: metadata, error: metaError } = await supabase
                .storage
                .from(bucketName)
                .getPublicUrl(filePath, {
                    download: false,
                    transform: {
                        width: 10 // Minimale Anfrage, nur um zu prüfen, ob die Datei existiert
                    }
                })

            // Füge die Datei zur Liste hinzu
            allFiles.push({
                name: file.name,
                path: filePath,
                url: url,
                exists: !metaError,
                id: file.id,
                size: file.metadata?.size || 'unbekannt',
                type: file.metadata?.mimetype || path.extname(file.name).substring(1) || 'unbekannt'
            })
        } catch (err) {
            console.warn(`Konnte Metadaten für ${filePath} nicht abrufen:`, err)
            allFiles.push({
                name: file.name,
                path: filePath,
                url: url,
                exists: false,
                error: 'Metadaten nicht verfügbar'
            })
        }
    }

    return allFiles
}

// Funktion, die alle bekannten Pfade ausgibt
async function getAllKnownFiles(bucketName, knownPaths) {
    let allFiles = []

    // Durchlaufe alle bekannten Pfade
    for (const pathToCheck of knownPaths) {
        const files = await listFilesInPath(bucketName, pathToCheck)
        allFiles = [...allFiles, ...files]
    }

    return allFiles
}

// Funktion zum direkten Auflisten aller Dateien mit einem Präfix
async function listAllWithPrefix(bucketName, prefix = '') {
    console.log(`Suche nach allen Dateien mit Präfix: "${prefix}"`)

    try {
        // Verwende die Supabase API, um alle Dateien mit diesem Präfix zu finden
        const { data, error } = await supabase
            .storage
            .from(bucketName)
            .list(prefix, {
                limit: 10000, // Maximaler Wert
                offset: 0,
                sortBy: { column: 'name', order: 'asc' }
            })

        if (error) {
            console.error(`Fehler beim Auflisten mit Präfix ${prefix}:`, error)
            return []
        }

        console.log(`Gefunden mit Präfix "${prefix}": ${data?.length || 0} Elemente`)

        // Filtere nur Dateien und generiere URLs
        const files = data
            .filter(item => item.id) // Nur Dateien, keine Ordner
            .filter(file => file.name !== '.emptyFolderPlaceholder') // Keine Platzhalter
            .map(file => {
                const filePath = prefix ? `${prefix}/${file.name}` : file.name
                return {
                    name: file.name,
                    path: filePath,
                    url: supabase.storage
                        .from(bucketName)
                        .getPublicUrl(filePath).data.publicUrl
                }
            })

        return files
    } catch (err) {
        console.error('Fehler beim Auflisten aller Dateien mit Präfix:', err)
        return []
    }
}

// Funktion, die alle Dateien in allen Top-Level-Ordnern sucht
async function searchAllTopLevelFolders(bucketName) {
    // Zuerst das Root-Verzeichnis auflisten, um Top-Level-Ordner zu finden
    const { data, error } = await supabase
        .storage
        .from(bucketName)
        .list()

    if (error) {
        console.error('Fehler beim Auflisten des Root-Verzeichnisses:', error)
        return []
    }

    // Extrahiere Ordnernamen (Elemente ohne ID sind Ordner)
    const topFolders = data
        .filter(item => !item.id)
        .map(folder => folder.name)

    console.log(`Gefundene Top-Level-Ordner: ${topFolders.join(', ')}`)

    let allFiles = []

    // Durchsuche jeden Ordner
    for (const folder of topFolders) {
        console.log(`Durchsuche vollständig den Ordner: ${folder}`)

        // Versuche mit verschiedenen Methoden, alle Dateien zu finden
        const filesWithPrefix = await listAllWithPrefix(bucketName, folder)
        allFiles = [...allFiles, ...filesWithPrefix]
    }

    return allFiles
}

// Hauptfunktion zum Auflisten aller Dateien
async function getAllProductImages() {
    const bucketName = 'product-images'
    let allFiles = []

    console.log('Starte umfassende Suche nach allen Dateien im Bucket...')

    // Methode 1: Durchsuche alle bekannten Pfade
    console.log('\n=== METHODE 1: Bekannte Pfade durchsuchen ===')
    const filesFromKnownPaths = await getAllKnownFiles(bucketName, knownPaths)
    console.log(`Methode 1: ${filesFromKnownPaths.length} Dateien gefunden`)
    allFiles = [...allFiles, ...filesFromKnownPaths]

    // Methode 2: Suche in allen Top-Level-Ordnern
    console.log('\n=== METHODE 2: Alle Top-Level-Ordner durchsuchen ===')
    const filesFromTopFolders = await searchAllTopLevelFolders(bucketName)
    console.log(`Methode 2: ${filesFromTopFolders.length} Dateien gefunden`)

    // Kombiniere die Ergebnisse und entferne Duplikate basierend auf dem Pfad
    const pathSet = new Set(allFiles.map(file => file.path))

    for (const file of filesFromTopFolders) {
        if (!pathSet.has(file.path)) {
            pathSet.add(file.path)
            allFiles.push(file)
        }
    }

    // Methode 3: Versuche, die gesamte Bucket-Struktur zu durchlaufen
    console.log('\n=== METHODE 3: Gesamte Bucket-Struktur durchsuchen ===')
    try {
        const { data, error } = await supabase
            .storage
            .from(bucketName)
            .list('', {
                limit: 10000,
                sortBy: { column: 'name', order: 'asc' }
            })

        if (!error && data) {
            // Alle Dateien aus dem Root-Verzeichnis hinzufügen
            const rootFiles = data
                .filter(item => item.id)
                .filter(file => file.name !== '.emptyFolderPlaceholder')
                .map(file => ({
                    name: file.name,
                    path: file.name,
                    url: supabase.storage
                        .from(bucketName)
                        .getPublicUrl(file.name).data.publicUrl
                }))

            for (const file of rootFiles) {
                if (!pathSet.has(file.path)) {
                    pathSet.add(file.path)
                    allFiles.push(file)
                }
            }
        }
    } catch (err) {
        console.error('Fehler bei Methode 3:', err)
    }

    console.log(`\nGesamtergebnis: ${allFiles.length} eindeutige Dateien gefunden`)

    // Sortiere alle Dateien nach Pfad für eine übersichtliche Ausgabe
    allFiles.sort((a, b) => a.path.localeCompare(b.path))

    // Speichere die Ergebnisse in verschiedenen Formaten

    // 1. Vollständige JSON mit allen Metadaten
    fs.writeFileSync(
        'product-images-vollstaendig.json',
        JSON.stringify(allFiles, null, 2),
        'utf8'
    )

    // 2. Einfache Liste aller URLs
    const urlsOnly = allFiles.map(file => file.url)
    fs.writeFileSync(
        'product-images-urls.txt',
        urlsOnly.join('\n'),
        'utf8'
    )

    // 3. CSV-Datei mit den wichtigsten Informationen
    const csvHeader = 'Name,Pfad,URL\n'
    const csvRows = allFiles.map(file =>
        `"${file.name}","${file.path}","${file.url}"`
    )
    fs.writeFileSync(
        'product-images.csv',
        csvHeader + csvRows.join('\n'),
        'utf8'
    )

    // 4. HTML-Datei mit allen Bildvorschauen
    const htmlStart = `<!DOCTYPE html>
<html>
<head>
  <title>Produktbilder Übersicht</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
    .image-card { border: 1px solid #ddd; padding: 10px; border-radius: 5px; }
    .image-card img { max-width: 100%; height: auto; }
    .image-info { margin-top: 10px; font-size: 12px; }
  </style>
</head>
<body>
  <h1>Alle Produktbilder (${allFiles.length})</h1>
  <div class="gallery">
`

    const htmlItems = allFiles.map(file => `
    <div class="image-card">
      <img src="${file.url}" alt="${file.name}" loading="lazy">
      <div class="image-info">
        <strong>Name:</strong> ${file.name}<br>
        <strong>Pfad:</strong> ${file.path}<br>
        <a href="${file.url}" target="_blank">Originalbild öffnen</a>
      </div>
    </div>
  `).join('')

    const htmlEnd = `
  </div>
</body>
</html>`

    fs.writeFileSync(
        'product-images-galerie.html',
        htmlStart + htmlItems + htmlEnd,
        'utf8'
    )

    console.log('\nDie Ergebnisse wurden in folgenden Dateien gespeichert:')
    console.log('- product-images-vollstaendig.json (Vollständige Daten)')
    console.log('- product-images-urls.txt (Nur URLs)')
    console.log('- product-images.csv (CSV-Format)')
    console.log('- product-images-galerie.html (HTML-Galerie mit Bildvorschauen)')

    return allFiles
}

// Führe die Hauptfunktion aus
getAllProductImages()
    .then(files => {
        if (files.length > 0) {
            // Statistiken ausgeben
            console.log('\n=== STATISTIKEN ===')

            // Dateitypen zählen
            const fileTypes = {}
            files.forEach(file => {
                const ext = path.extname(file.name).substring(1).toLowerCase()
                fileTypes[ext] = (fileTypes[ext] || 0) + 1
            })

            console.log('\nDateitypen:')
            Object.entries(fileTypes)
                .sort((a, b) => b[1] - a[1]) // Sortiere nach Anzahl absteigend
                .forEach(([ext, count]) => {
                    console.log(`${ext}: ${count} Dateien`)
                })

            // Nach Top-Level-Ordnern gruppieren
            const topFolders = {}
            files.forEach(file => {
                const topFolder = file.path.split('/')[0]
                topFolders[topFolder] = (topFolders[topFolder] || 0) + 1
            })

            console.log('\nAnzahl der Dateien pro Top-Level-Ordner:')
            Object.entries(topFolders)
                .sort((a, b) => b[1] - a[1]) // Sortiere nach Anzahl absteigend
                .forEach(([folder, count]) => {
                    console.log(`${folder}: ${count} Dateien`)
                })

            // Gebe die ersten und letzten Dateien zur Überprüfung aus
            console.log('\nDie ersten 10 Dateien:')
            files.slice(0, 10).forEach(file => {
                console.log(`- ${file.path}`)
            })

            console.log('\nDie letzten 10 Dateien:')
            files.slice(-10).forEach(file => {
                console.log(`- ${file.path}`)
            })

            // JavaScript code ausgeben, der alle diese Bilder verwendet
            console.log('\nBeispiel JavaScript-Code zum Laden und Verwenden der Bilder:')
            console.log(`
// Alle Produkt-Bild-URLs
const productImages = ${JSON.stringify(files.map(f => ({ path: f.path, url: f.url })), null, 2)};

// Funktion zum Laden eines Bildes
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

// Beispiel: Lade alle Bilder
async function loadAllImages() {
  const imagePromises = productImages.map(img => loadImage(img.url));
  try {
    const loadedImages = await Promise.all(imagePromises);
    console.log(\`\${loadedImages.length} Bilder erfolgreich geladen\`);
    return loadedImages;
  } catch (error) {
    console.error('Fehler beim Laden der Bilder:', error);
  }
}
      `)
        } else {
            console.log('Keine Bilder gefunden.')
        }
    })
    .catch(err => {
        console.error('Fehler in der Hauptfunktion:', err)
    })