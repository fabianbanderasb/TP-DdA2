# Desarrollo de aplicaciones multiplataforma

## API (Node 18, expressjs 4)

- Ya incluye una DB con datos de prueba (2 válculas, 2 sensores, algunas mediciones y logs)
- Se encuentra dockerizada la base de datos, por lo que esta se levanta ingresando a la carpeta backend y ejecutar el comando 

```
docker compose up
```

- Para levantar la API se debe hacer 

```
npm install
```

```
npm run dev
```

la carpeta **/backend**, esto levantará la API en el puerto 3000; la API ya se encuentra conectada a la DB de Docker

Existen 6 endpoints:

1. **GET /devices** - Lista de dispositivos

2. **GET /valves/:valveId** - Lista de válvulas

3. **GET /devices/:deviceId** - Dispositivo junto a su última medición

4. **GET /measurements/:deviceId** - Listado de mediciones de un dispositivo

5. **GET /logs/:valveId** - Registros de aperturas/cierre sobre una válvula

6. **PUT /valves/:valveId** abre/cierra una válvula, generando un registro y creando una medición aleatoria (de 0 a 100)

## Webapp (Node 18, Ionic 7)

- Se debe moverse a la carpeta **frontend/** y correr *npm install* (usar node 18 preferentemente)
- el comando *ionic serve* iniciará un navegador con la app corriendo en *http://localhost:8100* (ya se encuentra apuntando a la API en el puerto 3000)

Se incorporaron:

- 1 directiva (StatusHighlightDirective) para setear el color del valor de una medición (verde, amarillo, naranja y rojo de acuerdo al valor)

- 4 servicios (LogService, DeviceService, ValveService, MeasurementService)

- 4 pantallas (Devices, Device-Detail, Logs, Measurements)

- 1 pipe (MeasurementUnitPipe) para formatear el valor de una medición (valor + unidad de medida Cb)

- 4 modelos (Device, Measurement, Valve, Log)
