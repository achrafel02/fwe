# Travel Planner API

## Übersicht

Dies ist eine API für die Verwaltung von Reisen und Reisezielen. Sie ermöglicht das Erstellen, Lesen, Aktualisieren und Löschen von Reisen und Reisezielen sowie das Hinzufügen und Entfernen von Reisezielen zu Reisen.

## Endpunkte

### Reisen

- **POST /api/travels**: Eine neue Reise erstellen
- **GET /api/travels**: Alle Reisen abrufen
- **GET /api/travels/:id**: Eine Reise nach ID abrufen
- **PUT /api/travels/:id**: Eine Reise nach ID aktualisieren
- **DELETE /api/travels/:id**: Eine Reise nach ID löschen
- **GET /api/travels/search**: Reisen nach Name oder Datum suchen

### Reiseziele

- **POST /api/destinations**: Ein neues Reiseziel erstellen
- **GET /api/destinations**: Alle Reiseziele abrufen
- **GET /api/destinations/:id**: Ein Reiseziel nach ID abrufen
- **PUT /api/destinations/:id**: Ein Reiseziel nach ID aktualisieren
- **DELETE /api/destinations/:id**: Ein Reiseziel nach ID löschen

### Beziehungen zwischen Reisen und Reisezielen

- **POST /api/travels/:travelId/destinations/:destinationId**: Ein Reiseziel zu einer Reise hinzufügen
- **DELETE /api/travels/:travelId/destinations/:destinationId**: Ein Reiseziel von einer Reise entfernen

## Installation und Ausführung

1. **Projekt klonen**:
   ```sh
   git clone <repository-url>
   cd travel-planner-api
