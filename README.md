# Contenedores Lab (Node.js + MongoDB)

Proyecto base con **Node.js (Express)** y **MongoDB** ejecutado en contenedores con **Docker Compose**.

## Descripcion

La aplicacion expone dos endpoints de estado y valida conectividad contra MongoDB usando Mongoose.

- Servicio app: Node.js + Express
- Base de datos: MongoDB
- Orquestacion local: Docker Compose

## Estructura del proyecto

- `index.js`: servidor Express y endpoints de estado
- `db.js`: construccion de URI de conexion a MongoDB desde variables de entorno
- `Dockerfile`: imagen de la app Node.js
- `docker-compose.yml`: definicion de servicios `app` y `mongo`
- `app_node_logs.txt`: logs de la app (si se exportan)
- `mongo_db_logs.txt`: logs de MongoDB (si se exportan)

## Requisitos

- Docker
- Docker Compose

Opcional para ejecucion local (sin contenedor de app):

- Node.js 20+
- npm

## Variables de entorno

Variables usadas por la aplicacion (definidas en `docker-compose.yml`):

- `NODE_ENV` (default en compose: `production`)
- `MONGO_HOST` (default en codigo: `mongo`)
- `MONGO_PORT` (default en codigo: `27017`)
- `MONGO_USER` (default en codigo: `labajos`)
- `MONGO_PASS` (default en codigo: `labajosmichael`)
- `MONGO_DB` (default en codigo: `appdb`)

La URI se arma en `db.js` asi:

`mongodb://<user>:<pass>@<host>:<port>/<db>?authSource=admin`

## Endpoints

Con la app arriba en el puerto 3000:

- `GET /`
  - Devuelve informacion basica del servicio y estado de conexion con MongoDB
- `GET /health`
  - Devuelve `200` si MongoDB esta conectado, `503` en caso contrario

Ejemplos:

```bash
curl http://localhost:3000/
curl http://localhost:3000/health
```

## Ejecutar con Docker Compose

1. Construir y levantar servicios:

```bash
docker compose up -d --build
```

2. Ver logs:

```bash
docker compose logs -f app
docker compose logs -f mongo
```

3. Probar endpoints:

```bash
curl http://localhost:3000/
curl http://localhost:3000/health
```

4. Detener servicios:

```bash
docker compose down
```

5. Detener y borrar volumen de datos (reinicio limpio de MongoDB):

```bash
docker compose down -v
```

## Ejecucion local (sin contenedor de app)

Puedes ejecutar MongoDB en Docker y la app en tu host:

1. Levantar solo MongoDB:

```bash
docker compose up -d mongo
```

2. Instalar dependencias:

```bash
npm install
```

3. Exportar variables de entorno (ejemplo en PowerShell):

```powershell
$env:MONGO_HOST="localhost"
$env:MONGO_PORT="27017"
$env:MONGO_USER="labajos"
$env:MONGO_PASS="labajosmichael"
$env:MONGO_DB="appdb"
```

4. Iniciar app:

```bash
node index.js
```

## Nota importante

En el estado actual, `package.json` no incluye script `start`, pero el `Dockerfile` ejecuta `npm start`.

Si quieres alinear ambos archivos, agrega en `package.json`:

```json
"scripts": {
  "start": "node index.js"
}
```

## Imagen Docker

El `docker-compose.yml` usa esta etiqueta para la app:

- `mlabajos/contenedores-lab:latest`

## Red y volumen

- Red: `app_net` (bridge)
- Volumen: `mongo_data` montado en `/data/db`
