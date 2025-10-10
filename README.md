# Geovisor AU – Urban Tree Census Viewer

An interactive web geoportal for visualizing and querying Ibagué’s urban tree census, built with open government data.

**Live Demo:** [https://geovisor-au.vercel.app](https://geovisor-au.vercel.app)

---

## Overview

This project transforms Colombia’s open urban forestry data into an accessible, interactive visualization tool. It enables citizens, urban planners, and environmental researchers to explore biodiversity patterns, conservation status, and the spatial distribution of over **100,000 trees** across Ibagué’s urban area.

---

## Features

### Biodiversity Dashboard

- Real-time statistics: total trees, unique species, and botanical families  
- Growth habit classification (trees, shrubs, palms, bamboo)  
- Interactive charts with animated counters  

### Interactive Mapping

- Clustered markers for efficient performance with large datasets (100k+ points)  
- Species-based filtering and detailed popups  

### Advanced Search

- Dual search modes: scientific and common names  
- Real-time API queries with dynamic filtering  
- Responsive UI with instant visual feedback  

### Spatial Distribution

- Tree counts by commune (proportional bar chart)  
- Neighborhood-level details available via popups  

---

## Technical Stack

### Frontend

- React 18 + Vite  
- Tailwind CSS + Ant Design components  

### Mapping & Geospatial

- Leaflet + React-Leaflet  
- React Leaflet Cluster (marker clustering)  
- Turf.js (geospatial calculations)  
- Proj4js (coordinate transformations)  

---

## Data Source

- **Dataset:** *Censo de Arbolado Urbano en Ibagué*  
- **Provider:** Colombian Open Data Portal ([datos.gov.co](https://www.datos.gov.co))  
