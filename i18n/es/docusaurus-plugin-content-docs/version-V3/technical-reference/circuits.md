---
sidebar_position: 2
---

# Circuitos

El [circuito Semaphore](https://github.com/semaphore-protocol/semaphore/tree/main/packages/circuits) es el corazón del protocolo y está compuesto por tres partes:

-   [**Prueba de membresía**](/docs/technical-reference/circuits#proof-of-membership)
-   [**Hash anulador**](/docs/technical-reference/circuits#nullifier-hash) (Nullifier hash)
-   [**Señal**](/docs/technical-reference/circuits#signal)

![Semaphore circuit](https://github.com/semaphore-protocol/semaphore/raw/main/packages/circuits/scheme.png)

El diagrama anterior muestra cómo se utilizan las señales de entrada en el circuito Semaphore y cómo se calculan los resultados.

## Prueba de membresía

El circuito resume criptográficamente (hashes) el hash del anulador (nullifier) de la identidad utilizandola identidad trampilla para generar el compromiso de identidad. Después de esto, el circuito verifica la prueba de membresía contra la raíz de Merkle y el compromiso de identidad.

**Insumos (inputs) privados:**

-   `treeSiblings[nLevels]`: los valores a lo largo del camino de Merkle rumbo al compromiso de identidad del usuario, 
-   `treePathIndices[nLevels]`: la dirección (0/1) por nivel del árbol correspondiente al camino de Merkle rumbo al compromiso de identidad del usuario,
-   `identityNullifier`: la identidad secreta de 32-bits utilizada como anulador,
-   `identityTrapdoor`: la identidad secreta de 32-bits utilizada como trampilla.

**Resultados (outputs) públicos:**

-   `root`: La raíz de Merkle del árbol.

## Hash anulador (Nullifier hash)

El circuito resume criptográficamente (hashes) el anulador (nullifier) de identidad con el anulador (nullifier) externo y después revisa que el resultado coincida con el hash anulador (nullifier) provisto.
Los hashes anuladores guardados en un contrato inteligente Semaphore permiten que el contrato rechace las pruebas que contengan un hash anulador ya utilizado. 

**Insumos (inputs) privados:**

-   `identityNullifier`: el secreto de identidad de 32 bits que se utiliza como anulador.

**Insumos (inputs) públicos:**

-   `externalNullifier`: el anulador externo de 32 bits.

**Resultados (outputs) públicos:**

-   `nullifierHash`: el hash del anulador (nullifier) de identidad y del anulador (nullifier) externo; se utiliza para prevenir que el mismo usuario emita dos señales.

**Procedimiento:**

## Señal

El circuito calcula un cuadrado ficticio del hash de la señal para prevenir que se altere la prueba.

**Insumos (inputs) públicos:**

-   `signalHash`: El hash de la señal del usuario. 
