#!/bin/bash
# echo run server de produccion frontend
# -- COMANDOS PARA LEVANTAR SERVIDOR DE PRODUCCION VUEJES
# 1. sudo npm install -g serve
# 2. npm run build:prod
# sudo chown azureuser frontend_unigrasas_facturacion/# Dar permisos de propietario de la carpeta al usuario LINUX
# sudo chown -R root:$(whoami) /usr/local/lib/node_modules/ # apuntar a la carpeta node_modules del proyecto
# sudo chmod -R 775 /usr/local/lib/node_modules/
serve -s dist -l 9527